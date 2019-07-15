import React from 'react'

export const ServiceRequestDefault = () => {
    return (
      <div className='NoInformationServiceProvider'>
        <span>
          <img
            alt={'N'}
            src={require('../../../assets/images/NoServiceRequest.svg')}
          />
        </span>
        <span className='NoSRText'>
          Browse Service Request
        </span>
      </div>
    )
  }