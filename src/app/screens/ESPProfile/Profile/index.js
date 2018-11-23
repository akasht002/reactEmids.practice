import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Header, ScreenCover, ModalPopup } from '../../../components'
import Education from '../Education/index'
import EntityPersonalDetail from '../EntityPersonalDetail'
import { Path } from '../../../routes'
import {
  getProfilePercentage
} from '../../../redux/profile/ProgressIndicator/actions'
import { getUserInfo } from '../../../services/http'
import {
  PROFILE_SERVICE_PROVIDER_TYPE_ID,
  ORG_SERVICE_PROVIDER_TYPE_ID
} from '../../../constants/constants'
import { SCREENS } from '../../../constants/constants'
import { authorizePermission } from '../../../utils/roleUtility'
import { push } from '../../../redux/navigation/actions'
import ParticipantContainer from '../../TeleHealth/ParticipantContainer'
import {
  clearInvitaion,
  joinVideoConference,
  rejectConference
} from '../../../redux/telehealth/actions'
import './styles.css'

class Profile extends Component {
  state = {
    selectedLink: '',
    showValidationPopUp: false
  }
  componentDidMount () {
    this.props.getProfilePercentage()
    authorizePermission(SCREENS.PROFILE)
  }

 

  validationPopUp = () => {
    let serviceOfferedList =
      this.props.serviceOfferedList && this.props.serviceOfferedList.length
    let LanguagesList =
      this.props.LanguagesList &&
      this.props.LanguagesList.languages &&
      this.props.LanguagesList.languages.length
    if (serviceOfferedList === 0 && LanguagesList === 0) {
      this.setState({ showValidationPopUp: true })
    } else {
      this.goToDashboard()
    }
  }

  stayOnProfile = () => {
    this.setState({ showValidationPopUp: false })
  }

  goToDashboard = () => {
    this.props.goToDashboard()
  }

  
  navigateProfileHeader = link => {
    switch (link) {
      case 'messagesummary':
        this.props.navigateProfileHeader(link)
        break
      case 'contact':
        this.helpDocEl.click()
        break
      case 'logout':
        this.props.onLogout()
        break
      default:
        this.setState({ selectedLink: link })
        break
    }
  }

  render () {
    return (
      <ScreenCover>
        <div className='container-fluid p-0'>
          <Header
            onClick={link => this.navigateProfileHeader(link)}
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
                    <a
                      className='BrandLink Icon icon-back'
                      onClick={this.validationPopUp}
                    />
                    Profile
                  </h4>
                </div>

                <div>

                  <div className='col-md-12 card CardWidget SPCertificate'>
                    <EntityPersonalDetail
                      profilePercentage={this.props.profilePercentage}
                    />
                  </div>

                  <Education />

                </div>

              </div>
            </div>
          </div>
        </div>

        <ParticipantContainer
          onRef={ref => (this.participantComponent = ref)}
          isDisplayParticipantModal={
            this.state.selectedLink === 'telehealth' &&
              this.props.match.url !== Path.teleHealth &&
              this.props.canCreateConversation
          }
          onSetDisplayParticipantModal={() => {
            this.setState({ selectedLink: null })
          }}
          createConversation={() => {
            this.setState({ selectedLink: null })
          }}
        />
        <ModalPopup
          isOpen={this.props.showTelehealthInvite}
          ModalBody={
            <span>
              {this.props.initiatorFirstName}
              {' '}
              {this.props.initiatorLastName}
              {' '}
              is inviting you to join a video conference for
              {' '}
              {this.props.personalDetail.firstName}
              {' '}
              {this.props.personalDetail.lastName}
            </span>
          }
          btn1='Accept'
          btn2='Decline'
          className='zh'
          headerFooter='d-none'
          centered
          onConfirm={this.props.joinVideoConference}
          onCancel={this.props.rejectConference}
        />

        <ModalPopup
          isOpen={this.state.showValidationPopUp}
          ModalBody={
            <span>
              To increase your visibility across the care seeker network, please provide your Profile Information, Services Offered, Language Spoken and Availability. Do you want to continue with updating?
            </span>
          }
          btn1='Yes'
          btn2='No'
          className='zh'
          headerFooter='d-none'
          centered
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
    navigateProfileHeader: link => dispatch(push(link)),
    clearInvitaion: () => dispatch(clearInvitaion()),
    joinVideoConference: () => dispatch(joinVideoConference()),
    goToDashboard: () => dispatch(push(Path.dashboard)),
    rejectConference: () => dispatch(rejectConference())
  }
}

function mapStateToProps (state) {
  return {
    profilePercentage: state.profileState.progressIndicatorState
      .profilePercentage,
    canCreateConversation: state.asyncMessageState.canCreateConversation,
    showTelehealthInvite: state.telehealthState.isInvitationCame,
    serviceOfferedList: state.profileState.serviceOfferedState
      .serviceOfferedList,
    LanguagesList: state.profileState.LanguagesState.selectedLanguagesList,
    // availableDays: state.profileState.AvailabilityState.availableDays,
    initiatorFirstName: state.telehealthState.initiatorFirstName,
    initiatorLastName: state.telehealthState.initiatorLastName,
    personalDetail: state.profileState.PersonalDetailState.personalDetail
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
