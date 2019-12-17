import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { PointOfService } from '../../../../components';
import { formatPhoneNumber } from '../../../../utils/formatName'

const EmergencyAttorenyDetails = ({
    header,
    details
}) => {
    const { firstName, lastName, phoneNumber, relationship, address } = details
    return (
        <Fragment>
            <div className="col-md-6 border-design">
                <div className='SPCardTitle d-flex vital-block-title'>
                    <h4 className='theme-primary'>{header} Contact</h4>
                </div>
                {details !== "" ? <div className='ConnectionsWidget CoreoWidget vital-block'>
                    <p className='CoreoAssociationHeader mb-1'>Name</p>
                    <p>{`${firstName} ${lastName}`}</p>
                    <p className='CoreoAssociationHeader mb-1 theme-primary'>Phone Number</p>
                    <p>{formatPhoneNumber(phoneNumber)}</p>
                    <p className='CoreoAssociationHeader mb-1'>Relationship to Individual</p>
                    <p>{relationship}</p>
                    <div className='SummaryContent POS mb-4 emergency-address-block'>
                        <ul className="SPCertificateList theme-primary">
                            <li className="SPAddressItems">
                                {address && <PointOfService pointofservice={address} />}
                            </li>
                        </ul>
                    </div>
                </div>
                    :
                    <span>No Data Available</span>}
            </div>
        </Fragment>
    );
};

EmergencyAttorenyDetails.prototypes = {
    details: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired
};

export default EmergencyAttorenyDetails;
