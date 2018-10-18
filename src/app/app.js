import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import * as SignalR from '@aspnet/signalr';
import {
  pushConversation,
  pushUnreadCount,
  pushConversationSummary
} from './redux/asyncMessages/actions';

class App extends Component {

  componentDidMount() {
    let connection = new SignalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_SIGNALR_URL)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

    connection.on("UpdateChat", data => {
      if(this.props.currentConversationPage === 'conversation'){
        this.props.pushConversation(data.result);
      }
    });

    connection.on("UpdateConversation", data => {
      if(this.props.currentConversationPage === 'conversationSummary'){
       this.props.pushConversationSummary(data.result);
      }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

