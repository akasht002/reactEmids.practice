import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getUserInfo } from "../../../services/http";

export const CalendarDefault = () => {
  return (
    <Fragment>  
        <div className='NoRequestServiceProvider '>  
        <div className='myPlanBlank theme-primary'><img src={require('../../../assets/images/my_plan_blank.png')} alt="my-plan-empty" /></div>
        
        {!getUserInfo().isEntityServiceProvider &&
        <span className="clickView theme-primary">Click below to get started.</span>
        }
        {getUserInfo().isEntityServiceProvider &&
            <p>
            <span className="text-center d-block  theme-primary pt-2">No Results</span>
            <span className="text-center d-block p-3 default-444">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem </span>
            </p>
          }
            <div className="no-blockinfo-top">    
          {!getUserInfo().isEntityServiceProvider &&  <Link className='NoServiceReq NewSPReq theme-primary-light' to='/Visitservicelist'>
            <span className='NoInfoText'>
              <span className="NoServiceInfoLink theme-primary">
                View Request
              </span>
            </span>
          </Link>}         
            </div>

        </div>
    </Fragment>
  )
}

