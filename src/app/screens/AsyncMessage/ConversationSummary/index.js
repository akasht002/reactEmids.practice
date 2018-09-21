import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
    onFetchConversationSummary,
    onCreateNewConversation,
    goToConversation,
    getUnreadMessageCounts,
    CanServiceProviderCreateMessage
} from '../../../redux/asyncMessages/actions';
import MessageList from './MessageList';
import ParticipantsContainer from './ParticipantsContainer';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import ModalTemplate from '../Modals/Modal';
import '../styles.css';
import './index.css';
import { USERTYPES } from '../../../constants/constants';

class ConversationSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayParticipantModal: false,
            isOpen: false,
            noPermission: false
        };
    };


    componentDidMount() {
        this.props.fetchConversationSummary();
        this.props.getUnreadMsgCounts();
        this.props.canServiceProviderCreateMessage();
    };


    onClickConversation = (msgThread, event) => {
        let userId = this.props.loggedInUser.serviceProviderId;
        this.props.gotoConversation(msgThread, userId);
    };

    onSetDisplayParticipantModal = () => {

        if (this.props.canCreateConversation) {
            this.setState({ isDisplayParticipantModal: !this.state.isDisplayParticipantModal });
        } else {
            this.setState({ noPermission: true })
        }
        this.participantComponent.onClearParticipantContainer();
    };

    onCreateConversation = () => {
        let userId = this.props.loggedInUser.serviceProviderId;
        let data = {
            participants: this.state.participants.toString(),
            createdBy: userId,
            title: this.state.converationTitle,
            createdByType: USERTYPES.SERVICE_PROVIDER,
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

    onConfirmCreateConversationPermission = () => {
        this.setState({ noPermission: !this.state.noPermission })
    };

    render() {
        let modalContent = <div>
            <p className="text-center lead p-4 m-0">
                You cannot initiate conversation as you have no current service request.
                </p>
            <p className="text-right m-2">
                <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.onConfirmCreateConversationPermission}>Ok</Link>
            </p>
        </div>
        return (
            <AsideScreenCover >
                <div className="container-fluid p-0">
                    <div className="width100 mainWidgetProfile">
                        <div className="container mainProfileContent">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-12 d-flex p-0 my-4 slightTopview">
                                    <h5 className="font-weight-semi-bold mr-auto pageTitle">Conversation Summary</h5>
                                    {this.props.loggedInUser.userType !== USERTYPES.SERVICE_PROVIDER && <button
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

                <ModalTemplate
                    isOpen={this.state.noPermission}
                    ModalBody={modalContent}
                    className="modal-sm"
                    headerFooter="d-none"
                    centered={true}
                />
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
        canServiceProviderCreateMessage: () => dispatch(CanServiceProviderCreateMessage()),
    }
};


function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState.conversationSummary,
        isLoading: state.loadingState.isLoading,
        unreadMsgCounts: state.asyncMessageState.unreadCounts,
        loggedInUser: state.authState.userState.userData.userInfo,
        canCreateConversation: state.asyncMessageState.canCreateConversation

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationSummary));