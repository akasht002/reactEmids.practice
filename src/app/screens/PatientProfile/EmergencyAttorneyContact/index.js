import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import EmergencyAttorneyDetails from "./Components/EmergencyAttorneyDetails";
import { getEmergencyContactDetails, getAttorneyContactDetails } from "../../../redux/patientProfile/actions";

const EmergencyAttorneyContact = (
    {
        getEmergencyContactDetails,
        getAttorneyContactDetails,
        emergencyContactDetails,
        attorneyContactDetails,
    }) => {

    useEffect(() => {
        getEmergencyContactDetails();
        getAttorneyContactDetails();
    }, [
            getEmergencyContactDetails,
            getAttorneyContactDetails
        ]
    );

    return (
        <Fragment>
            <div className='col-md-12 card CardWidget SPLanguages'>
                <div className="row">
                    <EmergencyAttorneyDetails
                        details={emergencyContactDetails}
                        header={'Emergency'}
                    />
                    <EmergencyAttorneyDetails
                        details={attorneyContactDetails}
                        header={'Attorney'}
                    />
                </div>
            </div>
        </Fragment>
    )
}

EmergencyAttorneyContact.propTypes = {
    getEmergencyContactDetails: PropTypes.func.isRequired,
    getAttorneyContactDetails: PropTypes.func.isRequired,
    emergencyContactDetails: PropTypes.object.isRequired,
    attorneyContactDetails: PropTypes.object.isRequired
}

export function mapDispatchToProps(dispatch) {
    return {
        getEmergencyContactDetails: () => dispatch(getEmergencyContactDetails()),
        getAttorneyContactDetails: () => dispatch(getAttorneyContactDetails()),
    }
};

export function mapStateToProps(state) {
    return {
        emergencyContactDetails: state.patientProfileState.emergencyContactDetails,
        attorneyContactDetails: state.patientProfileState.attorneyContactDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmergencyAttorneyContact));
