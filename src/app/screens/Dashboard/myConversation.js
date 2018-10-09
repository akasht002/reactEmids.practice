import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './ProfileMainPanel.css'
import { getLength } from '../../utils/validations'
import { MyConversionDetail, MyConversionDefault ,EntityUserMyConversionDefault} from './ServiceInfo'

import {
  getConversationDetail,
  getUnreadMessageCounts
} from '../../redux/dashboard/Dashboard/actions'
import { getUserInfo } from '../../services/http';

class MyConversation extends React.Component {
  componentDidMount() {
    this.props.getConversationDetail()
    this.props.getUnreadMessageCounts()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ conversationDetail: nextProps.conversationDetail })
  }

  render() {
    let entityUser = getUserInfo().isEntityServiceProvider;
    let conversation_data = this.props.conversationDetail
    let ConversionDefault="";
    if(entityUser){
      ConversionDefault = <EntityUserMyConversionDefault /> 
    } else {
      ConversionDefault = <MyConversionDefault />
    }
  


    let conversation_item = getLength(conversation_data) > 0
      ? <MyConversionDetail conversation={conversation_data} />
      : ConversionDefault
    return (
      <div className='card ProfileCard'>
        <div className='ProfileCardBody'>
          <div className='ProfileCardHeader'>
            <span className='ProfileCardHeaderTitle primaryColor'>
              My Conversations
            </span>
            <Link className='ProfileCardHeaderLink' to='/messagesummary'>View all</Link>
          </div>
          
          <div className='topPalette ProfileConversation'>
            <ul className='list-group ProfileConversationWidget'>
              {conversation_item}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getConversationDetail: () => dispatch(getConversationDetail()),
    getUnreadMessageCounts: () => dispatch(getUnreadMessageCounts())
  }
}

function mapStateToProps(state) {
  return {
    conversationDetail: state.dashboardState.dashboardState.conversationDetail
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyConversation)
)
