import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { getFields } from '../../../utils/validations'
import { SERVICE_REQUEST } from '../../../constants/constants';
import { Avatar } from '../../../components'
import { getFullName } from '../../../utils/stringHelper'

export const ServiceProviderRequestDetails = props => {
    return props.serviceRequest
      .slice(props.minVal, props.maxVal)
      .map((sp, index) => {
        let patientImage = '';
        if (sp.statusId === SERVICE_REQUEST.hiredId) {
          patientImage = sp && sp.image ? sp.image : require('../../../assets/images/Blank_Profile_icon.png');
        } else {
          patientImage = require('../../../assets/images/Blank_Profile_icon.png');
        }
        return (
          <Fragment>
            <li
              key={index}
              className='list-group-item ProfileServicesVisitContent'
            >
              <div className='ServicesTypeContainer'>
                <i className={`ServicesType DashboardSPIconServices${sp.serviceRequestTypeDetails && sp.serviceRequestTypeDetails.length > 0
                  && sp.serviceRequestTypeDetails[0].serviceTypeId}`} />
              </div>
              <div
                className='ProfileSkillServices'
                onClick={() => {
                  props.handleClick(sp)
                }}
              >
                <span className='ServicesTitle theme-primary'>
                  {sp.serviceRequestTypeDetails &&
                    getFields(
                      sp.serviceRequestTypeDetails,
                      'serviceTypeDescription'
                    )}
                </span>               
                <span>
                  {sp.recurringPattern === 0 ? 'One Time' : sp.recurringPatternDescription}
                  {' '}
                  |
                  {'Posted on '}
                  <Moment format='MMM DD'>
                    {sp.date}
                  </Moment>
                </span>
              </div>
  
              <div className='ProfileApplicationNumbers Avatar'  onClick={() => {
                if (sp.statusId === SERVICE_REQUEST.hiredId) {
                  props.goToPatientProfile(sp.patientId);
                }
              }}>
                <div className='ProfileApplicationWidget'>
                  <div className='avatarContainer'>
                    <Avatar
                      alt='NO'
                      className='avatarImage'
                      src={
                        patientImage                        
                      }
                    />
                  </div>
                </div>
                <span className='AvatarName'>
                  {sp.patientFirstName && getFullName(sp.patientFirstName,sp.patientLastName)}
                </span>
              </div>
            </li>
          </Fragment>
        )
      })
  }