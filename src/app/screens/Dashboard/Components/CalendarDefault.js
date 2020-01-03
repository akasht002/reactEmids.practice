import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const CalendarDefault = () => {
  return (
    <Fragment>  
        <div className='NoRequestServiceProvider '>  
        <div className='myPlanBlank theme-primary'><img src={require('../../../assets/images/my_plan_blank.png')} alt="my-plan-empty" /></div>
        <span className="clickView theme-primary">Click below to get started.</span>
            <div className="no-blockinfo-top">    
          <Link className='NoServiceReq NewSPReq theme-primary-light' to='/Visitservicelist'>
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
