import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Checkbox from './Components/checkbox';
import { Input } from '../../components';
import './styles.css';

class ParticipantsList extends Component {

    participants = () => {
        if (this.props.participantList && this.props.participantList.length > 0) {
            return this.props.participantList.map((participantData, index) => {
                if (this.props.selectedParticipants.length > 0) {
                    let isChecked = "";
                    this.props.selectedParticipants.map((selectedParticipant) => {
                        if (selectedParticipant.userId === participantData.userId && selectedParticipant.participantType === participantData.participantType) {
                            return isChecked = "checked";
                        }
                    })
                    return (<Checkbox key={index} isChecked={isChecked} onCheckParticipant={this.props.onCheckParticipant} participant={participantData} />)
                }
                else {
                    return (<Checkbox key={index} onCheckParticipant={this.props.onCheckParticipant} participant={participantData} />)
                }
            });
        };
    };

    render() {
        return (
            <div>
                <Input
                    id='participantsSearch'
                    autoComplete='false'
                    type='text'
                    placeholder='search'
                    className='form-control searchParticipants'
                    textChange={this.props.onSearchTextChange}
                    iconStyle='icon-search'
                />
                <div className="participantsSearchList">
                    {this.participants()}
                </div>
            </div>
        )
    };
};

export default withRouter(ParticipantsList);