import React from "react";
import { CoreoCheckBox } from "../../../../../components";

const ServiceTypeList = (props) => {

    let ServiceTempalte = props.serviceType && props.serviceType.map((item, index) => {
        let catNum = index + 1;
        return (
            <div className="CheckSet theme-primary-light" key={catNum}>
                <CoreoCheckBox
                    className="ServiceCheckbox"
                    name={"CTServiceRequest"}
                    id={"CTServiceRequest" + catNum}
                    checked={item.isChecked}
                    value={props.serviceType}
                    onChange = {(e) => {props.handleServiceType (item,e)}} />
                <label htmlFor={"CTServiceRequest" + catNum}>{item.serviceTypeDescription}</label>
            </div>
        )
    });

    return (
        <div className="form-group">
            {ServiceTempalte}
        </div>
    )
}

export default ServiceTypeList;