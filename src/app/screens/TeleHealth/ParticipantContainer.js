import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ParticipantListModal from './Modals/ParticipantListModal';
import ParticipantList from './ParticipantList';
import {
    clearLinkedParticipants,
    createVideoConference,
    getLinkedPatients,
    saveContextData,
    GetAllParticipants
} from '../../redux/telehealth/actions';
import SelectPatient from './SelectPatient';
import {USERTYPES} from '../../constants/constants';
import './styles.css';

export class ParticipantsContainer extends Component {
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
            this.props.getAllParticipants(e.target.value);
        }
    };

    onSelectPatient = (patientId) => {
        if (patientId === null){
            this.props.saveContextData(0);
            this.props.clearLinkedParticipants();
        } else {
            let patientData = {
                userId: patientId,
                participantType: USERTYPES.PATIENT
            };
            this.props.saveContextData(patientId);
            this.setState({ selectedPatientDetails: patientData, selectedParticipants: [] });
            this.props.getAllParticipants(this.state.searchText);
        }
    };

    render() {
        let participantModalData = <form className="participantsSearchForm videoblock-upnew">
            <SelectPatient
                onSelect={this.onSelectPatient}
                patients={this.props.patients} />
                <div className="view-fullheight">
                {this.props.contextId ? <div className="block-selectview">
                    <p className="primaryColor mb-0 mt-4">Invite Participants</p>
                    <p className="selctview">{this.state.selectedParticipants.length} selected</p>
                </div> : null}
                {this.props.contextId ? <ParticipantList
                    selectedParticipants={this.state.selectedParticipants}
                    onCheckParticipant={this.onCheckParticipant}
                    onSearchTextChange={this.onSearchTextChange}
                    selectedContext={this.state.selectedContext}
                    searchText={this.state.searchText}
                    participantList={this.props.participants} /> : null}
                </div>
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


export function mapDispatchToProps(dispatch) {
    return {
        getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
        clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
        createVideoConference: (data) => dispatch(createVideoConference(data)),
        getLinkedPatients: () => dispatch(getLinkedPatients()),
        saveContextData: (data) => dispatch(saveContextData(data))
    }
};

export function mapStateToProps(state) {
    return {
        patients: state.telehealthState.linkedPatients,
        participants: state.telehealthState.linkedParticipants,
        contextId: state.telehealthState.contextId
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParticipantsContainer));