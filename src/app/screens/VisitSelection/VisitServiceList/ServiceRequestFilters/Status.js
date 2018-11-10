import React from "react";
import {SERVICE_STATUS} from "../../../../constants/constants"
function ServiceRequestsStatus(props){
    let statusTempalte = props.ServiceStatus.map((item, index) =>{
    
        if(item.keyValue !== SERVICE_STATUS.CLOSED && item.keyValue !== SERVICE_STATUS.CANCELLED 
        && item.keyValue !== SERVICE_STATUS.INPROGRESS && item.keyValue !== SERVICE_STATUS.COMPLETED
        && item.keyValue !== SERVICE_STATUS["NOT INTERESTED"] ){
            let catNum = index + 1;
            return(
                <fieldset>
                    <div className="CheckboxSet" key={catNum}>
                        <input 
                            className="ServiceCheckbox" 
                            name={"ServiceStatus"} 
                            id={"ServiceStatus"+catNum} 
                            checked={item.isChecked}
                            type="checkbox"
                            value={props.serviceStatus}
                            onChange={(e)=>{
                                

                                if (item.keyValue === 'All') {
                                    props.handleAllServiceStatus(item, e)
                                }
                                else {
                                    item.isChecked = e.target.checked;
                                    props.handleChangeserviceStatus(item,e)
                                }
                            }

                            
                            }
                        />
                        <label htmlFor={"ServiceStatus"+catNum}>{item.keyValue}</label>
                    </div>
                </fieldset>        
            )
        }
    });

   return (
       <div className="form-group">
            {statusTempalte}
        </div>
    )
}

export default ServiceRequestsStatus;
