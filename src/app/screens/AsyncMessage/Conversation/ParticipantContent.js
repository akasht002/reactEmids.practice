import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParticipantsList from '../ConversationSummary/ParticipantsList';
import {
    onAddParticipant,
    onRemoveParticipant,
    getLinkedParticipantsByPatients
} from '../../../redux/asyncMessages/actions';
import { Button } from '../../../components';
import { USERTYPES } from '../../../constants/constants';



class ParticipantContent extends Component {

    constructor() {
        super();

        this.state = {
            addParticipantView: false,
            selectedProfile: '',
            selectedParticipants: [],
            selectedParticipantsList: [],
            searchText: '',
            isDirty: false,
            selectedRemovableParticipant: {},
            popupVisible: false
        };
    }

    componentDidMount() {
        this.props.onRef(this)
    };

    componentWillUnmount() {
        this.props.onRef(undefined)
    };

    onCheckParticipant = (participant, event) => {
        let selectedParticipant = {
            userId: participant.userId,
            firstName: participant.firstName,
            lastName: participant.lastName,
            participantType: participant.participantType
        };
        if (event.target.checked) {
            this.setState({
                selectedParticipants: [...this.state.selectedParticipants, event.target.value],
                selectedParticipantsList: [...this.state.selectedParticipantsList, selectedParticipant]
            });
        }
        else {
            let updatedParticipants = [...this.state.selectedParticipants];
            let updatedParticipantsList = [...this.state.selectedParticipantsList];
            let index = updatedParticipants.indexOf(event.target.value);
            updatedParticipants.splice(index, 1);
            index = updatedParticipants.indexOf(
                updatedParticipants.filter(el => el.userId === selectedParticipant.userId)[0]
            );
            updatedParticipantsList.splice(index, 1);
            this.setState({ selectedParticipants: updatedParticipants, selectedParticipantsList: updatedParticipantsList });
        }
    };


    toggleAddParticipantsView = () => {
        if (this.state.addParticipantView && this.state.selectedParticipantsList.length > 0) {
            this.props.isDirty(true, false);
        } else if (this.state.addParticipantView && this.state.selectedParticipantsList.length === 0) {
            this.props.setDisplayGreyedOut();
            this.setState({ addParticipantView: !this.state.addParticipantView });
        }
        else {
            this.props.setDisplayGreyedOut();
            this.setState({ addParticipantView: !this.state.addParticipantView });
        }
    };

    gotoParticipantView() {
        this.setState({
            selectedParticipants: [],
            selectedParticipantsList: [],
            addParticipantView: !this.state.addParticipantView
        });
    };

    closeProfileOptions = () => {
        this.setState({ selectedProfile: '' });
    };

    openProfileOptions = (e) => {
        if (!this.state.popupVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible,
        }));
        if (this.state.selectedProfile === '') {
            this.setState({
                selectedProfile: e.target.id
            })
        } else {
            this.closeProfileOptions();
        }
    };

    handleOutsideClick = (e) => {
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this.openProfileOptions(e);
    };

    onSearchTextChange = (e) => {
        this.setState({ searchText: e.target.value });
        
            let data = {
                patientId: this.props.loggedInUser.serviceProviderId,
                conversationId: this.props.conversationId,
                searchText: e.target.value
            }
            this.props.getLinkedParticipantsByPatients(data);
    };

    getNewParticipantList = () => {
        return (
            <ParticipantsList
                selectedParticipants={this.state.selectedParticipantsList}
                conversationId={this.props.conversationId}
                onCheckParticipant={this.onCheckParticipant}
                onSearchTextChange={this.onSearchTextChange}
                searchText={this.state.searchText}
                context={this.props.context} />
        )
    };

    onAddParticipants = () => {
        let userId = this.props.loggedInUser.serviceProviderId;
        let data = {
            title: this.props.title,
            conversationId: this.props.conversationId,
            participants: this.state.selectedParticipants.toString(),
            createdBy: userId,
            participantList: this.state.selectedParticipantsList,
            participantType: USERTYPES.SERVICE_PROVIDER
        };
        this.props.addParticipants(data);
        this.props.setDisplayGreyedOut();
        this.gotoParticipantView();
    };

    onClickRemoveParticipant = (participant, event) => {
        this.setState({ selectedRemovableParticipant: participant });
        this.props.onCilckRemoveParticipant(participant);
    };

    onConfirmRemoveParticipant = () => {
        this.setState({ selectedRemovableParticipant: {} });
        let userId = this.props.loggedInUser.serviceProviderId;
        let participanList = [{
            userId: this.state.selectedRemovableParticipant.userId,
            firstName: this.state.selectedRemovableParticipant.firstName,
            lastName: this.state.selectedRemovableParticipant.lastName
        }];
        let data = {
            conversationId: parseInt(this.props.conversationId),
            participants: this.state.selectedRemovableParticipant.userId,
            modifiedBy: userId,
            modifiedByType: USERTYPES.SERVICE_PROVIDER,
            participantList: participanList,
            participantType: this.state.selectedRemovableParticipant.participantType
        };
        this.props.removeParticipant(data);
        this.closeProfileOptions();
    };

    render() {
        let participants = '';
        let participantsHeader = '';
        let leaveBtn = "";
        let existingParticipants = "";
        let profileOptionClass = "";
        let loggedInUser = "";
        let userId = this.props.loggedInUser.serviceProviderId;
        if (this.props.existingParticipants && this.props.existingParticipants.length > 0) {
            existingParticipants = this.props.existingParticipants.map((participant, index) => {
                if (userId !== participant.userId) {
                    participant.userId.toString() === this.state.selectedProfile ? profileOptionClass = "Open" : profileOptionClass = "";
                    return (
                        <li key={index} className="list-group-item participants">
                            <table className={"table profileFront " + (!this.props.isActive ? 'left' : '')}>
                                <tbody>
                                    <tr>
                                        <td className="ParticipantAvatar align-middle">
                                            <div className="avatarContainer">
                                                <img key={index} alt="i" src={ participant.thumbNail ? participant.thumbNail : require("../../../assets/images/Blank_Profile_icon.png")}
                                                    className="avatarImage" />
                                                <div className={"memberType memT-" + participant.participantType}>{participant.participantType}</div>
                                            </div>
                                        </td>
                                        <td className="participantName align-middle">
                                            {participant.firstName + " " + participant.lastName}
                                        </td>
                                        <td className="participantDetailRight text-right align-middle">
                                            <button disabled={!this.props.isActive} id={participant.userId} className={"ParticipantOption"}
                                                onClick={this.openProfileOptions} />
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            {this.state.popupVisible && (<ul ref={node => { this.node = node; }} className={"table profileBack " + profileOptionClass}>
                                <li className="ProfileOptionItems align-middle">
                                    <a>View Profile</a>
                                </li>
                            </ul>)}
                        </li>
                    )
                }

            });
            loggedInUser = this.props.existingParticipants.map((participant, index) => {
                if (userId === participant.userId) {
                    return (
                        <li className="list-group-item d-flex participants myChat">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td className="ParticipantAvatar align-middle">
                                            <div className="avatarContainer">
                                                <img alt="i"
                                                    src={participant.thumbNail ? participant.thumbNail : require("../../../assets/images/Blank_Profile_icon.png")}
                                                    className="avatarImage" />
                                            </div>
                                        </td>
                                        <td className="participantName align-middle">
                                            Me
                                            </td>
                                        <td className="participantDetailRight align-middle">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    )
                }
            });
        };

        if (!this.state.addParticipantView) {
            participantsHeader =
                <td className="participantsTitle align-middle">
                    <div className="Content d-flex">
                        <span className="mr-auto primaryColor sideParticipantsTitle">Participants</span>
                        <span className="ml-auto d-flex">
                            { this.props.loggedInUser.serviceProviderTypeId === USERTYPES.DESIGNATED_SERVICE_PROVIDER && <button className="addParticipantsButton" onClick={this.toggleAddParticipantsView} />}
                            <button className="ParticipantClose" onClick={this.props.toggleParticipantList} />
                        </span>

                    </div>
                </td>;

            participants = <td className="participantsList" ref={this.setWrapperRef}>
                <div className="Content">
                    <ul className="list-group">
                        {existingParticipants}
                        {loggedInUser}
                    </ul>
                </div>
            </td>
            if (this.props.isActive) {
                leaveBtn = <td colSpan="3"
                    className="align-middle text-center leaveConversation">
                    <button className="btn btn-outline-primary" disabled={!this.props.isActive} onClick={this.props.displayWarningPopup}>Leave Conversation</button>
                </td>
            }
        } else {
            participantsHeader =
                <td className="participantsTitle align-middle">
                    <div className="Content d-flex">
                        <span className="mr-auto primaryColor sideParticipantsTitle">Add Participants</span>
                        <span className="ml-auto">
                            <i className="ParticipantOptionOpen" onClick={this.toggleAddParticipantsView} /></span>
                    </div>
                </td>;

            participants = <td className="participantsList">
                <div className="Content">
                    <form className="participantsSearchForm">
                            {this.getNewParticipantList()}
                    </form>
                </div>
            </td>;
            leaveBtn = <td colSpan="3" className="align-middle text-right AddParticipantsBtn">
                <Button
                    type="button"
                    classname="btn btn-primary"
                    label="Done"
                    disable={this.state.selectedParticipants.length === 0}
                    onClick={this.onAddParticipants} />
            </td>
        };

        return (
            <table className="table">
                <tbody>
                    <tr>
                        {participantsHeader}
                    </tr>
                    <tr>
                        {participants}
                    </tr>
                    <tr>
                        {leaveBtn}
                    </tr>
                </tbody>
            </table>
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        addParticipants: (data) => dispatch(onAddParticipant(data)),
        removeParticipant: (data) => dispatch(onRemoveParticipant(data)),
        getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data))
    }
};

function mapStateToProps(state) {
    return {
        loggedInUser: state.authState.userState.userData.userInfo,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantContent);