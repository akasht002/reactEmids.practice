import React, { Fragment } from 'react'
import Moment from 'react-moment'
import _ from 'lodash'
import { getFieldsNoSeperater } from '../../../utils/validations'
import { calenderDetails } from './CalendarDetails'

export const ShowIndicator = props => {
  switch(props.count){
    case 1:
      return generateIndicator(props.count)
    case 2:
      return generateIndicator(props.count)
    case 3:
      return generateIndicator(props.count)
    default:
    return ''
  } 
}

export const generateIndicator = (count) =>{
  return (<React.Fragment>
    {_.times(count, i =>
      <i key={i} className='indicator' />
    )}
  </React.Fragment>)
}

export const splitSlots = (togglePersonalDetails, data, type, handleClick, props) => {
  let newData = _.reduce(
    data,
    function (arr, el) {
      if (el.visitDate === type) {
        arr.push(el)
      }
      return arr
    },
    []
  )

  return serviceCalendar(togglePersonalDetails, newData, handleClick, props)
}

export const serviceCalendar = (
  togglePersonalDetails,
  newData,
  handleClick,
  props
) => {
  if (newData.length > 0) {
    return newData.map((conversations, index) => {
       return (
        <Fragment>
          { calenderDetails(props,conversations,index) }
        </Fragment>
      )
    })
  } else {
    return (
      <Fragment>
        <li className='list-group-item ProfileServicesVisitContent'>
          <div className='NoProfileServices'>
            <i className='NoInformationIcon' /><span>No Visits</span>
          </div>
        </li>
      </Fragment>
    )
  }
}

export const ServiceCalendarList = props => {
    let  dateVal = [...new Set(getFieldsNoSeperater(props.Servicelist,'visitDate'))]
    return (
      <React.Fragment>
        {
          dateVal.map( data => {
            return (
              <React.Fragment>
                  <h6 className='VisitScheduleTitle theme-primary'> 
                  <Moment format="MMM DD, dddd">
                            {data}
                  </Moment>
                  </h6>
                  <ul className='list-group ProfileServicesVisitList'>
                    {
                      splitSlots(
                        props.togglePersonalDetails,
                        props.Servicelist,
                        data,
                        props.handleClick,
                        props
                      )
                    }
                  </ul>  
              </React.Fragment>
            )
          })
        }
      </React.Fragment>
    )
  }


  export const ServiceVisitsDefault = (props) => {
    var noVisits = [];
     for (var i = 0; i < props.count; i++) {
       noVisits.push(
         <li className='list-group-item ProfileServicesVisitContent'>
         <div className='NoProfileServices'>
           <i className='NoInformationIcon' /><span>No Visits</span>
         </div>
       </li>
       );
     }
     return (
       <Fragment>
         {noVisits}
       </Fragment>
     )
   }