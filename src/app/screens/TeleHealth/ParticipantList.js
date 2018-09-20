import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Checkbox from './Components/checkbox';
import { Input } from '../../components';
import { GetAllParticipants } from '../../redux/telehealth/actions';
import {getUserInfo} from '../../services/http';
import './styles.css';

class ParticipantsList extends Component {

    componentDidMount() {
        let data = {
            searchText : '',
            contextId: this.props.context
        };
        this.props.getAllParticipants(data);
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
            <div>
                <Input
                    id='participantsSearch'
                    autoComplete='false'
                    type='text'
                    placeholder='search'
                    className='form-control searchParticipants'
                    textChange={this.props.onSearchTextChange}
                    iconStyle='icon-search'
                />
                <div className="participantsSearchList">
                    {this.participants()}
                </div>
            </div>
        )
    };
};


function mapDispatchToProps(dispatch) {
    return {
        getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
    }
};


function mapStateToProps(state) {
    return {
        participantList: state.telehealthState.linkedParticipants,
        loggedInUser: getUserInfo()
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParticipantsList));