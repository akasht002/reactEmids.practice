import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideMenu, ProfileHeader, ProfileImage, ScreenCover, ModalPopup } from '../../../components';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import { MenuData } from '../../../data/MenuData';
import { Path } from '../../../routes/';
import { updateEula } from '../../../redux/auth/UserAgreement/actions';
import { ModalUserAgreement } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import ParticipantContainer from '../../TeleHealth/ParticipantContainer';
import Help from '../../../assets/HelpDoc/Help.pdf';
import AboutUs from '../../AboutUs';
import AboutContent from '../../AboutUs/aboutContent';
import { CanServiceProviderCreateMessage } from '../../../redux/asyncMessages/actions';
import { onLogout } from '../../../redux/auth/logout/actions';
import { extractRole, authorizePermission } from '../../../utils/roleUtility';
import { isEntityServiceProvider, isEntityUser } from '../../../utils/userUtility';
import { SCREENS, PROFILE_HEADER_NAVIGATION_ICON } from '../../../constants/constants';
import { ProfileHeaderMenu } from "../../../data/ProfileHeaderMenu";
import { EntityProfileHeaderMenu } from "../../../data/EntityProfileHeaderMenu";
import { EntitySPProfileHeaderMenu } from "../../../data/EntitySPProfileHeaderMenu";
import { EntityMenuData } from '../../../data/EntityMenuData';
import { getUserInfo } from '../../../services/http';
import { clearRoom, joinVideoConference, rejectConference, createVideoConference, createDataStore } from '../../../redux/telehealth/actions';
import { getDashboardMessageCount } from '../../../redux/asyncMessages/actions';
import { setMenuClicked, setIsFormDirty } from '../../../redux/auth/user/actions';
import {isIEBrowser, isMobileBrowser} from '../../../utils/browserUtility'
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions';
import './style.css'
import { EntityUserMenuData } from '../../../data/EntityUserMenuData';
import { withAuth } from "@okta/okta-react";
import {getCurrentSession} from '../../../redux/auth/user/actions'
import { caseInsensitiveComparer } from '../../../utils/comparerUtility';

export class AsideScreenCover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePermission: extractRole(SCREENS.PROFILE),
            showNotification: false,
            displayWarningPopup: false,
            routeUrlLink: '/',
            isInvitationCame: false,
            isTelehealthMediaAvailable: false,
            isCreateVideoConference: false,
            dropdownOpen: false
        }
    }

    componentDidMount() {
        this.props.getImage()
        this.props.getPersonalDetail();
        this.props.canServiceProviderCreateMessage();
        authorizePermission(SCREENS.DASHBOARD);
        authorizePermission(SCREENS.SERVICE_REQUEST);
        authorizePermission(SCREENS.VISIT_HISTORY);
        authorizePermission(SCREENS.TELEHEALTH);
        authorizePermission(SCREENS.ASYNC_MESSAGE);
        this.props.getDashboardMessageCount();
        this.props.getProfilePercentage();
        this.props.getCurrentSession();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.createData !== nextProps.createData && nextProps.createData) {
            this.checkVideoCompatibility(null, false, nextProps.createData)
        }
    }

    successCallbackOnDeviceStatus = (link, join, createData) => {
        if (link) {
            this.setState({ selectedLink: link, isTelehealthMediaAvailable: true })
        } else if (join) {
            this.onSuccessJoiningVideo()
        } else if (createData) {
            this.setState({isCreateVideoConference: true, isTelehealthMediaAvailable: true })
            this.props.createVideoConference(createData)
            this.props.createDataStore(null)
        }
    }

    errorCallbackOnDeviceStatus = (link, join, createData) => {
        if (link) {
            this.setState({ selectedLink: link, isTelehealthMediaAvailable: false })
        } else if (join) {
            this.onErrorJoiningVideo();
        } else if (createData) {
            this.setState({isCreateVideoConference: true, isTelehealthMediaAvailable: false })
        }
    }

    checkDeviceStatus = (link, join, createData) => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
            let tracks = stream.getTracks()
            tracks.forEach((track) => {
                track.stop();
            });
            this.successCallbackOnDeviceStatus(link, join, createData)
        })
        .catch(() => {
            this.errorCallbackOnDeviceStatus(link, join, createData)
        });
    }

    onClickOk = () => {
        this.props.onClickOk();
    }

    onSuccess = () => {
        this.props.auth.logout()
    }

    navigateProfileHeader = (link) => {
        this.props.setIsFormDirty(false);
        switch (link) {
            case 'visitNotification':
                this.setState({ selectedLink: link, showNotification: !this.state.showNotification });
                break;
            case 'messagesummary':
                this.props.navigateProfileHeader(link);
                break;
            case 'contact':
                this.helpDocEl.click();
                break;
            case 'telehealth':
                this.checkVideoCompatibility(link, false, null)
                break;
            case 'logout':
                this.props.onLogout(this.props.isSecureLogin ? this.onSuccess :null);
                break;
            case 'aboutUs':
                this.setState({ selectedLink: link })
                break;
                case 'profile':
                this.goToProfile();
                break;
            default:
                this.setState({ selectedLink: link })
                this.props.navigateProfileHeader(link);
                break;
        }
    };

    checkIsFormDirty = (link) => {
        this.setState({ routeUrlLink: link });
        if (this.props.isFormDirty) {
            this.setState({ displayWarningPopup: true });
        }
        else if (this.props.roomId && link !== 'aboutUs' && link !== 'visitNotification'
            && link !== 'contact' && link !== 'telehealth') {
            this.props.setMenuClicked(link)
        } else {
            this.navigateProfileHeader(link);
        };
    }

    goToProfile = () => {
        if (this.props.roomId) {
            this.props.setMenuClicked(Path.profile);
        } else {
            this.props.goToProfile();
        }
    }
    
    onErrorJoiningVideo = () => {
        this.setState({isInvitationCame: true})
        this.props.clearRoom();
    }

    onSuccessJoiningVideo = () => {
        this.setState({ isInvitationCame: true, isTelehealthMediaAvailable: true })
        this.props.joinVideoConference();
    }

    checkVideoCompatibility = (link, join, create) => {
        if (isIEBrowser || isMobileBrowser) {
            if (link) {
                this.setState({ selectedLink: link })
            } else if (join) {
                this.onErrorJoiningVideo();
            } else if (create) {
                this.setState({isCreateVideoConference: true})
            }
        } else {
            this.checkDeviceStatus(link, join, create)
        }
    }

    render() {
        let entityUser = getUserInfo().isEntityServiceProvider;
        let headerMenu = entityUser ? EntityProfileHeaderMenu : ProfileHeaderMenu;
        if (isEntityServiceProvider()) {
            headerMenu = this.props.userInfo && this.props.userInfo.canAccessConversation ? EntityProfileHeaderMenu.filter(item => !caseInsensitiveComparer(item.name, PROFILE_HEADER_NAVIGATION_ICON.videoChat)): EntitySPProfileHeaderMenu;
        };
        let menuData = (!getUserInfo().isEntityServiceProvider) ? (isEntityUser() ? EntityUserMenuData : MenuData) : EntityMenuData;
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <div className={"ProfileLeftWidget theme-primary-gradient " + this.props.isOpen}>
                    <div className='BrandNameWidget'>
                        <div className='BrandName'>
                            <span className='BrandLink'>
                                <img src={require('../../../assets/images/logo/CoreoHomeWhite.png')} alt="coreoLogo" />
                            </span>
                        </div>
                    </div>
                    <ProfileImage
                        src={this.props.profileImgData.image ? this.props.profileImgData.image
                            : require('../../../assets/images/Blank_Profile_icon.png')}
                        profilePercentage={this.props.profilePercentage}
                        profileImageWidget='ProfileImageWidget'
                        profileImageContainer='ProfileImageContainer'
                        cicularChart='circular-chart'
                        circle='SPdpCircle'
                        profileImage='ProfileImage'
                        onClick={() => {this.state.profilePermission.Read && this.checkIsFormDirty('profile')}}
                    />

                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            {this.props.personalDetail.serviceProviderTypeId !== 2 && <a className='BrandLink' onClick={this.state.profilePermission.Read && this.props.goToProfile}> {this.props.personalDetail.firstName || ''} {this.props.personalDetail.lastName || ''}</a>}
                            {this.props.personalDetail.serviceProviderTypeId === 2 && <a className='BrandLink' onClick={this.state.profilePermission.Read && this.props.goToProfile}> {this.props.personalDetail.entityName || ''}</a>}
                        </div>
                    </div>
                    <AsideMenu menuData={menuData} url={this.props} onClick={link => this.checkIsFormDirty(link)} />
                </div>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader
                        headerMenu={headerMenu}
                        profilePic={this.props.profileImgData.image ? this.props.profileImgData.image
                            : require('../../../assets/images/Blank_Profile_icon.png')}
                        toggle={this.props.toggle}
                        onClick={(link) => this.checkIsFormDirty(link)}
                        dashboardMessageCount={this.props.dashboardMessageCount} 
                        dropdownOpen={this.state.dropdownOpen}
                        />

                    <a ref={(el) => { this.helpDocEl = el }} href={Help} target="_blank"></a>
                    <div className={'hiddenScreen ' + this.props.isOpen} onClick={this.props.toggle} />
                    <div className={'ProfileRightContainer ' + (this.props.match.url === Path.teleHealth ? 'TeleHealth' : '') + ' ' + (this.props.async === 'active' ? 'async' : '')}>
                        {this.props.children}
                    </div>
                </div>
                <ModalUserAgreement
                    isOpen={this.props.isEulaUpdated}
                    ModalBody={<div dangerouslySetInnerHTML={{ __html: this.props.eulaContent }} />}
                    className="modal-lg EULA"
                    modalTitle="User Agreement has been updated, please accept to proceed."
                    onClick={this.onClickOk}
                    isAgree={true}
                />
                <ParticipantContainer
                    onRef={ref => (this.participantComponent = ref)}
                    isDisplayParticipantModal={this.state.selectedLink === 'telehealth' && this.props.match.url !== Path.teleHealth && this.props.canCreateConversation && !this.props.telehealthToken && !isIEBrowser && !isMobileBrowser && this.state.isTelehealthMediaAvailable}
                    onSetDisplayParticipantModal={() => { this.setState({ selectedLink: null }) }}
                    createConversation={() => { this.setState({ selectedLink: null }) }}
                />
                <AboutUs
                    isOpen={this.state.selectedLink === 'aboutUs'}
                    ModalBody={<AboutContent
                        toggle={() => { this.setState({ selectedLink: null }) }}
                        aboutUsContent={<div dangerouslySetInnerHTML={{ __html: this.props.aboutUsContent }} />}
                        buildVersion={this.props.buildVersion}
                    />}
                    className="modal-lg AboutModal"
                    headerFooter='d-none'
                    centered="centered"
                />
                <ModalPopup
                    isOpen={this.state.selectedLink === 'telehealth' && !this.props.canCreateConversation && !isIEBrowser && !isMobileBrowser}
                    ModalBody={<span>You cannot initiate a video call as you have no current service requests.</span>}
                    btn1="OK"
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => { this.setState({ selectedLink: null }) }}
                />
                <ModalPopup
                    isOpen={this.props.showTelehealthInvite}
                    ModalBody={<span>{this.props.initiatorFirstName} {this.props.initiatorLastName} is inviting you to join a video conference.</span>}
                    btn1="Accept"
                    btn2="Decline"
                    className="zh"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => {this.checkVideoCompatibility(null, true, null)}}
                    onCancel={this.props.rejectConference}
                />
                <ModalPopup
                    className="modal-sm edge-view-block"
                    headerFooter="d-none"
                    centered={true}
                    isOpen={isIEBrowser && (this.state.selectedLink === 'telehealth' || this.state.isInvitationCame || this.state.isCreateVideoConference)}
                    btn1="OK"
                    onConfirm={() => { 
                        this.setState({ selectedLink: null, isInvitationCame: false, isCreateVideoConference: false }) 
                        this.props.createDataStore(null)
                    }}
                    ModalBody={
                        <div>
                            <span className='ProfileCardHeaderTitle theme-primary'>
                                Improve Your Experience
                            </span>
                            <span>To begin using this feature, please use Google Chrome on a PC/Mac or the Coreo Home Mobile Application on an iOS or Android Mobile Device.</span>
                        </div>
                    }
                />
                <ModalPopup
                    className="modal-sm edge-view-block"
                    headerFooter="d-none"
                    centered={true}
                    isOpen={isMobileBrowser && (this.state.selectedLink === 'telehealth' || this.state.isInvitationCame || this.state.isCreateVideoConference)}
                    btn1="OK"
                    onConfirm={() => { 
                        this.setState({ selectedLink: null, isInvitationCame: false, isCreateVideoConference: false }) 
                        this.props.createDataStore(null)
                    }}
                    ModalBody={
                        <div>
                            <span className='ProfileCardHeaderTitle theme-primary'>
                                Improve Your Experience
                            </span>
                            <span>To begin using this feature, please use Google Chrome on a PC/Mac or the Coreo Home Mobile Application on an iOS or Android Mobile Device.</span>
                        </div>
                    }
                />
                <ModalPopup
                    className="modal-lg no-videoblock"
                    headerFooter="d-none"
                    centered={true}
                    isOpen={!this.state.isTelehealthMediaAvailable && !isIEBrowser && !isMobileBrowser && (this.state.selectedLink === 'telehealth' || this.state.isInvitationCame || this.state.isCreateVideoConference)}
                    btn1="OK"
                    onConfirm={() => { 
                        this.setState({ selectedLink: null, isInvitationCame: false, isCreateVideoConference: false }) 
                        this.props.createDataStore(null)
                    }}
                    ModalBody={<span>CoreoHome is unable to initiate video conferencing as camera / microphone is not detected in your device. To avail video conferencing feature, please allow access to your camera and microphone.</span>}
                />
                {//commented because we are not showing the notifications in this release
                    /* <VisitNotification
                    isOpen={this.state.showNotification}
                    toggle={() => { this.setState({ showNotification: !this.state.showNotification }) }}
                /> */}
                <ModalPopup
                    isOpen={this.state.displayWarningPopup}
                    ModalBody={<span>Do you want to discard changes?</span>}
                    btn1="Yes"
                    btn2="No"
                    className="zh"
                    headerFooter="d-none"
                    footer='d-none'
                    centered={true}
                    onConfirm={() => {
                        this.navigateProfileHeader(this.state.routeUrlLink)
                    }}
                    onCancel={() => this.setState({
                        displayWarningPopup: !this.state.displayWarningPopup,
                    })}
                />
            </ScreenCover>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getImage: () => dispatch(action.getImage()),
        onClickOk: () => dispatch(updateEula()),
        goToProfile: () => dispatch(push(Path.profile)),
        getPersonalDetail: () => dispatch(action.getPersonalDetail()),
        navigateProfileHeader: (link) => dispatch(push(link)),
        canServiceProviderCreateMessage: () => dispatch(CanServiceProviderCreateMessage()),
        onLogout: (onSuccess) => dispatch(onLogout(onSuccess)),
        clearRoom: () => dispatch(clearRoom()),
        joinVideoConference: () => dispatch(joinVideoConference()),
        rejectConference: () => dispatch(rejectConference()),
        getDashboardMessageCount: () => dispatch(getDashboardMessageCount()),
        setMenuClicked: (data) => dispatch(setMenuClicked(data)),
        setIsFormDirty: (data) => dispatch(setIsFormDirty(data)),
        createVideoConference: (data) => dispatch(createVideoConference(data)),
        createDataStore: data => dispatch(createDataStore(data)),
        getProfilePercentage: () => dispatch(getProfilePercentage()),
        getCurrentSession: () => dispatch(getCurrentSession())
    }
};

export function mapStateToProps(state) {
    return {
        profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        isEulaUpdated: state.authState.userAgreementState.isEulaUpdated,
        eulaContent: state.authState.userAgreementState.eulaContent,
        personalDetail: state.profileState.PersonalDetailState.personalDetail,
        aboutUsContent: state.aboutUsState.aboutUsContent,
        isLoading: state.loadingState.isLoading,
        canCreateConversation: state.asyncMessageState.canCreateConversation,
        showTelehealthInvite: state.telehealthState.isInvitationCame,
        initiatorFirstName: state.telehealthState.initiatorFirstName,
        initiatorLastName: state.telehealthState.initiatorLastName,
        dashboardMessageCount: state.asyncMessageState.dashboardMessageCount,
        roomId: state.telehealthState.roomId,
        telehealthToken: state.telehealthState.token,
        buildVersion: state.aboutUsState.buildVersion,
        isFormDirty: state.authState.userState.isFormDirty,
        createData: state.telehealthState.createData,
        isSecureLogin: state.authState.userState.isSecureLogin,
        userInfo: state.authState.userState.userData.userInfo
    };
};

export default withAuth(withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AsideScreenCover))) 
