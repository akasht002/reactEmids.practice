import React from "react";

const ServiceTypeList = (props) => {

    let ServiceTempalte = props.serviceType && props.serviceType.map((item, index) => {
        let catNum = index + 1;
        return (
            <div className="CheckSet" key={catNum}>
                <input
                    className="ServiceCheckbox"
                    name={"CTServiceRequest"}
                    id={"CTServiceRequest" + catNum}
                    type="checkbox"
                    checked={props.checked}
                    value={props.serviceType}
                    onChange = {(e) => {props.handleserviceType(item,e)}} />
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