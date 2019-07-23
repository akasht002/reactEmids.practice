import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const CalendarDefault = () => {
  return (
    <Fragment>      
      <li>
        <div className='NoRequestServiceProvider'>  
        <span className="clickView">Click below to get started.</span>
            <div className="no-blockinfo-top">    
          <Link className='NoServiceReq NewSPReq' to='/serviceRequest'>
            <span><img alt="NI" src={require('../../../assets/images/NoServiceRequest.svg')} /></span>
            <span className='NoInfoText'>
              <span className="NoServiceInfoLink primaryColor">
                New Service Request
              </span>
            </span>
          </Link>
          <Link className='NoServiceReq NewSPReq' to='/spSearch'>
            <span><img alt="NI" src={require('../../../assets/images/BrowseServiceProviders.svg')} /></span>
            <span className='NoInfoText'>
              <span className="NoServiceInfoLink primaryColor">
                Browse Service Providers
              </span>
            </span>
          </Link>
            </div>
        </div>
      </li>
    </Fragment>
  )
}
