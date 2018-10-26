import React from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars, ModalPopup } from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover'
import {getPersonalDetail, getSpBusyInVisit, clearSbMode, updateStandByMode} from '../../redux/profile/PersonalDetail/actions'
import { getUserInfo } from '../../services/http'
import './dashboard.css'
import './ctdashboard.css'
import './styles/toggleSwitch.css'
import './EntitySP/EntitySPDashboard.css'
import moment from 'moment'

class Dashboard extends React.Component {
  constructor (props) {
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
  }
  componentDidMount() {
    this.props.getPersonalDetail();
    this.props.getSpBusyInVisit();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.profileState.standByMode})
    if (nextProps.sbModeClicked) {
      this.props.clearSbMode();
      this.onSuccessSpBusyInVisit(nextProps.busyInVisit)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
 }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onValueChange = () => {
    if(this.state.isChecked === false) {    
    this.props.getSpBusyInVisit();
    } else if(this.state.isChecked === true) {        
        this.onClickTurnOff();
    }
}

onSuccessSpBusyInVisit = (visitProcess) => {
    if(visitProcess.isServiceProviderBusyInVisit === true){
      this.setState({showVisitModal: true})
  }
  else if(visitProcess.isServiceProviderBusyInVisit === false) {
  this.setState({
    isChecked: true
  }, () => {
            this.props.updateStandByMode(this.state.isChecked);
        })
    }
    if(visitProcess.isServiceProviderInStandBy === true) {
      let startTime = moment(visitProcess.serviceProviderStandByStartDateTime);
      let currentDateTime =  moment().format('MM/DD/YYYY HH:mm')
     // let currentTime = new Date();
      let duration = moment.duration(startTime.diff(currentDateTime))
      let hours = duration.hours();
      if (hours >= 8) {
        this.setState({checkEightHour: true});
        this.props.updateStandByMode(false);
      } else {
      let minutes = duration.minutes();
      let remainMinutes = minutes % 60;
      this.remMin = remainMinutes;
      this.clearInterval = setInterval(() => {
        this.remMin++;
        if (remainMinutes === 60) {
          this.setState({checkEveryHour: true})
        }
        if (remainMinutes === 65) {
          this.checkEveryHourNo();
        } 
        }, 60000)
      }
      
      // checkHours = 
    }
  
}

  onClickTurnOff= () => {
    this.setState({showModalOnTurnOff: true})
  }

  onClickYes = () => {
    this.setState({showModalOnTurnOff: false})
    this.setState({
      isChecked: false
    }, () => {
        this.props.updateStandByMode(this.state.isChecked);
    })
 }

 checkEveryHourYes = () => {
  this.setState({checkEveryHour: false});
  this.remMin = 0;
 }

 checkEveryHourNo = () => {
   if(this.clearInterval) {
     clearInterval(this.clearInterval);
   }
  this.setState({checkEveryHour: false})
  this.setState({
    isChecked: false
  }, () => {
      this.props.updateStandByMode(this.state.isChecked);
  })
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
          <div className='ProfileHeaderButton'>
            <span className='standBy'>Stand by</span>
            <label className='switch'>
              <input type='checkbox' checked={this.state.isChecked}
              onChange={this.onValueChange}
               />
              <span className='sliderSwitch round' />
            </label>
          </div>
        </div>
        <Scrollbars
          speed={2}
          smoothScrolling
          horizontal={false}
          className='SPContentWidget'
        >
          <div className='ProfileContainer topProfile'>
            <ServiceCalendar />
          </div>
          <div className='ProfileContainer bottomProfile'>
            {serviceRequestTemplate}
            <div className='innerWidget'>
              <MyConversation />
            </div>
          </div>
        </Scrollbars>
        <ModalPopup
          isOpen={this.state.showVisitModal}
          ModalBody={<span>Standby Mode cannot be switched on during a Visit processing.</span>}
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
          ModalBody={<span>Are you sure, you want to turn off the Standby mode and start the Visit Processing?</span>}
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
    updateStandByMode:data => dispatch(updateStandByMode(data)),
    getPersonalDetail:() => dispatch(getPersonalDetail()),
    getSpBusyInVisit:() => dispatch(getSpBusyInVisit()),
    clearSbMode: () => dispatch(clearSbMode())
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

