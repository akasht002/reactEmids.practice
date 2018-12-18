import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, ScreenCover, ModalPopup } from '../../../components'
import ServiceOffered from '../ServiceOffered/index'
import Languages from '../Languages/index'
import Certification from '../Certification/index'
import Education from '../Education/index'
import PersonalDetail from '../PersonalDetail'
import EntityPersonalDetail from '../EntityPersonalDetail'
import Organization from '../Organization'
import WorkHistory from '../WorkHistory'
import Skills from '../Skills/index'
import ServiceArea from '../ServiceArea/index'
import { Path } from '../../../routes'
import {
  getProfilePercentage
} from '../../../redux/profile/ProgressIndicator/actions'
import Availability from '../Availability/index'
import { getUserInfo } from '../../../services/http'
import { PROFILE_SERVICE_PROVIDER_TYPE_ID, ORG_SERVICE_PROVIDER_TYPE_ID } from '../../../constants/constants'
import { SCREENS } from '../../../constants/constants';
import { authorizePermission } from '../../../utils/roleUtility';
import { push, goBack } from '../../../redux/navigation/actions';
import ParticipantContainer from '../../TeleHealth/ParticipantContainer';
import { clearInvitaion, joinVideoConference, rejectConference } from '../../../redux/telehealth/actions';
import { clearServiceProviderId } from '../../../redux/profile/PersonalDetail/actions';
import { getPersonalDetail } from '../../../redux/profile/PersonalDetail/actions'
import { getPersonalDetailsState } from '../../../utils/userUtility';
import VisitNotification from '../../VisitProcessingNotification/VisitNotification';
import Help from '../../../assets/HelpDoc/Help.pdf';
import './styles.css'

class Profile extends Component {
  state = {
    selectedLink: '',
    showValidationPopUp: false,
    showNotification: false
  };
  componentDidMount() {
    this.props.getProfilePercentage()
    authorizePermission(SCREENS.PROFILE);
  }

  getPersonalDetail = () => {
    if (
      (getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getUserInfo().isEntityServiceProvider) || (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
          !getPersonalDetailsState().isEntityServiceProvider)
    ) {
      return <PersonalDetail profilePercentage={this.props.profilePercentage} />
    } else if (
      (getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        getUserInfo().isEntityServiceProvider) || (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
          getPersonalDetailsState().isEntityServiceProvider)
    ) {
      return (
        <EntityPersonalDetail
          profilePercentage={this.props.profilePercentage}
        />
      )
    } else { return <Organization profilePercentage={this.props.profilePercentage} /> }
  }

  getAvailability = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) || (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <Availability />
    } else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0)
      || (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getPersonalDetailsState().entityId === 0)) {
      return <Availability />
    } else {
      return '';
    }
  }

  getServiceOffered = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) ||
      (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <div className='col-md-12 card CardWidget SPCertificate'>
        <ServiceOffered />
      </div>
    } else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) ||
      (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID
        && getPersonalDetailsState().entityId === 0)) {
      return <div className='col-md-12 card CardWidget SPCertificate'>
        <ServiceOffered />
      </div>
    } else {
      return '';
    }
  }

  getServiceArea = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) ||
      (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <ServiceArea />
    } else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0)
      || (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID
        && getPersonalDetailsState().entityId === 0)) {
      return <ServiceArea />
    } else {
      return '';
    }
  };

  getSkills = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) ||
      (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <Skills />
    } else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) ||
      (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID
        && getPersonalDetailsState().entityId === 0)) {
      return <Skills />
    } else {
      return '';
    }
  }

  getLanguages = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) || (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <Languages />
    }
    else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0)
      || (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getPersonalDetailsState().entityId === 0)) {
      return <Languages />
    }
    else {
      return '';
    }
  }

  getCertification = () => {
    if ((getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) ||
      (getPersonalDetailsState().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
        !getPersonalDetailsState().isEntityServiceProvider)) {
      return <Certification />
    } else if ((getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) ||
      (getPersonalDetailsState().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getPersonalDetailsState().entityId === 0)) {
      return <Certification />
    } else {
      return '';
    }
  }

  validationPopUp = () => {
    if (!this.props.isUser) {
      this.goToDashboard();
    } else {
      let serviceOfferedList = this.props.serviceOfferedList && this.props.serviceOfferedList.length
      let LanguagesList = this.props.LanguagesList && this.props.LanguagesList.languages && this.props.LanguagesList.languages.length
      if (serviceOfferedList === 0 && LanguagesList === 0) {
        this.setState({ showValidationPopUp: true })
      } else {
        this.goToDashboard();
      }
    }
  }

  stayOnProfile = () => {
    this.setState({ showValidationPopUp: false })
  }

  componentWillUnmount() {
    this.props.clearServiceProviderId();
    this.props.getPersonalDetail();
  }

  goToDashboard = () => {
    this.props.clearServiceProviderId();
    this.props.getPersonalDetail();
    this.props.goBack();
  }

  getWorkHistory = () => {
    if (getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider) {
      return <WorkHistory />
    }
    //  else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
    //    return <WorkHistory />
    //  } 
    else {
      return '';
    }
  }

  getEducation = () => {
    if (getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID) {
      return <Education />
    } else if (getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
      return '';
    }
  }

  navigateProfileHeader = (link) => {
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
      case 'logout':
        this.props.onLogout();
        break;
      default:
        this.setState({ selectedLink: link })
        break;
    }
  };

  render() {
    return (
      <ScreenCover>
        <div className='container-fluid p-0'>
          <Header
            onClick={(link) => this.navigateProfileHeader(link)}
            menuArray={[
              'contact',
              'videoChat',
              'messages',
              'notification',
              'logout'
            ]}
          />
          <a ref={(el) => { this.helpDocEl = el }} href={Help} target="_blank"></a>
          <div className='width100 mainWidgetProfile mainWidgetOverflow'>
            <div className='width100 topWidgetBG' />
            <div className='container mainProfileContent bgWhite'>
              <div className='row d-flex-view justify-content-center m-auto'>
                <div className='col-md-12'>
                  <h4 className='my-3 text-white SPTitleText'>
                    <a className='BrandLink Icon icon-back' onClick={this.validationPopUp}>
                    </a>
                    Profile
                  </h4>
                </div>
                {this.getPersonalDetail()}
                {
                  // (getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
                  // !getUserInfo().isEntityServiceProvider) ? 
                  <div>


                    {this.getServiceOffered()}
                    <div className='col-md-12 card CardWidget SPCertificate'>
                      {this.getSkills()}
                    </div>
                    {this.getServiceArea()}
                    {this.getAvailability()}
                    <div className='col-md-12 card CardWidget SPLanguages'>
                      {this.getLanguages()}
                    </div>
                    <div className='col-md-12 card CardWidget SPCertificate'>
                      {this.getCertification()}
                    </div>
                    {this.getWorkHistory()}
                    {this.getEducation()}
                  </div>
                  //  : <div>{this.getEducation()}</div>
                }
              </div>
            </div>
          </div>
        </div>

        <ParticipantContainer
          onRef={ref => (this.participantComponent = ref)}
          isDisplayParticipantModal={this.state.selectedLink === 'telehealth' && this.props.match.url !== Path.teleHealth && this.props.canCreateConversation}
          onSetDisplayParticipantModal={() => { this.setState({ selectedLink: null }) }}
          createConversation={() => { this.setState({ selectedLink: null }) }}
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

        <ModalPopup
          isOpen={this.state.showValidationPopUp}
          ModalBody={<span>To increase your visibility across the care seeker network, please provide your Profile Information, Services Offered, Language Spoken and Availability. Do you want to continue with updating?</span>}
          btn1="Yes"
          btn2="No"
          className="zh"
          headerFooter="d-none"
          centered={true}
          onConfirm={this.stayOnProfile}
          onCancel={this.goToDashboard}
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
    navigateProfileHeader: (link) => dispatch(push(link)),
    clearInvitaion: () => dispatch(clearInvitaion()),
    joinVideoConference: () => dispatch(joinVideoConference()),
    goToDashboard: () => dispatch(push(Path.dashboard)),
    rejectConference: () => dispatch(rejectConference()),
    goBack: () => dispatch(goBack()),
    clearServiceProviderId: () => dispatch(clearServiceProviderId()),
    getPersonalDetail: () => dispatch(getPersonalDetail()),
  }
}

function mapStateToProps(state) {
  return {
    profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
    canCreateConversation: state.asyncMessageState.canCreateConversation,
    showTelehealthInvite: state.telehealthState.isInvitationCame,
    serviceOfferedList: state.profileState.serviceOfferedState.serviceOfferedList,
    LanguagesList: state.profileState.LanguagesState.selectedLanguagesList,
    // availableDays: state.profileState.AvailabilityState.availableDays,
    initiatorFirstName: state.telehealthState.initiatorFirstName,
    initiatorLastName: state.telehealthState.initiatorLastName,
    personalDetail: state.profileState.PersonalDetailState.personalDetail,
    isUser: state.profileState.PersonalDetailState.isUser,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
