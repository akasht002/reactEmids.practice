import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import MessageContent from './MessageContent';
import ParticipantContent from './ParticipantContent';
import {
    onFetchConversation,
    onSaveTitle,
    onSendNewMessage,
    leaveConversation,
    pushConversation,
    updateReadStatus
} from '../../../redux/asyncMessages/actions';
import ModalTemplate from '../Modals/Modal';
import { Preloader } from '../../../components';
import { MessageTypes } from '../../../data/AsyncMessage';
import { AsideScreenCover } from '../../ScreenCover/AsideScreenCover';
import '../styles.css';

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: false,
            title: '',
            displayWarningMessage: false,
            messageText: '',
            conversationId: props.match.params.id,
            selectedProfile: '',
            showParticipantList: false,
            displayGreyedOut: false,
            isDirty: false,
            uploadedImageFile: null,
            selectedRemovableParticipant: {},
            onDispalyRemoveParticipantWarning: false,
            isMessageContentIsDirty: false,
            imageSelectionError: false,
            exististingTitle: '',
            isOpen: false,
        };

    }

    static getDerivedStateFromProps(props, state) {
        if (!state.editTitle)
            return {
                title: props.conversation.title,
                exististingTitle: props.conversation.title
            };
        return null;
    };

    toggleParticipantList = () => {
        this.setState({
            showParticipantList: !this.state.showParticipantList
        });
    };

    componentDidMount() {
        let userId = this.props.loggedInUser.serviceProviderId;
        this.props.getConversations(this.props.match.params.id);
        this.setState({ isGotoParticipantView: false, title: this.props.conversation.title });
        let data = {
            userId: userId,
            conversationId: this.props.match.params.id
        };
        this.props.updateUnreadCount(data);
    };

    onChangeTitle = (e) => {
        this.setState({ title: e.target.value });
    };

    onToggleEditTitle = () => {
        this.setState({ editTitle: !this.state.editTitle });
    };

    onSubmitChangeTitle = () => {
        let userId = this.props.loggedInUser.serviceProviderId;
        if ((this.state.title.trim() !== this.props.currentConversation.title) || (this.state.title.trim().length === 0 && this.props.currentConversation.title > 0)) {
            let data = {
                conversationId: this.props.currentConversation.conversationId,
                title: this.state.title.trim(),
                modifiedBy: userId,
                oldTitle: this.props.currentConversation.title,
                modifiedByType: 'S'
            }
            this.props.onSaveTitle(data);
        } else {
            this.setState({ title: this.props.currentConversation.title })
        }
        this.onToggleEditTitle();
    };

    displayWarningPopup = () => {
        this.setState({ displayWarningMessage: !this.state.displayWarningMessage });
        this.participantComponent.closeProfileOptions();
    };

    closePreview = () => {
        this.setState({ uploadedImageFile: '' });
    }

    onImageUpload = () => {
        this.setState({ messageText: '' });
    };

    onClickSendMessage = (picture) => {
        let participants = [];
        let userId = this.props.loggedInUser.serviceProviderId;
        if (this.props.currentConversation && this.props.currentConversation.participantList) {
            this.props.currentConversation.participantList.map(participant => {
                participants.push(participant.userId);
            });

            let data = {
                conversationId: this.props.currentConversation.conversationId,
                messageType: MessageTypes.text,
                messageText: this.state.messageText.trim(),
                participants: participants.toString(),
                createdBy: userId,
                createdByType: 'S'
            };

            if (picture) {
                data.images = picture;
                data.messageType = MessageTypes.image;
            };
            this.props.sendMessage(data);
            this.setState({ messageText: '', uploadedImageFile: '' });
            this.messageComponent.closePreview();
        }
    };

    leaveConversation = () => {
        let userId = this.props.loggedInUser.serviceProviderId;
        let data = {
            conversationId: this.props.currentConversation.conversationId,
            userId: userId
        };
        this.props.leaveConversation(data);
        this.displayWarningPopup();
    };

    onChangeMessage = (e) => {
        this.setState({ messageText: e.target.value });
    };

    closeOption() {
        this.setState({
            selectedProfile: ''
        });
    };

    setIsDirty = (isFormDirty, module) => {
        this.setState({ isDirty: isFormDirty, isMessageContentIsDirty: module });
    };

    setDisplayGreyedOut = () => {
        this.setState({ displayGreyedOut: !this.state.displayGreyedOut });
    };

    isDirtydisplayWarningPopup = () => {
        this.setState({ isDirty: !this.state.isDirty })
    };

    gotoParticipantView = () => {
        if (!this.state.isMessageContentIsDirty) {
            this.isDirtydisplayWarningPopup();
            this.setDisplayGreyedOut();
            this.participantComponent.gotoParticipantView();
        } else {
            this.isDirtydisplayWarningPopup();
            this.props.history.push('/messagesummary');
        }
    };

    onInvalidImageSelection = () => {
        this.setState({ imageSelectionError: true });
    };

    onConfirmInvalidImageSelection = () => {
        this.setState({ imageSelectionError: false });
    };

    onCilckRemoveParticipant = (participant) => {
        this.setState({ selectedRemovableParticipant: participant, onDispalyRemoveParticipantWarning: true });
    };

    onCancelRemoveParticipant = () => {
        this.setState({ selectedRemovableParticipant: {}, onDispalyRemoveParticipantWarning: false });
        this.participantComponent.closeProfileOptions();
    };

    onConfirmRemoveParticipant = () => {
        this.setState({ selectedRemovableParticipant: {}, onDispalyRemoveParticipantWarning: false });
        this.participantComponent.onConfirmRemoveParticipant();
    };

    onCancelTitleWarning = () => {
        this.setState({ selectedRemovableParticipant: {}, onDispalyRemoveParticipantWarning: false });
        this.participantComponent.closeProfileOptions();
    };

    onConfirmRemoveParticipant = () => {
        this.setState({ selectedRemovableParticipant: {}, onDispalyRemoveParticipantWarning: false });
        this.participantComponent.onConfirmRemoveParticipant();
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let modalContent = "";
        if (this.state.onDispalyRemoveParticipantWarning) {
            modalContent = <div>
                <p className="text-center lead p-4 m-0">
                    Are you sure you want to remove {this.state.selectedRemovableParticipant.firstName + ' ' + this.state.selectedRemovableParticipant.lastName} from the conversation?
                </p>
                <p className="text-right m-2">
                    <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.onCancelRemoveParticipant}>Cancel</Link>
                    <button className="btn btn-primary" onClick={this.onConfirmRemoveParticipant}>Remove</button>
                </p>
            </div>
        }
        if (this.state.imageSelectionError) {
            modalContent = <div>
                <p className="text-center lead p-4 m-0">
                    Please select a valid image. Image format should be JPEG / GIF / PNG and file should be less than 2 MB.
                </p>
                <p className="text-right m-2">
                    <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.onConfirmInvalidImageSelection}>Ok</Link>
                </p>
            </div>
        }
        if (this.state.displayWarningMessage) {
            modalContent = <div>
                <p className="text-center lead p-4 m-0">
                    Are you sure you want to leave this conversation?
                </p>
                <p className="text-right m-2">
                    <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.displayWarningPopup}>Cancel</Link>
                    <button className="btn btn-primary" onClick={this.leaveConversation}>Confirm</button>
                </p>
            </div>
        };
        if (this.state.isDirty) {
            modalContent = <div>
                <p className="text-center lead p-4 m-0">
                    Do you want to discard the changes?
                </p>
                <p className="text-right m-2">
                    <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.isDirtydisplayWarningPopup}>No</Link>
                    <button className="btn btn-primary" onClick={this.gotoParticipantView}>Yes</button>
                </p>
            </div>
        };

        return (
            <AsideScreenCover>
                <div className="d-flex msgSectionWrapper">
                    {this.props.isLoading && <Preloader />}
                    <div className="container-fluid p-0">
                        <div className="width100 mainWidgetProfile">
                            <div className="container mainProfileContent">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12 d-flex p-0 my-3">
                                        <h5 className="font-weight-semi-bold mr-auto pageTitle detailsview-title">My Conversations</h5>
                                    </div>
                                    <div className="col-md-12 card chatContainerWrapper">
                                        <table className="table width100">
                                            <tbody>
                                                <tr>
                                                    <td className="chatContentWidget ">
                                                        <div className={(this.state.displayGreyedOut ? "PanelDisabled" : 'd-none')} />
                                                        <MessageContent
                                                            onRef={ref => (this.messageComponent = ref)}
                                                            conversation={this.props.conversation}
                                                            onChangeTitle={this.onChangeTitle}
                                                            isEditTitle={this.state.editTitle}
                                                            onSubmitChangeTitle={this.onSubmitChangeTitle}
                                                            title={this.state.title}
                                                            onToggleEditTitle={this.onToggleEditTitle}
                                                            onClickSendMessage={this.onClickSendMessage}
                                                            onChangeMessage={this.onChangeMessage}
                                                            messageText={this.state.messageText}
                                                            toggleParticipantList={this.toggleParticipantList}
                                                            unreadCounts={this.props.unreadCounts}
                                                            loggedInUser={this.props.loggedInUser}
                                                            onImageUpload={this.onImageUpload}
                                                            isDirty={this.setIsDirty}
                                                            closePreview={this.closePreview}
                                                            onInvalidImageSelection={this.onInvalidImageSelection}
                                                            exististingTitle={this.state.exististingTitle} />
                                                    </td>
                                                    <td className={"participantsWidget " + this.state.showParticipantList}>
                                                        <ParticipantContent
                                                            onRef={ref => (this.participantComponent = ref)}
                                                            displayWarningPopup={this.displayWarningPopup}
                                                            existingParticipants={this.props.conversation.participantList}
                                                            toggleParticipantList={this.toggleParticipantList}
                                                            conversationId={this.state.conversationId}
                                                            isActive={this.props.conversation.isActive}
                                                            title={this.state.title}
                                                            context={this.props.conversation.context}
                                                            isDirty={this.setIsDirty}
                                                            setDisplayGreyedOut={this.setDisplayGreyedOut}
                                                            onCilckRemoveParticipant={this.onCilckRemoveParticipant}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalTemplate
                        isOpen={this.state.displayWarningMessage
                            || this.state.isDirty
                            || this.state.onDispalyRemoveParticipantWarning
                            || this.state.imageSelectionError}
                        ModalBody={modalContent}
                        className="modal-sm"
                        headerFooter="d-none"
                        centered={true}
                    />
                </div>
            </AsideScreenCover>
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        getConversations: (conversationId) => dispatch(onFetchConversation(conversationId)),
        onSaveTitle: (data) => dispatch(onSaveTitle(data)),
        sendMessage: (data) => dispatch(onSendNewMessage(data)),
        leaveConversation: (data) => dispatch(leaveConversation(data)),
        pushConversation: (data) => dispatch(pushConversation(data)),
        updateUnreadCount: (data) => dispatch(updateReadStatus(data))
    }
};

function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState.conversation,
        isLoading: state.asyncMessageState.isLoading,
        currentConversation: state.asyncMessageState.currentConversation,
        loggedInUser: state.authState.userState.userData.userInfo,

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation));