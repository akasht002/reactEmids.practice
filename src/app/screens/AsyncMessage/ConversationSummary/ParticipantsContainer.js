import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../../components';
import ParticipantsListModal from '../Modals/ParticipantsListModal';
import ParticipantsList from './ParticipantsList';
import {
    onCreateNewConversation,
    getLinkedPatients,
    getLinkedParticipantsByPatients,
    clearLinkedParticipants
} from '../../../redux/asyncMessages/actions';
import SelectPatient from './SelectPatient';
import '../styles.css';
import { USERTYPES } from '../../../constants/constants';

const conversationId = 0;

export class ParticipantsContainer extends Component {
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
        this.props.getLinkedPatients();
    };

    onClearParticipantContainer = () => {
        this.setState({ selectedParticipants: [], title: '', searchText: '', selectedPatientDetails: {} });
        this.props.clearLinkedParticipants();
    };

    onCheckParticipant = (participant, event) => {
        let selectedParticipant = {
            userId: participant.userId,
            participantType: participant.participantType,
            participantId: participant.participantId
        };
        let updatedParticipants = [...this.state.selectedParticipants];
        const index = updatedParticipants.indexOf(
            updatedParticipants.filter(el => el.userId === participant.userId
                && el.participantType === participant.participantType)[0]
        );
        if (event.target.checked && index === -1) {
            this.setState({ selectedParticipants: [...this.state.selectedParticipants, selectedParticipant] });
        }
        if (!event.target.checked) {
            updatedParticipants.splice(index, 1);
            this.setState({ selectedParticipants: updatedParticipants });
        }
    };

    onCreateConversation = () => {
        let selectedParticipants = [...this.state.selectedParticipants];
        let data = {
            participantList: selectedParticipants,
            title: this.state.title.trim(),
            context: this.state.selectedPatientDetails.userId
        };
        this.props.createNewConversation(data);
    };

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        let data = {};
        let userId = this.props.loggedInUser.serviceProviderId;
        if (this.state.selectedPatientDetails && this.state.selectedPatientDetails.userId) {
            data = {
                searchText: e.target.value,
                patientId: this.state.selectedPatientDetails.userId,
                conversationId: conversationId,
                userId: userId,
                participantType: USERTYPES.SERVICE_PROVIDER
            };
            this.props.getLinkedParticipantsByPatients(data);
        }
    };

    onSelectPatient = (patientId) => {
        this.props.clearLinkedParticipants();
        this.onClearSelectedParticipants();
        if(patientId !== null){
            let patientData = {
                userId: patientId,
                participantType: USERTYPES.PATIENT
            };
        let userId = this.props.loggedInUser.serviceProviderId;
        this.setState({ selectedPatientDetails: patientData, selectedParticipants: [] });
        let data = {
            userId: userId,
            participantType: USERTYPES.SERVICE_PROVIDER,
            searchText: this.state.searchText,
            patientId: patientId ? patientId : 0,
            conversationId: conversationId
        };
        this.props.getLinkedParticipantsByPatients(data);
        }
    };

    onClearSelectedParticipants = () => {
        this.setState({ selectedParticipants: [], selectedPatientDetails: {} });
    };

    render() {
        let participantModalData = <form className="participantsSearchForm">
            <Input
                id='conversationTitle'
                autoComplete='false'
                type='text'
                label='Title'
                className='form-control'
                value={this.state.title}
                maxlength="100"
                textChange={this.onTitleChange}
            />
            <SelectPatient
                onSelect={this.onSelectPatient}
                patients={this.props.patients} />
            { (Object.getOwnPropertyNames(this.state.selectedPatientDetails).length === 0) &&
            <span className="text-muted d-block">
                Please select an Individual to continue.
            </span>}

            <p className="theme-primary mb-0 mt-4">Add Participants</p>
            <ParticipantsList
                selectedParticipants={this.state.selectedParticipants}
                conversationId={conversationId}
                onCheckParticipant={this.onCheckParticipant}
                onSearchTextChange={this.onSearchTextChange}
                selectedContext={this.state.selectedContext}
                searchText={this.state.searchText} 
                />

        </form>
        return (
            <ParticipantsListModal
                isOpen={this.props.isDisplayParticipantModal}
                toggle={this.props.onSetDisplayParticipantModal}
                ModalBody={participantModalData}
                className="modal-lg asyncModal box-modelnewsearch list-fullblock"
                modalTitle="New Conversation"
                centered="centered"
                isEnable={this.state.selectedParticipants.length > 0}
                createConversation={this.onCreateConversation}
            />
        )
    }
};


export function mapDispatchToProps(dispatch) {
    return {
        createNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        getLinkedPatients: () => dispatch(getLinkedPatients()),
        getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data)),
        clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
    }
};


export function mapStateToProps(state) {
    return {
        patients: state.asyncMessageState.linkedPatients,
        loggedInUser: state.authState.userState.userData.userInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsContainer);