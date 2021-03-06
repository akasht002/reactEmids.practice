import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { PointOfService } from '../../../../components';
import { formatPhoneNumber } from '../../../../utils/formatName'
import { caseInsensitiveComparer } from "../../../../utils/comparerUtility";

const EmergencyAttorneyDetails = ({
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
                    <p>{`${firstName || ''} ${lastName || ''}`}</p>
                    <p className='CoreoAssociationHeader mb-1 theme-primary'>Phone Number</p>
                    <p>{formatPhoneNumber(phoneNumber)}</p>
                    {!caseInsensitiveComparer(header, 'Emergency') &&
                        <Fragment>
                            <p className='CoreoAssociationHeader mb-1'>Relationship to Individual</p>
                            <p>{relationship}</p>
                        </Fragment>
                    }
                    <div className='SummaryContent POS mb-4 emergency-address-block'>
                        <ul className="SPCertificateList theme-primary">
                            <li className="SPAddressItems">
                                {address && <PointOfService pointofservice={address} />}
                            </li>
                        </ul>
                    </div>
                </div>
                    :
                    <div className='SPNoInfo mb-5'>
                        <div className='SPNoInfoContent'>
                            <div className='SPInfoContentImage' />
                            {<span className='SPNoInfoDesc'>No Data Available</span>}
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    );
};

EmergencyAttorneyDetails.prototypes = {
    details: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired
};

export default EmergencyAttorneyDetails;
