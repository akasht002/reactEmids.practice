import React, { Component } from 'react';
import { Scrollbars } from '../../components';
import {getState, getUserInfo} from '../../utils/userUtility';
import './styles.css';

const images = require.context('../../assets', true);
const imagePath = (name) => images(name, true);

export default class TeleHealthParticipants extends Component {

    getParticipants = () => {
        return [ 
            <li className="list-group-item">
                <div className="TeleHealthParticipantAvatar">
                    <div className="TeleHealthAvatarContainer">
                        <img alt="participant" src={getState().profileState.PersonalDetailState.imageData.image ? getState().profileState.PersonalDetailState.imageData.image : require("../../assets/images/Blank_Profile_icon.png")}
                            className="avatarImage" />
                        <div className="memberType memT-I">S</div>
                    </div>
                    <div className="TeleHealthParticipantNameContainer">
                        <span className="Name">Me</span>
                        <span className="Status">Joined</span>
                    </div>
                </div>
            </li>
            ,
            this.props.participantList.map(participant => {
            return (
                <li className="list-group-item">
                    <div className="TeleHealthParticipantAvatar">
                        <div className="TeleHealthAvatarContainer">
                            <img alt="participant" src={participant.thumbNail ? participant.thumbNail : require("../../assets/images/Blank_Profile_icon.png")}
                                className="avatarImage" />
                            <div className="memberType memT-I">{participant.participantType}</div>
                        </div>
                        <div className="TeleHealthParticipantNameContainer">
                            <span className="Name">{participant.firstName + ' ' + participant.lastName}</span>
                            <span className="Status">{participant.status}</span>
                        </div>
                    </div>
                </li>
            )
        })
        ]
    }
    render() {
        let participants = "";
        if (this.props.participantList && this.props.participantList.length > 0) {
            participants = this.getParticipants();
        }
        return (
            <div className="TeleHealthParticipantList">
                <div className="TeleHealthParticipantListHeader">
                    <span className="sideParticipantsTitle primaryColor">Participants</span>
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