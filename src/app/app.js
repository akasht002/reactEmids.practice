import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import {
  getConversationItemSignalR,
  getConversationSummaryItemSignalR,
  getUnreadConversationByUserId,
  getLatestMessages
} from './redux/asyncMessages/actions';
import { getConversationSummaryDashboardSignalR } from './redux/dashboard/Dashboard/actions';
import {
  checkTeleHealth
} from './redux/telehealth/actions'
import {getUserInfo} from './services/http';
import { USERTYPES } from './constants/constants';
import {connection, startConnection, onConnectionClosed} from './utils/signalrUtility';

class App extends Component {

  componentDidMount() {

    connection.on("UpdateChat", data => {
      if(data && getUserInfo()){
        let ParticipantList = data.result ? [...data.result.participantList] : [...data.participantList];
        const index = ParticipantList.indexOf(
          ParticipantList.filter(el => el.userId === getUserInfo().serviceProviderId && el.participantType === USERTYPES.SERVICE_PROVIDER)[0]
        );
        if(index !== -1){
          let conversationId = data.result ? data.result.conversationId : data.conversationId;
          //let messageId = data.result ? data.result.conversationMessageId : data.conversationMessageId;
          this.props.getConversationSummaryItemSignalR(conversationId);
          //this.props.getUnreadConversationByUserId(conversationId)
          this.props.getLatestMessages(conversationId);
          this.props.getConversationSummaryDashboardSignalR(conversationId);
        };
      };
    });

    connection.on("TeleHealth", data => {
      this.props.checkTeleHealth(data);
    });

    startConnection();
    
    onConnectionClosed();
  }

  render() {
    return (
      <AppStackRoot history={this.props.history} />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState,
    currentConversationPage: state.asyncMessageState.openedAsyncPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getConversationItemSignalR: (conversationId, messageId) => dispatch(getConversationItemSignalR(conversationId, messageId)),
    getConversationSummaryItemSignalR: (conversationId) => dispatch(getConversationSummaryItemSignalR(conversationId)),
    checkTeleHealth: (data) => dispatch(checkTeleHealth(data)),
    getConversationSummaryDashboardSignalR: (conversationId) => dispatch(getConversationSummaryDashboardSignalR(conversationId)),
    getUnreadConversationByUserId: (conversationId) => dispatch(getUnreadConversationByUserId(conversationId)),
    getLatestMessages: (conversationId) => dispatch(getLatestMessages(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

