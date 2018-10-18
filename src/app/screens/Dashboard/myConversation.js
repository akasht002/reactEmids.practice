import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './ProfileMainPanel.css'
import { getLength } from '../../utils/validations'
import { MyConversionDetail, MyConversionDefault } from './ServiceInfo'
import  EntityUserMyConversionDefault from  "./EntitySP/MyConversation";
import {goToConversation} from '../../redux/asyncMessages/actions';

import {
  getConversationDetail,
  getUnreadMessageCounts
} from '../../redux/dashboard/Dashboard/actions'
import { getUserInfo } from '../../services/http';

class MyConversation extends React.Component {
  componentDidMount() {
    let data = {
      page_no: '1',
      pae_size: '10'
    };
    this.props.getConversationDetail(data)
    this.props.getUnreadMessageCounts()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ conversationDetail: nextProps.conversationDetail })
  }

  onClickConversation = (msgThread, event) => {
    let userId = this.props.loggedInUser.serviceProviderId;
    this.props.gotoConversation(msgThread, userId);
  };

  render() {
    let entityUser = getUserInfo().isEntityServiceProvider;
    let conversation_data = this.props.conversationDetail
    let conversionDefault = entityUser ? <EntityUserMyConversionDefault />  : <MyConversionDefault />;

    let conversation_item = getLength(conversation_data) > 0
      ? <MyConversionDetail 
      gotoConversations={this.onClickConversation}
      conversation={conversation_data}
      getUnreadMsgCounts={this.props.unreadMsgCounts}/>
      : conversionDefault
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
    getConversationDetail: (data) => dispatch(getConversationDetail(data)),
    getUnreadMessageCounts: () => dispatch(getUnreadMessageCounts()),
    gotoConversation: (data, userId) => dispatch(goToConversation(data, userId)),
  }
}

function mapStateToProps(state) {
  return {
    conversationDetail: state.dashboardState.dashboardState.conversationDetail,
    loggedInUser: state.authState.userState.userData.userInfo,
    unreadMsgCounts: state.asyncMessageState.unreadCounts,
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyConversation)
)
