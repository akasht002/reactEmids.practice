import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
import {ModalTemplate} from '../../components';
import {CanServiceProviderCreateMessage} from '../../redux/asyncMessages/actions';
import SelectPatient from './SelectPatient';
import {getUserInfo} from '../../services/http';
import { USERTYPES  } from '../../constants/constants';
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
        this.props.canServiceProviderCreateMessage();
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

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        let data = {
            searchText: e.target.value,
            contextId: this.state.selectedPatientDetails.length > 0 ? this.state.selectedPatientDetails.userId : null
        };
        this.props.getAllParticipants(data);
    };

    render() {
        let participantModalData = this.props.canCreateConversation && <form className="participantsSearchForm">
            <p className="primaryColor mb-0 mt-4">Invite Participants</p>
            <ParticipantList
                selectedParticipants={this.state.selectedParticipants}
                onCheckParticipant={this.onCheckParticipant}
                onSearchTextChange={this.onSearchTextChange}
                selectedContext={this.state.selectedContext}
                searchText={this.state.searchText} />
        </form>

        let participantListModal = this.props.canCreateConversation && <ParticipantListModal
            isOpen={this.props.isDisplayParticipantModal}
            toggle={this.onClearParticipantContainer}
            ModalBody={participantModalData}
            className="modal-lg asyncModal box-modelnewsearch"
            modalTitle="Video Conference"
            centered="centered"
            isEnable={this.state.selectedParticipants.length > 0}
            createConversation={this.onCreateConversation}
        />

        let modalContent = <div>
            <p className="text-center lead p-4 m-0">
                You cannot initiate conversation as you have no current service request.
                </p>
            <p className="text-right m-2">
                <Link className="btn btn-outline-primary mx-3" to="#" onClick={this.onConfirmCreateConversationPermission}>Ok</Link>
            </p>
        </div>

        let errorRequest = <ModalTemplate
            isOpen={!this.props.canCreateConversation}
            ModalBody={modalContent}
            className="modal-sm"
            headerFooter="d-none"
            centered={true}
        />

        let modalData = this.props.canCreateConversation ? participantListModal : errorRequest;

        return (
            {modalData}
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data)),
        clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
        createVideoConference: (data) => dispatch(createVideoConference(data)),
        getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
        getLinkedPatients: () => dispatch(getLinkedPatients()),
        canServiceProviderCreateMessage: () => dispatch(CanServiceProviderCreateMessage())
    }
};

function mapStateToProps(state) {
    return {
        patients: state.telehealthState.linkedPatients,
        canCreateConversation: state.asyncMessageState.canCreateConversation
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParticipantsContainer));