import React from "react";

function ClinicalCondition(props){
    let ClinicalTemplate = props.clinicalConditionList && props.clinicalConditionList.map((item, index) =>{
        let catNum = index + 1;
        return(
             <div className="CheckSet" key={catNum}>
                <input 
                    className="ClinicalCheckBox" 
                    name={"ClinicalList"} 
                    id={"handleClinicalConditions"+catNum} 
                    type="checkbox"
                    checked={item.isChecked}
                   value={props.skillType}
                    onChange={(e)=>{
                        item.isChecked = e.target.checked;
                        props.handleClinicalConditions(item,e)}
                    }
                />
                <label htmlFor={"handleClinicalConditions"+catNum}>{item.attributeName}</label>
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