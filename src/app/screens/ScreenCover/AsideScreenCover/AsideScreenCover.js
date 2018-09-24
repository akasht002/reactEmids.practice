import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideMenu, ProfileHeader, ProfileImage, ScreenCover } from '../../../components';
import * as action from '../../../redux/profile/PersonalDetail/actions'
import { getProfilePercentage } from '../../../redux/profile/ProgressIndicator/actions';
import { MenuData } from '../../../data/MenuData';
import { Path } from '../../../routes/';
import { getUserInfo, updateEula } from '../../../redux/auth/UserAgreement/actions';
import { ModalUserAgreement } from '../../../components';
import { push } from '../../../redux/navigation/actions';
import ParticipantContainer from '../../TeleHealth/ParticipantContainer';
import { getAboutUsContent } from '../../../redux/aboutUs/actions';
import AboutUs from '../../AboutUs';
import AboutContent from '../../AboutUs/aboutContent';
import './style.css'

class AsideScreenCover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: { label: 'Brett Smith', value: '2' }
        }
    }

    optionChanged(e) {
        this.setState({
            selectedValue: e
        })
    }

    componentDidMount() {
        this.props.getProfilePercentage()
        this.props.getImage()
        this.props.getUserInfo();
        this.props.getPersonalDetail();
        this.props.getAboutUsContent();
    }

    onClickOk = () => {
        this.props.onClickOk();
    }

    navigateProfileHeader = (link) => {
        if (link === 'messagesummary') {
            this.props.navigateProfileHeader(link);
        } else {
            this.setState({ selectedLink: link })
        }
    };


    render() {
        return (
            <ScreenCover>
                <div className={"ProfileLeftWidget " + this.props.isOpen}>
                    <div className='BrandNameWidget'>
                        <div className='BrandName'>
                            <Link className='BrandLink' to='/'><img src={require('../../../assets/images/logo/CoreoHomeWhite.png')} alt="coreoLogo" />
                            </Link>
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
                        onClick={this.props.goToProfile}
                    />

                    <div className='ProfileNameWidget'>
                        <div className='ProfileNameContent'>
                            <Link className='BrandLink' to={Path.profile}> <p> {this.props.personalDetail.firstName || ''} {this.props.personalDetail.lastName || ''} </p></Link>
                        </div>
                    </div>
                    <AsideMenu menuData={MenuData} />
                </div>
                <div className="container-fluid ProfileRightWidget">
                    <ProfileHeader toggle={this.props.toggle} onClick={(link) => this.navigateProfileHeader(link)} />
                    <div className={'hiddenScreen ' + this.props.isOpen} onClick={this.props.toggle} />
                    <div className={'ProfileRightContainer ' + (this.props.match.url === Path.teleHealth ? 'TeleHealth' : '')}>
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
                    isDisplayParticipantModal={this.state.selectedLink === 'telehealth' && this.props.match.url !== Path.teleHealth}
                    onSetDisplayParticipantModal={() => { this.setState({ selectedLink: null }) }}
                    createConversation={() => { this.setState({ selectedLink: null }) }}
                />
                <AboutUs
                    isOpen={this.state.selectedLink === 'aboutUs'}
                    ModalBody={<AboutContent
                        toggle={() => { this.setState({ selectedLink: null }) }}
                        aboutUsContent={<div dangerouslySetInnerHTML={{ __html: this.props.aboutUsContent }} />}
                    />}
                    className="modal-lg AboutModal"
                    headerFooter='d-none'
                    centered="centered"
                />
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfilePercentage: () => dispatch(getProfilePercentage()),
        getImage: () => dispatch(action.getImage()),
        getUserInfo: () => dispatch(getUserInfo()),
        onClickOk: () => dispatch(updateEula()),
        goToProfile: () => dispatch(push(Path.profile)),
        getPersonalDetail: () => dispatch(action.getPersonalDetail()),
        navigateProfileHeader: (link) => dispatch(push(link)),
        getAboutUsContent: () => dispatch(getAboutUsContent())
    }
};

function mapStateToProps(state) {
    return {
        profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
        profileImgData: state.profileState.PersonalDetailState.imageData,
        isEulaUpdated: state.authState.userAgreementState.isEulaUpdated,
        eulaContent: state.authState.userAgreementState.eulaContent,
        personalDetail: state.profileState.PersonalDetailState.personalDetail,
        aboutUsContent: state.aboutUsState.aboutUsContent
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AsideScreenCover)
)