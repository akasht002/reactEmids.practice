import React, { Component } from 'react';
import { Scrollbars } from '../../components';
import './styles.css';

const images = require.context('../../assets', true);
const imagePath = (name) => images(name, true);

export default class TeleHealthParticipants extends Component {

    getParticipants = () => {
        return this.props.participantList.map(participant => {
            return (
                <li className="list-group-item">
                    <div className="TeleHealthParticipantAvatar">
                        <div className="TeleHealthAvatarContainer">
                            <img alt="participant" src={imagePath('./images/telehealth/user-1.jpg')}
                                className="avatarImage" />
                            <div className="memberType memT-I">{participant.participantType}</div>
                        </div>
                        <div className="TeleHealthParticipantNameContainer">
                            <span className="Name">{participant.firstName + ' ' + participant.lastName}</span>
                            <span className="Status">Joined</span>
                        </div>
                    </div>
                </li>
            )
        })
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
                    <span onClick={this.props.ToggleAddParticipantsListView}><i className="addParticipantsButton" /></span>
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