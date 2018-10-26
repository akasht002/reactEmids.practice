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
      showVisitModal: false
    }
  }
  componentDidMount() {
    this.props.getPersonalDetail();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.profileState.standByMode})
    if (nextProps.sbModeClicked) {
      this.props.clearSbMode();
      this.onSuccessSpBusyInVisit(nextProps.busyInVisit)
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onValueChange = () => {
    if(this.state.standByMode === false) {
        let visitProcess = this.checkVisitProcess();
        if(visitProcess === true){
            this.setState({showVisitModal: true})
        }
        else if(visitProcess === false) {
            let timeNow = new Date();
        this.setState({
            standByMode: true,
            standByModeStartTime: timeNow
        }, () => {
            this.props.updateStandByMode(this.state.standByMode, this.state.standByModeStartTime);
        }) }
    } else if(this.state.standByMode === true) {        
        this.onClickTurnOff();
    }
}  

  checkVisitProcess = () => {
    if(this.props.serviceVisit.length > 0) {
        let currentTimeSlot = this.compareTimeSlots();
        let currentVisit = this.props.serviceVisit.filter((visit)=> visit.slotDescription === currentTimeSlot)
        if(currentVisit.length > 0){
        return true
    } }
    return false
} 

  onClickTurnOff= () => {
    this.setState({showModalOnTurnOff: true})
  }

  onClickYes = () => {
    this.setState({showModalOnTurnOff: false})
    this.setState({
        standByMode: false
    }, () => {
        this.props.updateStandByMode(this.state.standByMode);
    })
 }

 compareTimeSlots = () => {
  let currentTime = new Date();
  if((moment(currentTime, 'h:mm:ss a').isBetween(moment('06:00:00 am', 'h:mm:ss a'), moment('11:59:59 am', 'h:mm:ss a'), null, '[]')))    
      return 'Morning';
  else  if((moment(currentTime, 'h:mm:ss a').isBetween(moment('12:00:00 pm', 'h:mm:ss a'), moment('05:59:59 pm', 'h:mm:ss a'), null, '[]')))
      return 'Afternoon';
  else  if((moment(currentTime, 'h:mm:ss a').isBetween(moment('06:00:00 pm', 'h:mm:ss a'), moment('11:59:59 pm', 'h:mm:ss a'), null, '[]')))
      return 'Evening'
}
  
  onValueChange = () => {
    if(this.state.isChecked === false) {    
    this.props.getSpBusyInVisit();
    } else if(this.state.isChecked === true) {        
        this.onClickTurnOff();
    }
}

onSuccessSpBusyInVisit = (visitProcess) => {
    if(visitProcess === true){
      this.setState({showVisitModal: true})
  }
  else if(visitProcess === false) {
  this.setState({
    isChecked: true
  }, () => {
            this.props.updateStandByMode(this.state.isChecked);
        })
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
        {/* <Scrollbars
          speed={2}
          smoothScrolling
          horizontal={false}
          className='SPContentWidget'
        > */}
        <div className="scrollarea SPContentWidget">
          <div className="scrollarea-content">
            <div className='ProfileContainer topProfile'>
              <ServiceCalendar />
            </div>
            <div className='ProfileContainer bottomProfile'>
              {serviceRequestTemplate}
              <div className='innerWidget'>
                <MyConversation />
              </div>
            </div>
          </div>
        </div>
        {/* </Scrollbars> */}
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

