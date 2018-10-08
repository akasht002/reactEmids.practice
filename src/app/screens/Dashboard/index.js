import React from 'react'
import {
  Scrollbars
} from '../../components'
import ServiceCalendar from './serviceCalendar'
import ServiceRequest from './serviceRequest'
import MyConversation from './myConversation'
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import { USERTYPES } from '../../constants/constants';
import './dashboard.css'
import './styles/toggleSwitch.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      conversationDetail: []
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
     /* Entity */
     let EntityUser = USERTYPES.Entity;
     alert(EntityUser)
    return (
      <AsideScreenCover isOpen={this.state.isOpen} toggle={this.toggle} active={'active'}>
        <div className='ProfileHeaderWidget'>
          <div className='ProfileHeaderTitle'>
            <h5 className='primaryColor m-0'>Dashboard</h5>
          </div>
          <div className='ProfileHeaderButton'>
            <span className='standBy'>Stand-by mode </span>
            <label className="switch">
              <input type="checkbox" />
              <span className="sliderSwitch round" />
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
            <div className='innerWidget'>
              <ServiceRequest />
            </div>
            <div className='innerWidget'>
              <MyConversation />
            </div>
          </div>
        </Scrollbars>
      </AsideScreenCover>
    )
  }
}

export default Dashboard
