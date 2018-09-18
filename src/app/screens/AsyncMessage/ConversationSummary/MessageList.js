import React, { Component } from "react";
import TimeAgo from 'timeago-react';
import './MessageCard.css';
import { MessageTypes } from '../../../data/AsyncMessage';

class MessageList extends Component {

    newConversation = () => {
        return (<table className="table noConversation">
            <tbody>
                <tr>
                    <td className={"align-middle text-center noMessageWidget"}>
                        <img alt="no content" className={"noMessageImg"} src={require("../../../assets/images/exclamation-mark.svg")} />
                        <p className={"noMessageText"}>Click on "New Conversation" button to start.</p>
                    </td>
                </tr>
            </tbody>
        </table>)
    };

    participantsContent = (participants) => {
        let extraParticipants = (participants.length - 3);
        return (
            participants.map((participant, index) => {
                let zIndex = (participants.length - index);
                let zIndexStyle = { zIndex: zIndex };
                switch (index) {
                    case 0:
                    case 1:
                    case 2:
                        return (
                            <div key={index} className="avatarContainer" style={zIndexStyle}>
                                <img alt="participant" src={require("../../../assets/images/Blank_Profile_icon.png")}
                                    className="avatarImage" />
                            </div>
                        )
                    case 3:
                        return (
                            <div key={index} className="avatarContainer">
                                <div
                                    className="avatarImage totalMembers">
                                    {"+" + extraParticipants}
                                </div>
                            </div>
                        );
                    default:
                        break;
                }
            }));
    };

    getPartcipitantHeader = (participants) => {
        let header = "";
        if (participants && participants.length > 0) {
            participants.map(participant => {
                header += participant.firstName.charAt(0).toUpperCase() + participant.firstName.slice(1) + ', ';
            });
            header = header.slice(0, -2);
        }
        return header;
    };

    render() {
        let msgClass = "";
        let msgHeader = "";
        let messageThreads = "";
        let unreadMessages = "";
        if (this.props.conversation.length === 0) {
            messageThreads = this.newConversation();
        } else {
            messageThreads = this.props.conversation.map((msgThread, index) => {
                if (this.props.getUnreadMsgCounts.length > 0) {
                    unreadMessages = "";
                    msgClass = "readMsgs";
                    this.props.getUnreadMsgCounts.map(unreadMsgCount => {
                        if (msgThread.conversationId === unreadMsgCount.conversationId) {
                            msgClass = "";
                            return unreadMessages = <span className={"float-right count" + msgClass}>{unreadMsgCount.unreadMessageCount}</span>
                        }
                    });
                };

                if (!msgThread.title) {
                    msgHeader = this.getPartcipitantHeader(msgThread.participantList);

                } else {
                    msgHeader = msgThread.title;
                };
                return (
                    <li key={index} className="list-group-item">
                        <table className={"table " + msgClass} onClick={this.props.gotoConversations.bind(this, msgThread)}>
                            <tbody>
                                <tr>
                                    <td className="avatarWidget align-middle">
                                        {this.participantsContent(msgThread.participantList)}
                                    </td>
                                    <td className="MsgThreadContent align-middle">
                                        <span className="MsgIndiTitle chatHeaderText">{msgHeader}</span>
                                        <p className="m-0 MsgContent">
                                            {msgThread.messageType === MessageTypes.image &&
                                                <span className="chatHeaderText"><i className='addAttachmentBtn d-inline-block' /> Image</span>}
                                            {msgThread.messageType === MessageTypes.text &&
                                                <span className="chatHeaderText">{msgThread.messageText}</span>}
                                        </p>
                                    </td>
                                    <td className="MsgCount align-middle">
                                        {unreadMessages}
                                        <span className="width100 d-block float-right MsgTime">
                                            <TimeAgo datetime={msgThread.createdDate} />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                )
            });
        }
        return (
            <div className="col-md-12 MessageCard msgContainerWrapper">
                <div className="msgContent col-md-12">
                    <ul className="list-group">
                        {messageThreads}
                    </ul>
                </div>
            </div>
        );
    }
};

export default MessageList;