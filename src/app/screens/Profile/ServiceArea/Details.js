import React from 'react'

export const Details = (props) => {
    return (
        props.ServiceAreaList && props.ServiceAreaList.map((serviceArea, i) => {
            return (
              <li className='SPAddressItems' key={serviceArea.addressId}>
                <div className={'SPCertificateContent'}>
                  <div className={'width100 d-flex'}>
                    <span className={'AddressContentLabel'}>Street</span>
                    <span className={'SPCertificateDesc'}>
                      {serviceArea.streetAddress}
                    </span>
                  </div>
                  <div className={'width100 d-flex'}>
                    <span className={'AddressContentLabel'}>City</span>
                    <span className={'SPCertificateDesc'}>{serviceArea.city}</span>
                  </div>
                  <div className={'width100 d-flex'}>
                    <span className={'AddressContentLabel'}>State</span>
                    <span className={'SPCertificateDesc'}>
                      {serviceArea.stateName}
                    </span>
                  </div>
                  <div className={'width100 d-flex'}>
                    <span className={'AddressContentLabel'}>ZIP</span>
                    <span className={'SPCertificateDesc'}>{serviceArea.zipCode}</span>
                  </div>
                </div>
    
                <i
                  className='SPIconMedium SPIconDelete mr-3'
                  id={serviceArea.addressId}
                  onClick={e => props.showModalOnDelete(e)}
                />
                <i
                  className='SPIconMedium SPIconEdit'
                  id={serviceArea.addressId}
                  onClick={e => props.editServiceArea(e)}
                />
              </li>
            )
          })
    )
}