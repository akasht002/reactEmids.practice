import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ParticipantListModal from './Modals/ParticipantListModal';
import ParticipantList from './ParticipantList';
import {
    getLinkedParticipantsByPatients,
    clearLinkedParticipants,
    createVideoConference,
    GetAllParticipants,
    getLinkedPatients
} from '../../redux/telehealth/actions';
import SelectPatient from './SelectPatient';
import {getUserInfo} from '../../services/http';
import './styles.css';
import { USERTYPES  } from '../../constants/constants';

class ParticipantsContainer extends Component {
    state = {
        selectedParticipants: [],
        title: '',
        searchText: '',
        selectedPatientDetails: {}
    };

    componentWillUnmount() {
        this.props.onRef(undefined)
    };

    componentDidMount() {
        this.props.onRef(this);
        if (getUserInfo().userType === 'G') {
            this.props.getLinkedPatients();
        };
    };

    onClearParticipantContainer = () => {
        this.setState({ selectedParticipants: [], title: '', searchText: '', selectedPatientDetails: {} });
        this.props.clearLinkedParticipants();
        this.props.onSetDisplayParticipantModal();
    };

    onCheckParticipant = (participant, event) => {
        let selectedParticipant = {
            userId: participant.userId,
            participantType: participant.participantType
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

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        let data = {
                searchText: e.target.value,
                contextId: this.state.selectedPatientDetails.length > 0 ? this.state.selectedPatientDetails.userId : null
            };
           this.props.getAllParticipants(data);
    };

    onSelectPatient = (patientId) => {
        let patientData = {
            userId: patientId,
            participantType: USERTYPES.PATIENT
        };
        this.setState({ selectedPatientDetails: patientData, selectedParticipants: [] });
        let data = {
            userId: getUserInfo().userId,
            participantType: getUserInfo().userType,
            searchText: this.state.searchText,
            patientId: patientId ? patientId : 0,
            conversationId: 0
        };
        this.props.getLinkedParticipantsByPatients(data);
    };

    render() {
        let participantModalData = <form className="participantsSearchForm">
            {this.props.loggedInUser.userType === 'G' && <SelectPatient
                onSelect={this.onSelectPatient}
                patients={this.props.patients} />}

            <p className="primaryColor mb-0 mt-4">Invite Participants</p>
            <ParticipantList
                selectedParticipants={this.state.selectedParticipants}
                onCheckParticipant={this.onCheckParticipant}
                onSearchTextChange={this.onSearchTextChange}
                selectedContext={this.state.selectedContext}
                searchText={this.state.searchText} />

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
        getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
        getLinkedPatients: () => dispatch(getLinkedPatients())
    }
};


function mapStateToProps(state) {
    return {
        patients: state.telehealthState.linkedPatients,
        loggedInUser: getUserInfo()
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParticipantsContainer));