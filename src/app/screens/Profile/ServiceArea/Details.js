import React, { Fragment } from 'react'
import { validateCoordinates } from '../../../utils/validations'

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
              <span className={'AddressContentLabel'}>Zip</span>
              <span className={'SPCertificateDesc'}>{serviceArea.zipCode}</span>
            </div>
            <div className={'width100 d-flex'}>
              <span className={'AddressContentLabel'}>Range</span>
              <span className={'SPCertificateDesc'}>{serviceArea.coverageArea}</span>
            </div>
            {validateCoordinates(serviceArea.lat, serviceArea.lon) &&
                <div className="validationErrorMsg">Address details are not valid.</div>}
          </div>
          {
            props.isUser ? <Fragment>
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
            </Fragment> : ''
          }
        </li>
      )
    })
  )
}