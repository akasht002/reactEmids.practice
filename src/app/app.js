import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import * as SignalR from '@aspnet/signalr';
import {
  pushConversation,
  pushUnreadCount,
  pushConversationSummary,
  getConversationItemSignalR,
  getConversationSummaryItemSignalR
} from './redux/asyncMessages/actions';

class App extends Component {

  componentDidMount() {
    let connection = new SignalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_SIGNALR_URL)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

    // connection.on("UpdateChat", data => {
    //     this.props.pushConversation(data.result);
    // });

    // connection.on("UpdateConversation", data => {
    //    this.props.pushConversationSummary(data.result);
    // });

    connection.on("UpdateChat", data => {
      const index = data.ParticipantList.indexOf(this.props.loggedInUser.userId);
      if(index !== -1){
        this.props.getConversationSummaryItemSignalR(data.conversationId);
        this.props.getConversationItemSignalR(data.conversationId, data.messageId)
      };
    });

    connection.start()
        .then(() => {
      }).catch(err => console.error(err.toString()));
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
    pushConversation: (data) => dispatch(pushConversation(data)),
    pushConversationSummary: (data) => dispatch(pushConversationSummary(data)),
    getConversationItemSignalR: (conversationId) => dispatch(getConversationItemSignalR(conversationId)),
    getConversationSummaryItemSignalR: (conversationId, messageId) => dispatch(getConversationSummaryItemSignalR(conversationId, messageId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

