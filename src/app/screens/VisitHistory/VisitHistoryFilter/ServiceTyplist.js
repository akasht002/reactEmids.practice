import React from "react";

function ServiceTypeList(props){
 
    let ServiceTempalte = props.serviceType && props.serviceType.map((item, index) =>{
        let catNum = index + 1;
        return(
             <div className="CheckSet" key={catNum}>
                <input 
                    className="ServiceCheckbox" 
                    name={"ServiceList"} 
                    id={"ServiceList"+catNum} 
                    type="checkbox"
                    checked={item.isChecked}
                   value={item.name}
                    onChange={(e)=>{
                        item.isChecked = e.target.checked;
                        props.handleserviceType(item,e)}
                    }
                />
                <label htmlFor={"ServiceList"+catNum}>{item.serviceTypeDescription}</label>
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