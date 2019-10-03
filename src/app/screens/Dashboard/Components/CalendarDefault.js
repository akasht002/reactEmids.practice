import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const CalendarDefault = () => {
  return (
    <Fragment>  
        <div className='NoRequestServiceProvider '>  
        <div className='myPlanBlank'></div>
        <span className="clickView theme-primary">Click below to get started.</span>
            <div className="no-blockinfo-top">    
          <Link className='NoServiceReq NewSPReq' to='/Visitservicelist'>
            <span className='NoInfoText'>
              <span className="NoServiceInfoLink theme-primary">
                View Request
              </span>
            </span>
          </Link>         
            </div>
        </div>
    </Fragment>
  )
}
