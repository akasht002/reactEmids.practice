import React from "react";

function ServiceRequestsStatus(props){
    let statusTempalte = props.ServiceStatus.map((item, index) =>{
        let catNum = index + 1;
        return(
            <fieldset>
                <div className="CheckboxSet" key={catNum}>
                    <input 
                        className="ServiceCheckbox" 
                        name={"ServiceStatus"} 
                        id={"ServiceStatus"+catNum} 
                        type="checkbox"
                        value={props.serviceStatus}
                        onChange={(e)=>{
                            props.handleChangeserviceStatus(item)
                        }
                        }
                    />
                    <label htmlFor={"ServiceStatus"+catNum}>{item.keyValue}</label>
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

export default ServiceRequestsStatus;
