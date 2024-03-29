import React from 'react'
import { Button } from '../../../components'
import {NOT_INTERESTED,CANCELLED_NOT_HIRED_ARR, OPEN, INVITED} from '../../../constants/constants'
import _ from 'lodash'

export const isStatusInArray = data => {
  let statusArray = [38, 40, 37]
  if (_.indexOf(statusArray, data) !== -1) return true
  return false
}

export const isDisableInArray = data => {
  let statusArray = CANCELLED_NOT_HIRED_ARR
  if (_.indexOf(statusArray, data) !== -1) return true
  return false
}

export const StatusLabel = {
  37: 'Cancel Application',
  38: 'Cancel Request',
  40: 'Cancel Request'
}

export const ServiceStatus = props => {
  if (!isDisableInArray(props.status.id)) {
    if (!isStatusInArray(props.status.id)) {
      return (
        <React.Fragment test-serviceStatus="test-serviceStatus">
          {(props.status.id !== NOT_INTERESTED) && (
            <Button
              classname='btn btn-outline-primary mx-2 float-right'
              label='Not Interested'
              onClick={() => {
                props.postServiceRequest({
                  isInterested: false,
                  isCancel: false,
                  status:props.status.id
                })
              }}
            />
          )}
          {(props.status.id === NOT_INTERESTED || props.status.id === OPEN || props.status.id === INVITED) && (
          <Button
            classname='btn outline btn-primary'
            label='Engage'
            onClick={() => {
              props.postServiceRequest({ isInterested: true, isCancel: false,status:props.status.id })
            }}
          />)}
        </React.Fragment>
      )
    } else {
      // to do demo fix
      return (
        <React.Fragment test-else="test-else">
          <Button
            classname='btn btn-outline-primary mx-2 float-right'
            label={StatusLabel[props.status.id]}
            onClick={() => {
              props.postServiceRequest({ isInterested: false, isCancel: true,status:props.status.id })
            }}
            disable={props.status.visitInProgress}
          />
        </React.Fragment>
      )
    }
  } else {
    return <div/>
  }
}
