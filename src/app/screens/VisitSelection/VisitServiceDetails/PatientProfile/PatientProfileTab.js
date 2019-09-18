import React, { Fragment } from 'react';
import { TabPane } from 'reactstrap';
import PersonalDetail from '../../../PatientProfile/PersonalDetail';
import PointService from '../../../PatientProfile/PointService';
import Languages from '../../../PatientProfile/Languages';
import ClinicalCondition from '../../../PatientProfile/ClinicalCondition';
import VitalDetails from '../../../PatientProfile/VitalDetails';

export const PatientProfileTab = () => {
    return (
        <Fragment>
            <TabPane tabId='3' className='TabBody'>
            <div className="colorblock"></div>
             <div className="my-patientblock">   
            <PersonalDetail />
            <VitalDetails />
            <ClinicalCondition />
            <PointService />
            <Languages />
            </div>
            </TabPane>
        </Fragment>
    )
}
