import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Checkbox from './Components/checkbox';
import { Input } from '../../components';
import { NO_RESULT_FOUND, CONVERSATION_SUMMARY, NO_PARTICIPANTS_FOUND } from '../../constants/constants';
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
                        return '';
                    })
                    return (<Checkbox key={index} isChecked={isChecked} onCheckParticipant={this.props.onCheckParticipant} participant={participantData} />)
                }
                else {
                    return (<Checkbox key={index} onCheckParticipant={this.props.onCheckParticipant} participant={participantData} />)
                }
            });
        }
        else{
            return this.props.openedAsyncPage === CONVERSATION_SUMMARY && NO_PARTICIPANTS_FOUND;
         }
    };

    render() {
        return (
            <div className="full-blockvideoconf">
                <Input
                    id='participantsSearch'
                    autoComplete='false'
                    type='text'
                    placeholder='Search'
                    className='form-control searchParticipants'
                    textChange={this.props.onSearchTextChange}
                    iconStyle='icon-search'
                />
                <div className="participantsSearchList pd-left-10new">
                {(this.props.searchText === '' ? 
                this.participants() : NO_RESULT_FOUND)}
                </div>
            </div>
        )
    };
};

export default withRouter(ParticipantsList);