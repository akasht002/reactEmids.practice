import React from "react";
import { CoreoCheckBox } from "../../../../../components";
import { VISIT_PROCESSING_STATUS, VISIT_STATUS } from "../../../../../constants/constants";

const ServiceRequestStatus = props => {
    let statusTempalte = props.serviceRequestStatusList && props.serviceRequestStatusList.map((item, index) => {
    let statusName = ((item.id === VISIT_PROCESSING_STATUS.inProgress.id) || (item.id === VISIT_PROCESSING_STATUS.inProgress.visitId)) ? VISIT_STATUS.inProgress.keyValue : item.keyValue
        const onChange = (item, e) => {
            item.isActive = e.target.checked;
            props.handleServiceRequestStatus(item, e)
        }

        return (
            <fieldset>
                <div className="CheckboxSet" key={item.id}>
                    <CoreoCheckBox
                        className="ServiceCheckbox"
                        name={"ServiceStatus"}
                        id={item.id}
                        checked={item.isActive}
                        value={item.keyValue}
                        onChange={(e) => onChange(item, e)}
                    />
                    <label htmlFor={item.id}>{statusName}</label>
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
