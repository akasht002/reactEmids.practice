import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '../Components/checkbox';
import { Input } from '../../../components';
import { getLinkedParticipantsList } from '../../../redux/asyncMessages/actions';
import { USERTYPES, NO_PARTICIPANTS_FOUND, NO_RESULT_FOUND, CONVERSATION_SUMMARY } from '../../../constants/constants';

export class ParticipantsList extends Component {

    componentDidMount() {
        let userId = this.props.loggedInUser.serviceProviderId;
        if (this.props.conversationId > 0) {
            let data = {
                patientId: this.props.context,
                conversationId: this.props.conversationId,
                searchText: this.props.searchText,
                participantType: USERTYPES.SERVICE_PROVIDER,
                userId: userId
            };
            this.props.getLinkedParticipantsList(data);
        };
    };

    participants = () => {
        if (this.props.participantList.length > 0) {
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
    };

    render() {
        return (
            <div className="ParticipantsListContainer">
                <Input
                    id='participantsSearch'
                    autoComplete='false'
                    type='text'
                    placeholder='Search'
                    className='form-control searchParticipants ChatContainer'
                    textChange={this.props.onSearchTextChange}
                    iconStyle='icon-search'
                />
                <div className="participantsSearchList pd-left-10new ChatContainer">
                    {this.props.participantList.length > 0 ? this.participants() :
                        (this.props.searchText === '' ? this.props.openedAsyncPage !== CONVERSATION_SUMMARY &&
                         NO_PARTICIPANTS_FOUND : NO_RESULT_FOUND)}
                </div>
            </div>
        )
    };
};


export function mapDispatchToProps(dispatch) {
    return {
        getLinkedParticipantsList: (data) => dispatch(getLinkedParticipantsList(data))
    }
};


export function mapStateToProps(state) {
    return {
        participantList: state.asyncMessageState.linkedParticipants,
        loggedInUser: state.authState.userState.userData.userInfo,
        openedAsyncPage: state.asyncMessageState.openedAsyncPage
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);