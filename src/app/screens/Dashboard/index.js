import React from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars } from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import {updateStandByMode} from '../../redux/dashboard/Dashboard/actions'
import { getUserInfo } from '../../services/http'
import './dashboard.css'
import './styles/toggleSwitch.css'
import './EntitySP/EntitySPDashboard.css';

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      conversationDetail: [],
      isChecked: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChecked = ()=> {
    this.setState({isChecked: !this.state.isChecked});
    this.props.updateStandByMode(this.state.isChecked)
  }
  
  render() {
    let serviceRequestTemplate;
    let entityUser = getUserInfo().isEntityServiceProvider;
    if(entityUser){
        serviceRequestTemplate = ""
    }else {
      serviceRequestTemplate = <div className='innerWidget'>
        <ServiceRequest />
      </div>
    }
    
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
              <input type='checkbox' checked={this.state.isChecked} onChange={ this.handleChecked } />
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
      </AsideScreenCover>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateStandByMode:data => dispatch(updateStandByMode(data))
  }
}

function mapStateToProps(state) {
  return {
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)

