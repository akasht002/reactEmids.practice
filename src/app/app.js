import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import * as SignalR from '@aspnet/signalr';
import {
  getConversationItemSignalR,
  getConversationSummaryItemSignalR
} from './redux/asyncMessages/actions';
import { getConversationSummaryDashboardSignalR } from './redux/dashboard/Dashboard/actions';
import {
  checkTeleHealth
} from './redux/telehealth/actions'
import {getUserInfo} from './services/http';
import { USERTYPES } from './constants/constants';

class App extends Component {

  componentDidMount() {
    let connection = new SignalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_SIGNALR_URL)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

    connection.on("UpdateChat", data => {
      if(data && getUserInfo()){
        let ParticipantList = data.result ? [...data.result.participantList] : [...data.participantList];
        const index = ParticipantList.indexOf(
          ParticipantList.filter(el => el.userId === getUserInfo().serviceProviderId && el.participantType === USERTYPES.SERVICE_PROVIDER)[0]
        );
        if(index !== -1){
          let conversationId = data.result ? data.result.conversationId : data.conversationId;
          let messageId = data.result ? data.result.conversationMessageId : data.conversationMessageId;
          this.props.getConversationSummaryItemSignalR(conversationId);
          this.props.getConversationItemSignalR(conversationId, messageId);
          this.props.getConversationSummaryDashboardSignalR(conversationId);
        };
      };
    });

    connection.on("TeleHealth", data => {
      this.props.checkTeleHealth(data);
    });

    connection.start()
        .then(() => {
      }).catch(err => console.error(err.toString()));
    
      connection.onclose((e) => {
        connection.start()
        .then(() => {
        }).catch(err => console.error(err.toString()));
      })
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

