import React from "react";

function ServiceTypeList(props){
 
    let ServiceTempalte = props.ServiceType.map((item, index) =>{
        let catNum = index + 1;
        return(
             <div className="CheckSet" key={catNum}>
                <input 
                    className="ServiceCheckbox" 
                    name={"ServiceList"} 
                    id={"ServiceList"+catNum} 
                    type="checkbox"
                   value={props.serviceType}
                    onChange={(e)=>{
                        props.handleserviceType(item)}
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