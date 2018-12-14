import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideMenu, ProfileHeader, ProfileImage, ScreenCover, ModalPopup } from '../../../components';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions';
import { MenuData } from '../../../data/MenuData';
import { Path } from '../../../routes/';
import { getUserInformation, updateEula } from '../../../redux/auth/UserAgreement/actions';
import { ModalUserAgreement } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import ParticipantContainer from '../../TeleHealth/ParticipantContainer';
import Help from '../../../assets/HelpDoc/Help.pdf';
import { getAboutUsContent, getBuildVersion } from '../../../redux/aboutUs/actions';
import AboutUs from '../../AboutUs';
import AboutContent from '../../AboutUs/aboutContent';
import { CanServiceProviderCreateMessage } from '../../../redux/asyncMessages/actions';
import { onLogout } from '../../../redux/auth/logout/actions';
import { extractRole, authorizePermission } from '../../../utils/roleUtility';
import { isEntityServiceProvider } from '../../../utils/userUtility';
import { SCREENS } from '../../../constants/constants';
import { ProfileHeaderMenu } from "../../../data/ProfileHeaderMenu";
import { EntityProfileHeaderMenu } from "../../../data/EntityProfileHeaderMenu";
import { EntitySPProfileHeaderMenu } from "../../../data/EntitySPProfileHeaderMenu";
import { EntityMenuData } from '../../../data/EntityMenuData';
import { getUserInfo } from '../../../services/http';
import {clearInvitaion, joinVideoConference, rejectConference} from '../../../redux/telehealth/actions';
import  VisitNotification  from '../../VisitProcessingNotification/VisitNotification';
import { getDashboardMessageCount } from '../../../redux/asyncMessages/actions';
import {setMenuClicked} from '../../../redux/auth/user/actions';
import './style.css'

class AsideScreenCover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePermission: extractRole(SCREENS.PROFILE),
            showNotification: false
        }
    }

    componentDidMount() {
        this.props.getProfilePercentage()
        this.props.getImage()
        this.props.getUserInformation();
        this.props.getPersonalDetail();
        this.props.getAboutUsContent();
        this.props.canServiceProviderCreateMessage();
        this.props.getBuildVersion();
        authorizePermission(SCREENS.DASHBOARD);
        authorizePermission(SCREENS.SERVICE_REQUEST);
        authorizePermission(SCREENS.VISIT_HISTORY);
        authorizePermission(SCREENS.TELEHEALTH);
        authorizePermission(SCREENS.ASYNC_MESSAGE);
        this.props.getDashboardMessageCount();
    }

    onClickOk = () => {
        this.props.onClickOk();
    }

    navigateProfileHeader = (link) => {
        switch (link) {
            case 'visitNotification':
                this.setState({selectedLink: link, showNotification: !this.state.showNotification});
                break;
            case 'messagesummary':
                this.props.navigateProfileHeader(link);
                break;
            case 'contact':
                this.helpDocEl.click();
                break;
            case 'telehealth':
                this.setState({ selectedLink: link })
                break;
            case 'logout':
                this.props.onLogout();
                break;
            case 'aboutUs':
                this.setState({ selectedLink: link })
                break;
            default:
                this.setState({ selectedLink: link })
                this.props.navigateProfileHeader(link);
                break;
        }
    };

    checkIsFormDirty = (link) => {
        if (this.props.roomId && link !== 'aboutUs' && link !== 'visitNotification'
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

    render() {
        let entityUser = getUserInfo().isEntityServiceProvider;
        let headerMenu = entityUser ? EntityProfileHeaderMenu : ProfileHeaderMenu;
        if(isEntityServiceProvider()){
            headerMenu = EntitySPProfileHeaderMenu;
        };
        let menuData = (!getUserInfo().isEntityServiceProvider) ? MenuData:EntityMenuData;
        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <div className={"ProfileLeftWidget " + this.props.isOpen}>
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
                        onClick={this.state.profilePermission.Read && this.goToProfile}
                    />

                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            {this.props.personalDetail.serviceProviderTypeId !== 2 && <a className='BrandLink' onClick={this.state.profilePermission.Read && this.props.goToProfile}> {this.props.personalDetail.firstName || ''} {this.props.personalDetail.lastName || ''}</a>}
                            {this.props.personalDetail.serviceProviderTypeId === 2 && <a className='BrandLink' onClick={this.state.profilePermission.Read && this.props.goToProfile}> {this.props.personalDetail.entityName || ''}</a>}
                        </div>
                    </div>
                    <AsideMenu menuData={menuData} url={this.props} onClick={link => this.checkIsFormDirty(link)}/>
                </div>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader
                        headerMenu={headerMenu}
                        profilePic={this.props.profileImgData.image ? this.props.profileImgData.image
                            : require('../../../assets/images/Blank_Profile_icon.png')}
                        toggle={this.props.toggle}
                        onClick={(link) => this.checkIsFormDirty(link)}
                        dashboardMessageCount={this.props.dashboardMessageCount}/>

                    <a ref={(el) => { this.helpDocEl = el }} href={Help} target="_blank"></a>
                    <div className={'hiddenScreen ' + this.props.isOpen} onClick={this.props.toggle} />
                    <div className={'ProfileRightContainer ' + (this.props.match.url === Path.teleHealth ? 'TeleHealth' : '') + ' ' + (this.props.async === 'active' ? 'async' : '')}>
                        {this.props.children}
                    </div>
                </div>
                <ModalUserAgreement
                    isOpen={this.props.isEulaUpdated}
                    ModalBody={<div dangerouslySetInnerHTML={{ __html: this.props.eulaContent }} />}
                    className="modal-lg"
                    modalTitle="User Agreement has been updated, please accept to proceed."
                    onClick={this.onClickOk}
                />
                <ParticipantContainer
                    onRef={ref => (this.participantComponent = ref)}
                    isDisplayParticipantModal={this.state.selectedLink === 'telehealth' && this.props.match.url !== Path.teleHealth && this.props.canCreateConversation && !this.props.telehealthToken}
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
                    isOpen={this.state.selectedLink === 'telehealth' && !this.props.canCreateConversation}
                    ModalBody={<span>You cannot initiate a video call as you have no current service requests</span>}
                    btn1="OK"
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={() => { this.setState({ selectedLink: null }) }}
                />
                <ModalPopup
                    isOpen={this.props.showTelehealthInvite}
                    ModalBody={<span>{this.props.initiatorFirstName} {this.props.initiatorLastName} is inviting you to join a video conference for {this.props.personalDetail.firstName} {this.props.personalDetail.lastName}</span>}
                    btn1="Accept"
                    btn2="Decline"
                    className="zh"
                    headerFooter="d-none"
                    centered={true}
                    onConfirm={this.props.joinVideoConference}
                    onCancel={this.props.rejectConference}
                />
                <VisitNotification
                    isOpen={this.state.showNotification}
                   // visitNotification={this.props.visitNotification}
                    toggle={() => { this.setState({ showNotification: !this.state.showNotification }) }}
                />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfilePercentage: () => dispatch(getProfilePercentage()),
        getImage: () => dispatch(action.getImage()),
        getUserInformation: () => dispatch(getUserInformation()),
        onClickOk: () => dispatch(updateEula()),
        goToProfile: () => dispatch(push(Path.profile)),
        getPersonalDetail: () => dispatch(action.getPersonalDetail()),
        navigateProfileHeader: (link) => dispatch(push(link)),
        getAboutUsContent: () => dispatch(getAboutUsContent()),
        canServiceProviderCreateMessage: () => dispatch(CanServiceProviderCreateMessage()),
        onLogout: () => dispatch(onLogout()),
        clearInvitaion: () => dispatch(clearInvitaion()),
        joinVideoConference: () => dispatch(joinVideoConference()),
        rejectConference: () => dispatch(rejectConference()),
        getDashboardMessageCount: () => dispatch(getDashboardMessageCount()),
        setMenuClicked: (data) => dispatch(setMenuClicked(data)),
        getBuildVersion: () => dispatch(getBuildVersion())
    }
};

function mapStateToProps(state) {
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
        visitNotification: state.visitNotificationState.VisitNotificationState.VisitNotification,
        dashboardMessageCount: state.asyncMessageState.dashboardMessageCount,
        roomId: state.telehealthState.roomId,
        telehealthToken: state.telehealthState.token,
        buildVersion: state.aboutUsState.buildVersion
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AsideScreenCover)
)
