import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import * as SignalR from '@aspnet/signalr';
import {
  getConversationItemSignalR,
  getConversationSummaryItemSignalR
} from './redux/asyncMessages/actions';
import {getUserInfo} from './services/http';
import { USERTYPES } from './constants/constants';

class App extends Component {

  componentDidMount() {
    let connection = new SignalR.HubConnectionBuilder()
    .withUrl(process.env.REACT_APP_SIGNALR_URL)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

    connection.on("UpdateChat", data => {
      if(data && data.result){
        let ParticipantList = [...data.result.participantList];
        const index = ParticipantList.indexOf(
          ParticipantList.filter(el => el.userId === getUserInfo().serviceProviderId && el.participantType === USERTYPES.SERVICE_PROVIDER)[0]
        );
        if(index !== -1){
          this.props.getConversationSummaryItemSignalR(data.result.conversationId);
          this.props.getConversationItemSignalR(data.result.conversationId, data.result.conversationMessageId)
        };
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
    getConversationItemSignalR: (conversationId, messageId) => dispatch(getConversationItemSignalR(conversationId, messageId)),
    getConversationSummaryItemSignalR: (conversationId) => dispatch(getConversationSummaryItemSignalR(conversationId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

