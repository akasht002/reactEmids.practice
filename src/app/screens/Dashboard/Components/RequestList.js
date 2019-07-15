import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { getFields } from '../../../utils/validations'
import { HIRED_STATUS_ID } from '../../../constants/constants';

export const ServiceProviderRequestDetails = props => {
    return props.serviceRequest
      .slice(props.minVal, props.maxVal)
      .map((sp, index) => {
        let patientImage = '';
        let patientLastName = '';
        if (sp.statusId === HIRED_STATUS_ID) {
          patientImage = sp && sp.image ? sp.image : require('../../../assets/images/Blank_Profile_icon.png');
          patientLastName = sp && sp.patientLastName;
        } else {
          patientLastName = sp && sp.patientLastName && sp.patientLastName.charAt(0);
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
                  props.handleClick(sp.serviceRequestId)
                }}
              >
                <span className='ServicesTitle'>
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
                  <Moment format='DD MMM'>
                    {sp.startDate}
                  </Moment>
                  {sp.recurringPattern !== 0 && <React.Fragment>
                    { ' - '}
                    <Moment format='DD MMM'>
                    {sp.endDate}
                  </Moment>
                  </React.Fragment>}
                </span>
              </div>
  
              <div className='ProfileApplicationNumbers Avatar'  onClick={() => {
                if (sp.statusId === HIRED_STATUS_ID) {
                  props.goToPatientProfile(sp.patientId);
                }
              }}>
                <div className='ProfileApplicationWidget'>
                  <div className='avatarContainer'>
                    <img
                      alt='NO'
                      className='avatarImage'
                      src={
                        patientImage                        
                      }
                    />
                  </div>
                </div>
                <span className='AvatarName'>
                  {sp.patientFirstName &&
                    sp.patientFirstName + ' '}
                  {patientLastName}
                </span>
              </div>
            </li>
          </Fragment>
        )
      })
  }