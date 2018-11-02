import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Checkbox from '../Components/checkbox';
import { Input } from '../../../components';
import { getLinkedParticipantsList } from '../../../redux/asyncMessages/actions';
import { USERTYPES } from '../../../constants/constants';

class ParticipantsList extends Component {

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
                    this.props.selectedParticipants.map((selectedParticipant, index) => {
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
            <div className="ParticipantsListContainer">
                <Input
                    id='participantsSearch'
                    autoComplete='false'
                    type='text'
                    placeholder='search'
                    className='form-control searchParticipants ChatContainer'
                    textChange={this.props.onSearchTextChange}
                />
               <div className="participantsSearchList ChatContainer">
                    {this.participants()}
                </div>
            </div>
        )
    };
};


function mapDispatchToProps(dispatch) {
    return {
        getLinkedParticipantsList: (data) => dispatch(getLinkedParticipantsList(data))
    }
};


function mapStateToProps(state) {
    return {
        participantList: state.asyncMessageState.linkedParticipants,
        loggedInUser: state.authState.userState.userData.userInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);