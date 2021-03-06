import React, { Component } from 'react';
import TimeAgo from 'timeago-react';
import autosize from "autosize";
import { connect } from 'react-redux';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { MessageTypes } from '../../../data/AsyncMessage';
import {
    goToConversationSummary,
    getConversationImageWithImageId,
    clearConversationImageUrl,
    updateReadStatus
} from '../../../redux/asyncMessages/actions';
import AsyncImgModalTemplate from "../Modals/ImageModal";
import { USERTYPES, ImageFormats } from '../../../constants/constants';
import { handelEnterSpace } from '../../../utils/stringHelper';

export class MessageContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadedImageFile: '',
            imgBinary: '',
            imgName: '',
            isDirty: false,
            asyncImgModal: false,
            asyncImgModalContent: '',
            height: '',
        };
    };

    componentDidMount() {
        this.scrollToBottom();
        autosize(this.textarea);
        this.props.onRef(this);
    };


    componentDidUpdate() {
        this.scrollToBottom();
        autosize(this.textarea);
        this.props.onRef(this);
    };

    componentWillUnmount() {
        this.props.onRef(undefined);
    };

    onSelectImage = (file) => {
        this.props.onImageUpload();
        this.setState({
            uploadedImageFile: '',
            imgBinary: '',
            imgName: '',
        });
        let picture = file[0];
        if(picture){
            if (picture.size <= 2097152 && (picture.type === ImageFormats.JPG ||
                picture.type === ImageFormats.PNG ||
                picture.type === ImageFormats.JPEG ||
                picture.type === ImageFormats.GIF)) {
                let reader = new FileReader();
                reader.readAsDataURL(picture);
                setTimeout(() => {
                    this.setState({ imgBinary: reader.result, uploadedImageFile: URL.createObjectURL(picture), imgName: picture.name });
                }, 100);
            } else {
                this.props.onInvalidImageSelection();
            }
        }
    };

    closePreview = () => {
        this.props.closePreview();
        this.setState({
            uploadedImageFile: '',
            imgBinary: '',
            imgName: ''
        })
    };

    scrollToBottom = () => {
        // this.messagesEnd.scrollIntoView({ behavior: "auto" });
    };

    onClickSendMessage = () => {
        this.props.onClickSendMessage(this.state.imgBinary);
        this.setState({
            height: 38
        })

        this.scrollToBottom();
    };

    backToMessageSummary = (e) => {
        if (this.state.imgName || this.props.messageText.trim().length > 0 || (this.props.title !== this.props.exististingTitle)) {
            this.props.isDirty(true, true);
        } else {
            this.props.updateReadStatus({conversationId: this.props.conversationId})
            this.props.goToConversationSummary();
        }
    };

    imageZoom = (messageData) => {
        if (this.props.messageUrl.length === 0) {
            this.props.getConversationImageWithImageId(messageData.conversationMessageId);
        } else {
            this.props.clearConversationImageUrl();
        };
    };

    static getDerivedStateFromProps(props, state) {
        return {
            asyncImgModal: props.messageUrl && props.messageUrl.length > 0 ? true : false
        };
    };


    render() {
        let editTitleClass = "";
        let imgUploaded = "";
        let previewImage = null;
        if (this.props.isEditTitle) {
            editTitleClass = "Edit"
        };

        if (!this.state.uploadedImageFile) {
            imgUploaded = "";
            previewImage = "";
        };

        if (this.state.uploadedImageFile) {
            imgUploaded = "ImgUploaded";
            previewImage = <tr>
                <td className="border-0 pb-0" />
                <td className="wsnw border-0 PreviewImage pb-0">
                    <img alt="preview" src={this.state.uploadedImageFile} />
                    <a className="close" onClick={this.closePreview}>&times;</a>
                </td>
                <td className="border-0 pb-0">
                </td>
            </tr>
        };

        let conversations = "";
        let accesDenied = !this.props.conversation.isActive || (this.props.conversation.createdBy !== this.props.loggedInUser.coreoHomeUserId
             && this.props.conversation.createdByType !== this.props.loggedInUser.userType) ? true : false;
        if (this.props.conversation.messages && this.props.conversation.messages.length > 0) {
            conversations = this.props.conversation.messages.map((conversation, index) => {
                let messageClass = "";
                let imageClass = "";
                let ordering = "";
                let userId = this.props.loggedInUser.coreoHomeUserId;
                if (conversation.createdBy === userId && conversation.createdByType === USERTYPES.SERVICE_PROVIDER) {
                    messageClass = "ml-auto yourChat";
                    ordering = "order-12"
                } else {
                    messageClass = "mr-auto";
                }
                if (conversation.messageType === MessageTypes.image) {
                    imageClass = <span className={"bubbleImageMsg"} dir={conversation.images} onClick={this.imageZoom.bind(this, conversation)}>
                        <img key={index} alt="" src={conversation.thumbnail} /></span>
                }
                return (
                    <div className={"chatMessage " + messageClass}>
                        <div className={"avatarContainer " + ordering}>
                            <img key={index} alt="i" src={ conversation.createdByThumbnail ? conversation.createdByThumbnail : require("../../../assets/images/Blank_Profile_icon.png")}
                                className="avatarImage" />
                        </div>
                        <div className="ChatBubble theme-primary">
                            <div className="bubbleHeader d-flex">
                                <span className="mr-auto memberName">{conversation.firstName + ' ' + conversation.lastName}</span>
                                <span className="ml-auto messageTime"><TimeAgo datetime={moment.utc(conversation.createdDate).local().format()} /></span>
                            </div>
                            <div className="bubbleBody">
                                <span className={"bubbleMsg " + handelEnterSpace(conversation.messageText)}>{conversation.messageText}</span>
                                <span>{imageClass}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        } else if(!this.props.isLoading) {
            conversations = (<table className="table noMessage">
                <tbody>
                    <tr>
                        <td className={"align-middle text-center noMessageWidget"}>
                            <img alt="no content" className={"noMessageImg"} src={require('../../../assets/images/exclamation-mark.svg')} />
                            <p className={"noMessageText"}>Send a message to begin conversation.</p>
                        </td>
                    </tr>
                </tbody>
            </table>)
        };

        return (
            <section>
                <table className="table tableLayoutFixed">
                    <tbody>
                        <tr>
                            <td className="chatHeader align-middle" ref={this.setChatHeaderRef}>
                                <div className="Content d-flex">
                                    <div className="chatHeaderTextWidgetLeft mr-auto d-flex">
                                        <div className="chatBackButton" onClick={this.backToMessageSummary}></div>
                                        <div className={"titleWidget" + editTitleClass}>
                                            <span className="MsgIndiTitle chatHeaderText">
                                                {this.props.title ? this.props.title : "Add Title"}
                                            </span>
                                            {!accesDenied &&
                                                <button
                                                className="editButton"
                                                onClick={this.props.onToggleEditTitle} />
                                            }
                                            
                                            <button disabled={!this.props.conversation.isActive}
                                                className="ParticipantslistButton showParticipantList"
                                                onClick={this.props.toggleParticipantList} />
                                        </div>
                                        <div className={"editTitleWidget" + editTitleClass}>
                                            <div className="form">
                                                <input
                                                    id="groupTitle"
                                                    autoComplete='false'
                                                    type='text'
                                                    className='form-control'
                                                    onChange={this.props.onChangeTitle}
                                                    value={this.props.title ? this.props.title : ''}
                                                    maxLength="100"
                                                />
                                                <input
                                                    name='submit'
                                                    type='button'
                                                    className='btn submitTitle'
                                                    value=''
                                                    onClick={this.props.onSubmitChangeTitle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="chatMsgContent align-bottom">
                                <div className={"Content " + imgUploaded}>

                                    {conversations}
                                    <div
                                        ref={(el) => { this.messagesEnd = el; }}>
                                    </div>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td className={"chatFooter align-middle " + imgUploaded}>
                                <table className="table">
                                    <tbody>
                                        {previewImage}
                                        <tr>
                                            <td className="addAttachmentWidget">
                                                <div title=" " className={!this.props.conversation.isActive || this.props.messageText.trim().length > 0 ? "upload-btn-wrapper dis-attach" : 'upload-btn-wrapper'}>
                                                    <Dropzone
                                                    disabled={!this.props.conversation.isActive || this.props.messageText.trim().length > 0}
                                                    onDrop={(files) => this.onSelectImage(files)}>
                                                            <button className="addAttachmentBtn">
                                                        </button>
                                                    </Dropzone>
                                                </div>
                                            </td>
                                            <td className="messageTypeWidget">
                                                <textarea
                                                    className={'form-control msgTextArea ' + (this.state.imgName ? "d-none" : '')}
                                                    aria-hidden="true"
                                                    ref={c => (this.textarea = c)}
                                                    rows={1}
                                                    style={{
                                                        height: this.state.height
                                                    }}
                                                    disabled={!this.props.conversation.isActive}
                                                    placeholder="Write your message here.."
                                                    maxLength="1000"
                                                    value={this.props.messageText}
                                                    onChange={this.props.onChangeMessage} />
                                            </td>
                                            <td className="sendButtonWidget">
                                                <button
                                                    onClick={this.onClickSendMessage}
                                                    className="btn btn-primary text-uppercase"
                                                    disabled={(this.props.messageText.trim().length === 0 && this.state.uploadedImageFile.length === 0) || !this.props.conversation.isActive}
                                                    value="send">Send</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <AsyncImgModalTemplate
                    isOpen={this.state.asyncImgModal}
                    toggle={this.imageZoom}
                    ModalBody={this.props.messageUrl}
                    className="modal-lg"
                    modalTitle="New Conversation"
                    centered="centered"
                />
            </section>
        )
    }
};


export function mapDispatchToProps(dispatch) {
    return {
        goToConversationSummary: () => dispatch(goToConversationSummary()),
        getConversationImageWithImageId: (messageId) => dispatch(getConversationImageWithImageId(messageId)),
        clearConversationImageUrl: () => dispatch(clearConversationImageUrl()),
        updateReadStatus: (data) => dispatch(updateReadStatus(data))
    }
};

export function mapStateToProps(state) {
    return {
        messageUrl: state.asyncMessageState.conversationImageUrl,
        canCreateConversation : state.asyncMessageState.canCreateConversation,
        conversationId: state.asyncMessageState.conversationId
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContent);