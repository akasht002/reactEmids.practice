import React, { Fragment } from 'react';
import { TabPane } from 'reactstrap';
import PersonalDetail from '../../../PatientProfile/PersonalDetail';
import PointService from '../../../PatientProfile/PointService';
import Languages from '../../../PatientProfile/Languages';
import ClinicalCondition from '../../../PatientProfile/ClinicalCondition';
import EmergencyAttorneyContact from '../../../PatientProfile/EmergencyAttorneyContact';
import MyConnections from '../../../PatientProfile/MyConnections';

export const PatientProfileTab = props => {
    return (
        <Fragment>
            <TabPane tabId='3' className='TabBody'>
            <div className="colorblock theme-primary-gradient"></div>
             <div className="my-patientblock">   
            <PersonalDetail 
             showPhoneNumber={props.showPhoneNumber}
             onClickConversation={props.onClickConversation}
             onClickVideoConference={props.onClickVideoConference}
            />
            <EmergencyAttorneyContact />
            <ClinicalCondition />
            <PointService />
            <Languages />
            <MyConnections />
            </div>
            </TabPane>
        </Fragment>
    )
}
