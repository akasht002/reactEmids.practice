import { store } from '../redux/store';
import {USERTYPES, PROFILE_SERVICE_PROVIDER_TYPE_ID} from '../constants/constants';
import { SERVICE_STATES,VISIT_STATUS } from '../constants/constants'

export const getState = () => {
    return store && store.getState();
}

export const getUserState = () => {
    return store && store.getState().authState.userState;
}

export const getUserInfo = () => {
    return getUserState().userData.userInfo;
}

export const getPatientData = () => {
    return getUserState().selectedPatientData;
}

export const isEntityServiceProvider = () => {
    return getUserInfo().serviceProviderTypeId === PROFILE_SERVICE_PROVIDER_TYPE_ID && getUserInfo().isEntityServiceProvider
};

export const fetchUserId = () => {
    return getUserInfo().userType === USERTYPES.PATIENT ? getUserInfo().patientId : getUserInfo().userId;
}

export const isPatientGuardian = () => {
    return getPatientData().userType === USERTYPES.GUARDIAN;
}

export const isPatientIndividual = () => {
    return getPatientData().userType === USERTYPES.PATIENT;
}

export const isUserGuardian = () => {
    return getUserInfo().userType === USERTYPES.GUARDIAN;
}

export const isUserIndividual = () => {
    return getUserInfo().userType === USERTYPES.PATIENT;
};

export const getPersonalDetailsState = () => {
    return store && store.getState().profileState.PersonalDetailState;
};

export const getVisitStatus = (visitStatusId) => {
    switch(visitStatusId){
        case VISIT_STATUS.startVisit.id:
            return SERVICE_STATES.YET_TO_START
        case VISIT_STATUS.inProgress.id:
            return SERVICE_STATES.IN_PROGRESS
        case VISIT_STATUS.completed.id:
            return SERVICE_STATES.COMPLETED
        case VISIT_STATUS.paymentPending.id:
            return SERVICE_STATES.PAYMENT_PENDING 
        default :
    }
   
}

export const isEntityUser = () => {
    return getUserInfo().serviceProviderTypeId !== PROFILE_SERVICE_PROVIDER_TYPE_ID
};
