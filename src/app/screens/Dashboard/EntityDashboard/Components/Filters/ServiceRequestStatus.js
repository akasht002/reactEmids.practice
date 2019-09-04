import React from "react";

const ServiceRequestStatus = props => {
    let statusTempalte = props.serviceRequestStatusList && props.serviceRequestStatusList.map((item, index) => {

        return (
            <fieldset>
                <div className="CheckboxSet" key={item.id}>
                    <input
                        className="ServiceCheckbox"
                        name={"ServiceStatus"}
                        id={item.id}
                        checked={item.isActive}
                        type="checkbox"
                        value={item.keyValue}
                        onChange={(e) => {
                            item.isActive = e.target.checked;
                            props.handleServiceRequestStatus(item, e)
                        }}
                    />
                    <label htmlFor={item.id}>{item.keyValue}</label>
                </div>
            </fieldset>
        )
    });

    return (
        <div className="form-group">
            {statusTempalte}
        </div>
    )
}

export default ServiceRequestStatus;
