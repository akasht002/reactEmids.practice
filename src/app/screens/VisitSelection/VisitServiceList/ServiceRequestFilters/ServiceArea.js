import React from "react";
import _ from 'lodash'

function ServiceArea (props) {
    let serviceAreaList = props.ServiceAreaList && _.filter(props.ServiceAreaList, function(serviceArea) {
        return serviceArea.isActive ;
    });
    var PatientAddress = serviceAreaList && serviceAreaList.map((address,item)=>{
        let catNum = item + 1;
        return(
            <div className="form-radio AddressCardWidget mb-2">
            
                <input className="form-radio-input" 
                name="AddressPOS" id={'Address' + catNum}
                type="radio"
                value={props.serviceArea}
                checked={address.isChecked}
                onChange={(e)=>{
                    address.isChecked = e.target.checked;
                    props.handleServiceArea(address)}
                }
                />
                <label className="form-radio-label AddressPOS" htmlFor={'Address' + catNum}>
                    <span className='POSAddress'><i>Street</i>{address.streetAddress}</span>
                    <span className='POSAddress'><i>City</i>{address.city}</span>
                    <span className='POSAddress'><i>State</i>{address.state.name}</span>
                    <span className='POSAddress'><i>Zip</i>{address.zipCode}</span>
                    <span className="RadioBoxIcon"/>
                </label>
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