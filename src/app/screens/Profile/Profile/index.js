import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
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
import {SCREENS} from '../../../constants/constants';
import {authorizePermission} from '../../../utils/roleUtility';
import { push } from '../../../redux/navigation/actions';
import ParticipantContainer from '../../TeleHealth/ParticipantContainer';
import {clearInvitaion, joinVideoConference} from '../../../redux/telehealth/actions';
import './styles.css'

class Profile extends Component {
  state = {
    selectedLink: '',
    showValidationPopUp : false
  };
  componentDidMount () {
    this.props.getProfilePercentage()
    authorizePermission(SCREENS.PROFILE);
  }

  getPersonalDetail = () => {
    if (
      getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      !getUserInfo().isEntityServiceProvider
    ) {
      return <PersonalDetail profilePercentage={this.props.profilePercentage} />
    } else if (
      getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID &&
      getUserInfo().isEntityServiceProvider
    ) {
      return (
        <EntityPersonalDetail
          profilePercentage={this.props.profilePercentage}
        />
      )
    } else { return <Organization profilePercentage={this.props.profilePercentage} /> }
  }

  getAvailability = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
    !getUserInfo().isEntityServiceProvider) {
     return <Availability />
    } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && 
    getUserInfo().entityId === 0) {
      return <Availability />
    } else {
      return '';
    }
  }

  getServiceOffered = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <ServiceOffered />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return <ServiceOffered />
     } else {
       return '';
     }
  }

  getServiceArea = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <ServiceArea /> 
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
      return <ServiceArea /> 
     } else {
       return '';
     }
  }

  getSkills = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <Skills />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return <Skills />
     } else {
       return '';
     }
  }

  getLanguages = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <Languages />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return <Languages />
     } else {
       return '';
     }
  }

  getCertification = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <Certification />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return <Certification />
     } else {
       return '';
     }
  }

  validationPopUp = () => {
    let serviceOfferedList = this.props.serviceOfferedList && this.props.serviceOfferedList.length
    let LanguagesList = this.props.LanguagesList && this.props.LanguagesList.languages.length
    if(serviceOfferedList === 0 || LanguagesList === 0) {
      this.setState({ showValidationPopUp : true })
    } else {
      this.goToDashboard();
    }
  }

  stayOnProfile = () => {
    this.setState({ showValidationPopUp : false})
  }

  goToDashboard = () => {
    this.props.goToDashboard();
  }

  getWorkHistory = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && 
      !getUserInfo().isEntityServiceProvider) {
      return <WorkHistory />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return <WorkHistory />
     } else {
       return '';
     }
  }

  getEducation = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID) {
      return <Education />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && getUserInfo().entityId === 0) {
       return '';
     }
  }
  
  navigateProfileHeader = (link) => {
    switch (link) {
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
            this.setState({selectedLink: link})
            break;
    }
};

  render () {
    return (
      <ScreenCover>
        <div className='container-fluid p-0'>
          <Header
            onClick = { (link) => this.navigateProfileHeader(link)}
            menuArray={[
              'contact',
              'videoChat',
              'messages',
              'notification',
              'logout'
            ]}
          />
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
               
                <div className='col-md-12 card CardWidget SPCertificate'>
                {this.getServiceOffered()}
                </div>
                  {this.getServiceArea()}
                <div className='col-md-12 card CardWidget SPCertificate'>
                  {this.getSkills()}
                </div>
                <div className='col-md-12 card CardWidget SPLanguages'>
                 {this.getLanguages()}
                </div>
                <div className='col-md-12 card CardWidget SPCertificate'>
                  {this.getCertification()}
                </div>
                {this.getWorkHistory()}
                {this.getEducation()}
               {this.getAvailability()} </div> 
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
            ModalBody={<span>You have a new video conference invite.</span>}
            btn1="Accept"
            btn2="Decline"
            className="zh"
            headerFooter="d-none"
            centered={true}
            onConfirm={this.props.joinVideoConference}
            onCancel={this.props.clearInvitaion}
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
      </ScreenCover>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getProfilePercentage: () => dispatch(getProfilePercentage()),
    navigateProfileHeader: (link) => dispatch(push(link)),
    clearInvitaion: () => dispatch(clearInvitaion()),
    joinVideoConference: () => dispatch(joinVideoConference()),
    goToDashboard: () => dispatch(push(Path.dashboard))
  }
}

function mapStateToProps (state) {
  return {
    profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
    canCreateConversation: state.asyncMessageState.canCreateConversation,
    showTelehealthInvite: state.telehealthState.isInvitationCame,
    serviceOfferedList: state.profileState.serviceOfferedState.serviceOfferedList,
    LanguagesList: state.profileState.LanguagesState.selectedLanguagesList,
    // availableDays: state.profileState.AvailabilityState.availableDays
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
