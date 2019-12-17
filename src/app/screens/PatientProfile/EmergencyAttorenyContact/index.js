import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import EmergencyAttorenyDetails from "./Components/EmergencyAttorenyDetails";
import { getEmergencyContactDetails, getAttorneyContactDetails } from "../../../redux/patientProfile/actions";

const EmergencyAttorenyContact = (
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
                    <EmergencyAttorenyDetails
                        details={emergencyContactDetails}
                        header={'Emergency'}
                    />
                    <EmergencyAttorenyDetails
                        details={attorneyContactDetails}
                        header={'Attorney'}
                    />
                </div>
            </div>
        </Fragment>
    )
}

EmergencyAttorenyContact.propTypes = {
    getEmergencyContactDetails: PropTypes.func.isRequired,
    getAttorneyContactDetails: PropTypes.func.isRequired,
    emergencyContactDetails: PropTypes.object.isRequired,
    attorneyContactDetails: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        getEmergencyContactDetails: () => dispatch(getEmergencyContactDetails()),
        getAttorneyContactDetails: () => dispatch(getAttorneyContactDetails()),
    }
};

function mapStateToProps(state) {
    return {
        emergencyContactDetails: state.patientProfileState.emergencyContactDetails,
        attorneyContactDetails: state.patientProfileState.attorneyContactDetails,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmergencyAttorenyContact));
