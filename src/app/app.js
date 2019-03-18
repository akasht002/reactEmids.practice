import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppStackRoot from './routes';
import {
  getLatestMessages,
  checkConversationExist,
  checkConversationCreated,
  setConversationId
} from './redux/asyncMessages/actions';
import { getConversationSummaryDashboardSignalR } from './redux/dashboard/Dashboard/actions';
import {
  checkTeleHealth
} from './redux/telehealth/actions'
import { getUserInfo } from './services/http';
import { USERTYPES } from './constants/constants';
import { connection, startConnection, onConnectionClosed } from './utils/signalrUtility';
import { isMobileBrowser } from './utils/browserUtility';
import {MobileLanding} from '../app/screens';
class App extends Component {

  componentDidMount() {

    connection.on("ConversationCreated", data => {
      if (data) {
        this.props.checkConversationCreated(data)
      }
    });

    connection.on("UpdateMesssageCount", data => {
      if (data) {
        this.props.checkConversationExist(data)
      }
    });

    connection.on("UpdateChat", data => {
      if (data && getUserInfo()) {
        let ParticipantList = data.result ? [...data.result.participantList] : [...data.participantList];
        const index = ParticipantList.indexOf(
          ParticipantList.filter(el => el.userId === getUserInfo().coreoHomeUserId && el.participantType === USERTYPES.SERVICE_PROVIDER)[0]
        );
        if (index !== -1) {
          let conversationId = data.result ? data.result.conversationId : data.conversationId;
          this.props.getLatestMessages(conversationId);
          this.props.getConversationSummaryDashboardSignalR(conversationId);
          this.props.setConversationId(conversationId);
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
    let view = isMobileBrowser ? <MobileLanding /> : <AppStackRoot history={this.props.history} />
    return (
      <div>
        {view}
      </div>
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
    checkTeleHealth: (data) => dispatch(checkTeleHealth(data)),
    getConversationSummaryDashboardSignalR: (conversationId) => dispatch(getConversationSummaryDashboardSignalR(conversationId)),
    getLatestMessages: (conversationId) => dispatch(getLatestMessages(conversationId)),
    checkConversationExist: (conversationId) => dispatch(checkConversationExist(conversationId)),
    checkConversationCreated: (data) => dispatch(checkConversationCreated(data)),
    setConversationId: (data) => dispatch(setConversationId(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

