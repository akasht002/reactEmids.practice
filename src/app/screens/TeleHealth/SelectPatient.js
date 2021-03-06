import React, { Component } from 'react';
import {UserAvatarMultiSelect} from "../../components";

export  class SelectPatient extends Component {
    state = {
        Patients: []
    };

    componentDidMount() {
        if (this.props.patients && this.props.patients.length > 0) {
            let patients = [];
            this.props.patients.map(patient => {
                let data = {
                    value: patient.userId,
                    label: patient.firstName + ' ' + patient.lastName,
                    src: patient.thumbNail,
                    participantType: patient.participantType
                };
                patients.push(data);
                return '';
            });
            this.setState({ Patients: patients });
        }
    };


    render() {

        return (
            <div className="form-group">
                <label className='theme-primary'>Select Individual</label>
                <UserAvatarMultiSelect
                    listItems={this.state.Patients}
                    multi={false}
                    closeOnSelect={true}
                    placeholder=''
                    className="ProfileImageMultiSelect mt-2"
                    onSelect={this.props.onSelect} />
                <span className="ParticipantSelectMsg">Only those related to selected individual will be potential participants.</span>
            </div>
        );
    };
};

export default SelectPatient