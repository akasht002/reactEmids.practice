import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Header, ScreenCover } from '../../../components'
import ServiceOffered from '../ServiceOffered/index'
import Languages from '../Languages/index'
import Certification from '../Certification/index'
import Education from '../Education/index'
import PersonalDetail from '../PersonalDetail'
import EntityPersonalDetail from '../EntityPersonalDetail'
import Organization from '../Organization'
import WorkHistory from '../WorkHistory'
import Skills from '../Skills/index'
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

import './styles.css'

class Profile extends Component {
  state = {
    selectedLink: ''
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
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID) {
     return <Availability />
    } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && !getUserInfo().isEntityServiceProvider) {
      return <Availability />
    } else {
      return '';
    }
  }

  getServiceOffered = () => {
    if(getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID) {
      return <ServiceOffered />
     } else if(getUserInfo().serviceProviderTypeId === ORG_SERVICE_PROVIDER_TYPE_ID && !getUserInfo().isEntityServiceProvider) {
       return <ServiceOffered />
     } else {
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
                    <Link className='BrandLink' to={Path.dashboard}>
                      <i className='Icon icon-back' />
                    </Link>
                    Profile
                  </h4>
                </div>
                {this.getPersonalDetail()}
                <div className='col-md-12 card CardWidget SPCertificate'>
                {this.getServiceOffered()}
                </div>
                <div className='col-md-12 card CardWidget SPCertificate'>
                  <Skills />
                </div>
                <div className='col-md-12 card CardWidget SPLanguages'>
                  <Languages />
                </div>
                <div className='col-md-12 card CardWidget SPCertificate'>
                  <Certification />
                </div>

                <WorkHistory />
                <Education />
               {this.getAvailability()}

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

          
      </ScreenCover>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getProfilePercentage: () => dispatch(getProfilePercentage()),
    navigateProfileHeader: (link) => dispatch(push(link)),
  }
}

function mapStateToProps (state) {
  return {
    SERVICE_PROVIDER_TYPE_ID: 1,
    profilePercentage: state.profileState.progressIndicatorState.profilePercentage,
    canCreateConversation: state.asyncMessageState.canCreateConversation
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
