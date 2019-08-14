import { store } from '../redux/store';
import {USERTYPES, PROFILE_SERVICE_PROVIDER_TYPE_ID} from '../constants/constants';
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

export const isEntityUser = () => {
    return getUserInfo().serviceProviderTypeId !== PROFILE_SERVICE_PROVIDER_TYPE_ID
};