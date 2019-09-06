import React from "react";
import { CoreoCheckBox } from "../../../../../components";

const ClinicalCondition = props => {

    const onChange = (item, e) => {
        item.isChecked = e.target.checked;
        props.handleClinicalConditions(item, e)
    }

    let ClinicalTemplate = props.clinicalConditionList && props.clinicalConditionList.map((item, index) => {
        let catNum = index + 1;
        return (
            <div className="CheckSet" key={catNum}>
                <CoreoCheckBox
                    className="ClinicalCheckBox"
                    name={"ClinicalList"}
                    id={"handleClinicalConditions" + catNum}
                    checked={item.isChecked}
                    value={props.skillType}
                    onChange={(e) => onChange(item, e)}
                />
                <label htmlFor={"handleClinicalConditions" + catNum}>{item.attributeName}</label>
            </div>
        )
    });

    return (
        <div className="form-group">
            {ClinicalTemplate}
        </div>
    )
}

export default ClinicalCondition;