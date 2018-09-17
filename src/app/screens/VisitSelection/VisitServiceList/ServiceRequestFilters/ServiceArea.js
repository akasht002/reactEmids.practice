import React from "react";

function ServiceArea (props) {
    var PatientAddress = props.ServiceAreaList && props.ServiceAreaList.map((address,item)=>{
        return(
            <div className="form-radio AddressCardWidget mb-2">
            
                <input className="form-radio-input" 
                name="AddressPOS" id="AddressPOS2"
                type="radio"
                value={props.serviceArea}
                onChange={(e)=>props.handleServiceArea(address)}
                />
                <label className="form-radio-label AddressPOS" htmlFor="AddressPOS2">
                    <span className='POSAddress'><i>Street</i>{address.streetAddress}</span>
                    <span className='POSAddress'><i>City</i>{address.city}</span>
                    <span className='POSAddress'><i>State</i>{address.state.name}</span>
                    <span className='POSAddress'><i>Zip</i>{address.zipCode}</span>
                </label>
                <span className="RadioBoxIcon"/>
            </div>
        
        )
    });

   return(
       <div>
        {PatientAddress}
     </div>
    )
}


export default ServiceArea;