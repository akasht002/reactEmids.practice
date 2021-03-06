import React, { Component } from 'react';
import { Scrollbars } from '../../components';
import {getState} from '../../utils/userUtility';
import './styles.css';

export  class TeleHealthParticipants extends Component {

    getParticipants = () => {
        return [ 
            this.props.participantList && this.props.participantList.map(participant => {
                return (
                    <li className="list-group-item">
                        <div className="TeleHealthParticipantAvatar">
                            <div className="TeleHealthAvatarContainer">
                                <img alt="participant" src={participant.thumbNail ? participant.thumbNail : require("../../assets/images/Blank_Profile_icon.png")}
                                    className="avatarImage" />
                                <div className={"memberType memT-" + (participant.participantType === 'IG' ? 'I' : participant.participantType)}>{participant.participantType === 'IG' ? 'I' : participant.participantType}</div>
                            </div>
                            <div className="TeleHealthParticipantNameContainer">
                                <span className="Name">{participant.firstName + ' ' + participant.lastName}</span>
                                <span className="Status">{participant.status}</span>
                            </div>
                        </div>
                    </li>
                )
            }),
            <li className="list-group-item">
                <div className="TeleHealthParticipantAvatar">
                    <div className="TeleHealthAvatarContainer">
                        <img alt="participant" src={getState().profileState.PersonalDetailState.imageData.image ? getState().profileState.PersonalDetailState.imageData.image : require("../../assets/images/Blank_Profile_icon.png")}
                            className="avatarImage" />
                    </div>
                    <div className="TeleHealthParticipantNameContainer">
                        <span className="Name">Me</span>
                        <span className="Status">Joined</span>
                    </div>
                </div>
            </li>
        ]
    }
    render() {
        let participants = this.getParticipants();
        return (
            <div className="TeleHealthParticipantList">
                <div className="TeleHealthParticipantListHeader">
                    <span className="sideParticipantsTitle theme-primary">Participants</span>
                    {this.props.initiator && <span onClick={this.props.ToggleAddParticipantsListView}><i className="addParticipantsButton" /></span>}
                </div>
                <Scrollbars speed={2} smoothScrolling={true} horizontal={false}
                    className='TeleHealthParticipantsListContent'>
                    <div className="TeleHealthParticipants">
                        <div className="TeleHealthParticipantsList self">
                            <ul className="list-group">
                                {participants}
                            </ul>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export default  TeleHealthParticipants 