import React  from 'react'
import {  ENTITY_USER, SERVICE_REQUEST_DETAILS_TAB } from '../../../constants/constants';
import {  getUserInfo } from '../../../utils/userUtility';
import { isFutureDay,getHHMinSession } from '../../../utils/dateUtility'
import { getFullName } from '../../../utils/stringHelper'
import { Avatar } from '../../../components'
import QuickMenu from '../../Components/QuickMenu'


export const calenderDetails = (props,conversations,options,index) => {
    return (
     <li
     key={index}
     className={'list-group-item ProfileServicesVisitContent ' + (getUserInfo().serviceProviderTypeId === ENTITY_USER && "EntityUDashboard") }
     >
     <div className="ProfileViewTime" onClick={() => {
         props.handleClick(conversations, SERVICE_REQUEST_DETAILS_TAB.myPlan)
       }}>
       <span>
       {getHHMinSession(conversations.visitStartTime)}                 
       </span>
     </div>
     <div className="dashboard-view-first">
     <div
       className='ProfileServices'              
     >
     <span className="ServicesCalendarWidget" onClick={() => {
         props.handleClick(conversations, SERVICE_REQUEST_DETAILS_TAB.myPlan)
       }}>
       <span className='ServicesTitle theme-primary'>
         {conversations.serviceTypes &&
           conversations.serviceTypes.join(', ')}
       </span>      
       </span>
       {getUserInfo().serviceProviderTypeId === ENTITY_USER &&
       <div className="EntityUServiceProf">
        {isFutureDay(conversations.visitDate) ? conversations.providerId === getUserInfo().serviceProviderId ? 
        <span><i className="assignSPLink"
           onClick={e =>{
             props.togglePersonalDetails({
               serviceRequestId: conversations.serviceRequestId,
               serviceRequestVisitid: conversations.serviceRequestVisitId,
               patientId: conversations.patientId,
               visitDate:conversations.visitDate
             })}
           }
         >
           Assign Service Provider
           </i>
         </span> :
       <React.Fragment>
         <div className='ProfileCardImageContainer' 
         onClick={() => {
         props.goToESPProfile(conversations.providerId);
     }}>
       <Avatar
         alt={'NO_IMAGE'}
         key={index}
         className='avatarImage avatarImageBorder'
         src={
           conversations.providerImage
             ? conversations.providerImage
             : require('../../../assets/images/Blank_Profile_icon.png')
         }
       />
     </div>
     <div className='ProfileCardNameContainer' onClick={() => {
       props.goToESPProfile(conversations.providerId);
     }}>
       <span>
         {conversations.providerFirstName &&
           conversations.providerFirstName +
           ' '}
         {' '}
         {conversations.providerLastName && conversations.providerLastName}
       </span>
     </div>
     </React.Fragment>:''}
       </div>
         }
     </div>
    </div>


 {/*Patient Profile*/}
    <div className="profile-card-viewblock">
     <div className='ProfileCardImageContainer' 
     onClick={() => {
       props.goToPatientProfile(conversations, SERVICE_REQUEST_DETAILS_TAB.myPatient);
     }}>
       <Avatar
         alt={'NO_IMAGE'}
         key={index}
         className='avatarImage avatarImageBorder'
         src={
           conversations.patientImage
             ? conversations.patientImage
             : require('../../../assets/images/Blank_Profile_icon.png')
         }
       />
     </div>
     <div className='ProfileCardNameContainer' onClick={() => {
       props.goToPatientProfile(conversations, SERVICE_REQUEST_DETAILS_TAB.myPatient);
     }}>
       <span>
         {conversations.patientFirstName && 
           getFullName(conversations.patientFirstName,conversations.patientLastName)
         }
       </span>
     </div>        
          <QuickMenu conversations = {conversations}/> 
     </div>
   </li>
    )
 }

