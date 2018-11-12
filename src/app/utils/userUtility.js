import { store } from '../redux/store';
import {USERTYPES} from '../constants/constants';

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
}