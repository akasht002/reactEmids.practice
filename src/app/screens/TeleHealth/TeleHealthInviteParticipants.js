import React, { Component } from 'react';
import ParticipantList from './ParticipantList';
import './styles.css';


export default class TeleHealthInviteParticipants extends Component {

    state = {
        selectedParticipants: [],
        searchText: '',
        selectedPatientDetails: {}
    };

    onClearParticipantContainer = () => {
        this.setState({ selectedParticipants: [], title: '', searchText: '', selectedPatientDetails: {} });
        this.props.clearLinkedParticipants();
    };

    onCheckParticipant = (participant, event) => {
        let selectedParticipant = {
            userId: participant.userId,
            participantType: participant.participantType,
            firstName: participant.firstName,
            lastName: participant.lastName,
            thumbNail: participant.thumbNail,
            participantId: participant.participantId
        };
        let updatedParticipants = [...this.state.selectedParticipants];
        const index = updatedParticipants.indexOf(
            updatedParticipants.filter(el => el.userId === participant.userId)[0]
        );
        if (event.target.checked && index === -1) {
            this.setState({ selectedParticipants: [...this.state.selectedParticipants, selectedParticipant] });
        }
        if (!event.target.checked) {
            updatedParticipants.splice(index, 1);
            this.setState({ selectedParticipants: updatedParticipants });
        }
    };

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        this.props.getAllParticipants(e.target.value);
    };

    AddParticipantsToConference = () => {
        this.props.addParticipantsToConference(this.state.selectedParticipants);
        this.setState({ selectedParticipants: [], searchText: '', selectedPatientDetails: {} });
        this.props.ToggleAddParticipantsListView();
    };

    onClearParticipantContainer = () => {
        this.setState({ selectedParticipants: [], searchText: '', selectedPatientDetails: {} });
        this.props.ToggleAddParticipantsListView();
    };

    render() {

        return (
            <div className={"TeleHealthParticipantInvite " + this.props.AddParticipants}>
                <div className="TeleHealthParticipantListHeader">
                    <span className="sideParticipantsTitle primaryColor">Invite Participants</span>
                    <span onClick={this.onClearParticipantContainer}><i className="ParticipantClose" /></span>
                </div>
                <form>
                    <ParticipantList
                        selectedParticipants={this.state.selectedParticipants}
                        onCheckParticipant={this.onCheckParticipant}
                        onSearchTextChange={this.onSearchTextChange}
                        searchText={this.state.searchText} 
                        participantList={this.props.participantList}/>
                    <div className="TeleHealthAddBottom">
                        <button disabled={this.state.selectedParticipants.length<=0} type="button" onClick={this.AddParticipantsToConference}
                        className="btn btn-primary TeleHealthAddDoneButton">Done</button>
                    </div >
                </form >
            </div >
        );
    }
}