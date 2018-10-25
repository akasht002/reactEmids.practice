import React from 'react'
import { Button } from '../../../components'
import _ from 'lodash'

export const isStatusInArray = (data) => {
  let statusArray = [37,38];
  if(_.indexOf(statusArray,data) !==-1) return true
  return false
}

export const ServiceStatus = props => {
  if (!isStatusInArray(props.status.id)) {    
    return (
      <React.Fragment>
        <Button
          classname='btn btn-outline-primary mx-2 float-right'
          label='Not Interested'
          onClick={() => {
            props.postServiceRequest({ isInterested: false, isCancel: false })
          }}
        />
        <Button
          classname='btn outline btn-primary'
          label='Apply'
          onClick={() => {
            props.postServiceRequest({ isInterested: true, isCancel: false })
          }}
        />
      </React.Fragment>
    )
  } else {
    return ''
    /* Hide for demo */
    // return (
    //   <React.Fragment>
    //     <Button
    //       classname='btn btn-outline-primary mx-2 float-right'
    //       label='Cancel Service'
    //       onClick={() => {
    //         props.postServiceRequest({ isInterested: false, isCancel: true })
    //       }}
    //     />
    //   </React.Fragment>
    // )
  }
}
