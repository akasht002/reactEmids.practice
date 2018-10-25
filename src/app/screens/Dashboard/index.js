import React from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars } from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import {updateStandByMode} from '../../redux/dashboard/Dashboard/actions'
import {getPersonalDetail} from '../../redux/profile/PersonalDetail/actions'
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
      isChecked: false
    }
  }
  componentDidMount() {
    this.props.getPersonalDetail()
  }
  
  componentWillReceiveProps(nextProps) {
   this.setState({ isChecked: nextProps.profileState.standByMode })
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
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
            <span className='standBy'>Stand-by</span>
            <label className='switch'>
              <input type='checkbox' checked={this.state.isChecked} onChange={ e => {
                this.setState({isChecked: e.target.checked})
                this.props.updateStandByMode(this.state.isChecked)
               }} />
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
    updateStandByMode:data => dispatch(updateStandByMode(data)),
    getPersonalDetail:() => dispatch(getPersonalDetail())
  }
}

function mapStateToProps(state) {
  return {
    profileState: state.profileState.PersonalDetailState.personalDetail
  }
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)

