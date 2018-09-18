import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    onFetchConversationSummary,
    onCreateNewConversation,
    goToConversation,
    getUnreadMessageCounts,
} from '../../../redux/asyncMessages/actions';
import MessageList from './MessageList';
import ParticipantsContainer from './ParticipantsContainer';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import '../styles.css';
import './index.css';

class ConversationSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayParticipantModal: false,
            isOpen: false,
        };
    };


    componentDidMount() {
        this.props.fetchConversationSummary();
        this.props.getUnreadMsgCounts();
    };


    onClickConversation = (msgThread, event) => {
        let userId = this.props.loggedInUser.serviceProviderId;
        this.props.gotoConversation(msgThread, userId);
    };

    onSetDisplayParticipantModal = () => {
        this.setState({ isDisplayParticipantModal: !this.state.isDisplayParticipantModal });
        this.participantComponent.onClearParticipantContainer();
    };

    onCreateConversation = () => {
        let userId = this.props.loggedInUser.serviceProviderId;
        let data = {
            participants: this.state.participants.toString(),
            createdBy: userId,
            title: this.state.converationTitle,
            createdByType: 'S',
        }
        this.props.createNewConversation(data);
    };

    gotoParticipantView = () => {
        this.participantComponent.gotoParticipantView();
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <AsideScreenCover >
                <div className="d-flex msgSectionWrapper">
                    <div className="container-fluid p-0">
                        <div className="width100 mainWidgetProfile">
                            <div className="container mainProfileContent">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12 d-flex p-0 my-3">
                                        <h5 className="font-weight-semi-bold mr-auto pageTitle">Conversation Summary</h5>
                                        {this.props.loggedInUser.userType !== 'S' && <button
                                            className="btn btn-primary ml-auto font-size-sm newConversationBtn"
                                            onClick={this.onSetDisplayParticipantModal}>+ New Conversation</button>}
                                    </div>
                                    <MessageList
                                        conversation={this.props.conversation}
                                        gotoConversations={this.onClickConversation}
                                        getUnreadMsgCounts={this.props.unreadMsgCounts} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <ParticipantsContainer
                        onRef={ref => (this.participantComponent = ref)}
                        isDisplayParticipantModal={this.state.isDisplayParticipantModal}
                        onSetDisplayParticipantModal={this.onSetDisplayParticipantModal}
                        createConversation={this.onCreateConversation}
                    />
                </div>
            </AsideScreenCover>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        fetchConversationSummary: () => dispatch(onFetchConversationSummary()),
        createNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        gotoConversation: (data, userId) => dispatch(goToConversation(data, userId)),
        getUnreadMsgCounts: () => dispatch(getUnreadMessageCounts()),
    }
};


function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState.conversationSummary,
        isLoading: state.loadingState.isLoading,
        unreadMsgCounts: state.asyncMessageState.unreadCounts,
        loggedInUser: state.authState.userState.userData.userInfo
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationSummary));