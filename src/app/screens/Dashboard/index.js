import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ModalPopup } from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'
import { getPersonalDetail, getSpBusyInVisit, clearSbMode, updateStandByMode } from '../../redux/profile/PersonalDetail/actions'
import { getUserInfo } from '../../services/http'
import { getProfilePercentage } from '../../redux/profile/ProgressIndicator/actions';
import { getAboutUsContent, getBuildVersion } from '../../redux/aboutUs/actions';
import { getUserInformation } from '../../redux/auth/UserAgreement/actions';
import {
  PROFILE_SERVICE_PROVIDER_TYPE_ID
} from '../../constants/constants';
import { getMessageFallBackInterval } from '../../redux/asyncMessages/actions';
import './dashboard.css'
import './ctdashboard.css'
import './styles/toggleSwitch.css'
import './EntitySP/EntitySPDashboard.css'
import moment from 'moment'
import { createDataStore } from '../../redux/telehealth/actions'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      conversationDetail: [],
      isChecked: false,
      showModalOnTurnOff: false,
      showVisitModal: false,
      checkEightHour: false,
      checkEveryHour: false
    }
    this.remMin = 0;
    this.clearInterval = null;
    this.CheckClickToggle = false;
    this.spStandByStartTime = null;

  }
  componentDidMount() {
    this.props.getPersonalDetail();
    this.props.getSpBusyInVisit();
    this.props.clearSbMode();
    this.props.getProfilePercentage();
    this.props.getAboutUsContent();
    this.props.getBuildVersion();
    this.props.getUserInformation();
    this.props.getMessageFallBackInterval()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.profileState.standByMode })
    if (nextProps.sbModeClicked) {
      this.props.clearSbMode();
      this.onSuccessSpBusyInVisit(nextProps.busyInVisit)
    }
    if (nextProps.busyInVisit && this.CheckClickToggle) {
      if (nextProps.busyInVisit.isServiceProviderInStandBy) {
        this.standByTimer(nextProps.busyInVisit)
      }
    }
  }

  componentWillUnmount() {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onValueChange = () => {
    this.CheckClickToggle = true;
    if (this.state.isChecked === false) {
      this.props.getSpBusyInVisit();
    } else if (this.state.isChecked === true) {
      this.onClickTurnOff();
    }
  }

  onSuccessSpBusyInVisit = (visitProcess) => {

    if (this.CheckClickToggle && visitProcess.isServiceProviderBusyInVisit === true) {
      this.setState({ showVisitModal: true })
    }
    else if (this.CheckClickToggle && visitProcess.isServiceProviderBusyInVisit === false) {
      this.props.updateStandByMode(true);
      this.CheckClickToggle = false;
    }
    if (visitProcess.isServiceProviderInStandBy === true) {
      this.standByTimer(visitProcess)
    }

  }

  standByTimer(visitProcess) {
    this.spStandByStartTime = visitProcess.serviceProviderStandByStartDateTime;
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
    let startTime = moment.utc(visitProcess.serviceProviderStandByStartDateTime).local().format();
    let currentDateTime = moment(new Date());
    let duration = moment.duration(currentDateTime.diff(startTime))
    let hours = duration.hours();
    if (hours >= 8) {
      this.setState({ checkEightHour: true });
      this.props.updateStandByMode(false);
    } else {
      let minutes = duration.minutes();
      this.remMin = 60 - minutes;
      this.clearInterval = setInterval(() => {
        this.remMin = this.remMin - 1;
        if (this.remMin === 0) {
          this.setState({ checkEveryHour: true })
        }
        if (this.remMin === -5) {
          this.checkEveryHourNo();
        }
      }, 60000)
    }
  }

  onClickTurnOff = () => {
    this.setState({ showModalOnTurnOff: true })
  }

  onClickYes = () => {
    this.setState({ showModalOnTurnOff: false })
    this.CheckClickToggle = false;
    this.props.updateStandByMode(false);
  }

  checkEveryHourYes = () => {
    this.setState({ checkEveryHour: false });
    let visitProcess = {};
    visitProcess.serviceProviderStandByStartDateTime = this.spStandByStartTime;
    this.standByTimer(visitProcess);
  }

  checkEveryHourNo = () => {
    if (this.clearInterval) {
      clearInterval(this.clearInterval);
    }
    this.setState({ checkEveryHour: false })
    this.props.updateStandByMode(false);
  }

  render() {
    let entityUser = getUserInfo().isEntityServiceProvider;

    let serviceRequestTemplate = entityUser ? "" :
      <div className='innerWidget'><ServiceRequest /></div>;
    return (
      <AsideScreenCover
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        active={'active'}
      >
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Dashboard</h5>
          </div>
          {
            (!entityUser && getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID) ?
              <div className='ProfileHeaderButton'>
                <span className='standBy'>Stand by</span>
                <label className='switch'>
                  <input type='checkbox' checked={this.state.isChecked}
                    onChange={this.onValueChange}
                  />
                  <span className='sliderSwitch round' />
                </label>
              </div>
              :
              ""
          }
        </div>
        <div className="scrollarea SPContentWidget ScrollBar updated-scrll">
          <div className="scrollarea-content">
            <div className='ProfileContainer topProfile'>
              <ServiceCalendar createDataStore={this.props.createDataStore}/>
            </div>
            <div className='ProfileContainer bottomProfile'>
              {serviceRequestTemplate}
              <div className='innerWidget'>
                <MyConversation />
              </div>
            </div>
          </div>
        </div>
        <ModalPopup
          isOpen={this.state.showVisitModal}
          ModalBody={<span className="default-444">Standby Mode cannot be switched on during a Visit processing.</span>}
          btn1='OK'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() =>
            this.setState({
              showVisitModal: false
            })}
        />
        <ModalPopup
          isOpen={this.state.showModalOnTurnOff}
          ModalBody={<span>Are you sure you want to turn off the standby mode?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={this.onClickYes}
          onCancel={() =>
            this.setState({
              showModalOnTurnOff: false
            })}
        />
        <ModalPopup
          isOpen={this.state.checkEveryHour}
          ModalBody={<span>Do you want to continue to be on Standby?</span>}
          btn1='YES'
          btn2='NO'
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={this.checkEveryHourYes}
          onCancel={this.checkEveryHourNo}
        />
        <ModalPopup
          isOpen={this.state.checkEightHour}
          ModalBody={<span>You have reached the maximum time limit for Standby mode today. Standby mode will be enabled again tomorrow.</span>}
          btn1='OK'
          toggle={() =>
            this.setState({
              checkEightHour: false
            })}
          className='modal-sm'
          headerFooter='d-none'
          centered='centered'
          onConfirm={() =>
            this.setState({
              checkEightHour: false
            })}

        />
      </AsideScreenCover>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateStandByMode: data => dispatch(updateStandByMode(data)),
    getPersonalDetail: () => dispatch(getPersonalDetail()),
    getSpBusyInVisit: () => dispatch(getSpBusyInVisit()),
    clearSbMode: () => dispatch(clearSbMode()),
    getProfilePercentage: () => dispatch(getProfilePercentage()),
    getAboutUsContent: () => dispatch(getAboutUsContent()),
    getBuildVersion: () => dispatch(getBuildVersion()),
    getUserInformation: () => dispatch(getUserInformation()),
    getMessageFallBackInterval: () => dispatch(getMessageFallBackInterval()),
    createDataStore: data => dispatch(createDataStore(data)),
  }
}

function mapStateToProps(state) {
  return {
    profileState: state.profileState.PersonalDetailState.personalDetail,
    busyInVisit: state.profileState.PersonalDetailState.spBusyInVisit,
    sbModeClicked: state.profileState.PersonalDetailState.sbModeClicked
  }
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)

