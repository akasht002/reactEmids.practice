import React from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars, ModalPopup } from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import {updateStandByMode} from '../../redux/dashboard/Dashboard/actions'
import {getPersonalDetail, getSpBusyInVisit} from '../../redux/profile/PersonalDetail/actions'
import { getUserInfo } from '../../services/http'
import './dashboard.css'
import './ctdashboard.css'
import './styles/toggleSwitch.css'
import './EntitySP/EntitySPDashboard.css';

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
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  onValueChange = () => {
    if(this.state.isChecked === false) {    
    this.props.getSpBusyInVisit(this.onSuccessSpBusyInVisit);
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
            <span className='standBy'>Stand-by mode </span>
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
          ModalBody={<span>Standby Mode cannot be switched on during a Visit processing, Click "Ok" in the pop up to close the popup.</span>}
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
              showModalOnTurnOff: !this.state.showModalOnTurnOff
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
    getSpBusyInVisit:(onSuccess) => dispatch(getSpBusyInVisit(onSuccess))
  }
}

function mapStateToProps(state) {
  return {
    profileState: state.profileState.PersonalDetailState.personalDetail,
    busyInVisit: state.profileState.PersonalDetailState.spBusyInVisit
  }
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)

