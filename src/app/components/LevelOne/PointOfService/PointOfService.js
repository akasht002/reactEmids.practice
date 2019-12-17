import React, {Fragment} from 'react';

const PointOfService = (props) => {
    return (
        <Fragment>
            {props.pointofservice.addressTypeId &&
                <p>
                    <span className="addresstype">Address Type</span>
                    {props.pointofservice.addressTypeId}
                </p>
            }
            <p>
                <span>Street</span>
                {props.pointofservice.streetAddress}
            </p>

            <p>
                <span>City</span>
                {props.pointofservice.city}
            </p>

            <p>
                <span>State</span>
                {props.pointofservice.stateName}
            </p>

            <p>
                <span>Zip</span>
                {props.pointofservice.zipCode}
            </p>
        </Fragment>
    );
};


export default PointOfService;