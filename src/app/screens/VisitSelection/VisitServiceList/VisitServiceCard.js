import React from 'react'
import Moment from 'react-moment';
import { getFirstCharOfString } from '../../../utils/stringHelper'
import {
    VISIT_SERVICE_STATUS_NOT_HIRED
} from '../../../constants/constants'

export const VisitServiceCard = props => {
  return (
    <div
      className='card'
      onClick={() => props.handleClick(props.serviceList.serviceRequestId)}
    >
      <div className='BlockImageContainer'>
        <img
          src={require('../../../assets/images/Bathing_Purple.svg')}
          className='ServiceImage'
          alt='categoryImage'
        />
        <div className='BlockImageDetails'>
          <div className='BlockImageDetailsName'>
            <span>{props.serviceList.type}</span>
          </div>
          <div className='BlockImageDetailsActivity'>
            {props.serviceList.serviceCategoryDescription}
          </div>
          <div className='BlockImageDetailsDate'>
            {props.serviceList.recurring}
            {' '}
            <span className='DetailsDateSeperator'>|</span>
            {' '}
            <Moment format='MMM DD'>{props.serviceList.startDate}</Moment>
            {' '}
            -
            {' '}
            <Moment format='MMM DD'>{props.serviceList.endDate}</Moment>
          </div>
        </div>
      </div>
      <div className='BlockProfileContainer'>
        <img
          className='ProfileImage'
          src={props.serviceList.patientThumbNail}
          alt=''
        />
        <div className='BlockProfileDetails'>
          <div className='BlockProfileDetailsName'>
            {props.serviceList.patientFirstName}
            {' '}
            {props.serviceList.patientLastName &&
              getFirstCharOfString(props.serviceList.patientLastName)}
          </div>
          <div className='BlockProfileDetailsActivity'>
            Posted on <Moment format='DD MMM'>{props.serviceList.requestDate}</Moment>
          </div>
        </div>
        <div class='BlockProfileDetailsStatus'>
          {
            <span
              className={`${props.renderStatusClassName(props.serviceList.serviceRequestStatus)}`}
            >
              {props.serviceList.serviceRequestStatus ===
                VISIT_SERVICE_STATUS_NOT_HIRED
                ? props.serviceList.matchPercentage
                : props.serviceList.serviceRequestStatus}
            </span>
          }
        </div>
      </div>
    </div>
  )
}
