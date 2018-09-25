import React from 'react'
import { Button } from '../../../components'

export const ServiceStatus = props => {
  if (props.status.id === 36) {
    return (
      <React.Fragment>
        <Button
          classname='btn btn-outline-primary mx-2 float-right'
          label='Not Interested'
          onClick={() => {
            props.postServiceRequest({isInterested:false,isCancel:false})
          }}
        />
        <Button
          classname='btn outline btn-primary'
          label='Apply'
          onClick={() => {
            props.postServiceRequest({isInterested:true,isCancel:false})
          }}
        />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Button
          classname='btn btn-outline-primary mx-2 float-right'
          label='Cancel Service'
          onClick={() => {
            console.log('Cancel')
            props.postServiceRequest({isInterested:false,isCancel:true})
          }}
        />
      </React.Fragment>
    )
  }
}
