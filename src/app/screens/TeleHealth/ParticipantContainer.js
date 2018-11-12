import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ParticipantListModal from './Modals/ParticipantListModal';
import ParticipantList from './ParticipantList';
import {
    getLinkedParticipantsByPatients,
    clearLinkedParticipants,
    createVideoConference,
    getLinkedPatients
} from '../../redux/telehealth/actions';
import SelectPatient from './SelectPatient';
import {USERTYPES} from '../../constants/constants';
import {getUserInfo} from '../../services/http'
import './styles.css';

class ParticipantsContainer extends Component {
    state = {
        selectedParticipants: [],
        searchText: '',
        selectedPatientDetails: {}
    };

    componentWillUnmount() {
        this.props.onRef(undefined)
    };

    componentDidMount() {
        this.props.onRef(this);
        this.props.getLinkedPatients();
    };

    onClearParticipantContainer = () => {
        this.setState({ selectedParticipants: [], searchText: '', selectedPatientDetails: {} });
        this.props.clearLinkedParticipants();
        this.props.onSetDisplayParticipantModal();
    };

    onCheckParticipant = (participant, event) => {
        let selectedParticipant = {
            userId: participant.userId,
            participantType: participant.participantType,
            firstName: participant.firstName,
            lastName: participant.lastName
        };
        let updatedParticipants = [...this.state.selectedParticipants];
        const index = updatedParticipants.indexOf(
              updatedParticipants.filter(el => el.userId === participant.userId)[0]
        );
        if (event.target.checked && index === -1) {
            this.setState({ selectedParticipants: [...this.state.selectedParticipants, selectedParticipant] });
        }
        if(!event.target.checked) {
            updatedParticipants.splice(index, 1);
            this.setState({ selectedParticipants: updatedParticipants });
        }
    };

    onCreateConversation = () => {
        this.props.createVideoConference(this.state.selectedParticipants);
    };

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        if (this.state.selectedPatientDetails && this.state.selectedPatientDetails.userId) {
            let data = {
                searchText: e.target.value,
                patientId: this.state.selectedPatientDetails.userId,
                conversationId: 0,
                userId: 0,
                participantType: USERTYPES.SERVICE_PROVIDER
            };
            this.props.getLinkedParticipantsByPatients(data);
        }
    };

    onSelectPatient = (patientId) => {
        if (patientId === null){
            this.props.clearLinkedParticipants();
        } else {
            let patientData = {
                userId: patientId,
                participantType: USERTYPES.PATIENT
            };
            let userId = getUserInfo().serviceProviderId;
            this.setState({ selectedPatientDetails: patientData, selectedParticipants: [] });
            let data = {
                userId: patientId,
                participantType: USERTYPES.PATIENT,
                searchText: this.state.searchText,
                patientId: patientId ? patientId : 0,
                conversationId: 0
            };
            this.props.getLinkedParticipantsByPatients(data);
        }
    };

    render() {
        let participantModalData = <form className="participantsSearchForm">
            <SelectPatient
                onSelect={this.onSelectPatient}
                patients={this.props.patients} />
            <p className="primaryColor mb-0 mt-4">Invite Participants</p>
            <ParticipantList
                selectedParticipants={this.state.selectedParticipants}
                onCheckParticipant={this.onCheckParticipant}
                onSearchTextChange={this.onSearchTextChange}
                selectedContext={this.state.selectedContext}
                searchText={this.state.searchText}
                participantList={this.props.participants} />
        </form>

        return (
            <ParticipantListModal
                isOpen={this.props.isDisplayParticipantModal}
                toggle={this.onClearParticipantContainer}
                ModalBody={participantModalData}
                className="modal-lg asyncModal box-modelnewsearch"
                modalTitle="Video Conference"
                centered="centered"
                isEnable={this.state.selectedParticipants.length > 0}
                createConversation={this.onCreateConversation}
            />
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data)),
        clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
        createVideoConference: (data) => dispatch(createVideoConference(data)),
        getLinkedPatients: () => dispatch(getLinkedPatients())
    }
};

function mapStateToProps(state) {
    return {
        patients: state.telehealthState.linkedPatients,
        participants: state.telehealthState.linkedParticipants
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParticipantsContainer));