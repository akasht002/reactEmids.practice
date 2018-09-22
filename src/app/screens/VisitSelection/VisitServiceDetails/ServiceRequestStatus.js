import React from 'react'
import { Button } from '../../../components'

export const ServiceStatus = props => {
  return (
    <React.Fragment>
      <Button
        classname='btn btn-outline-primary mx-2 float-right'
        label='Not Interested'
        onClick={() => {
          console.log('Not Interested')
          props.postServiceRequest('Not Interested')
        }}
      />
      <Button
        classname='btn outline btn-primary'
        label='Apply'
        onClick={() => {
          console.log('Apply')
          props.postServiceRequest('Apply')
        }}
      />
    </React.Fragment>
  )
}
