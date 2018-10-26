import { API } from '../../services/api';
import { PatientGet } from '../../services/http';
import { startLoading, endLoading } from '../loading/actions';
import { USERTYPES } from '../../constants/constants';

export const PatientProfile = {
    getProfilePercentageSuccess: 'get_profile_percentage_success/PatientProfile',
    setPatient: 'setPatient/PatientProfile',
    getPersonalDetailSuccess: 'getPersonalDetailSuccess/PatientProfile',
    getImgSuccess: 'getImgSuccess/PatientProfile',
    getPointServiceSuccess: 'getPointServiceSuccess/PatientProfile',
    getManageConnectionSuccess: 'getManageConnectionSuccess/PatientProfile',
    getSelectedLanguageDetails: 'getSelectedLanguageDetails/PatientProfile',
    getSelectedClinicalConditionDetails: 'getSelectedClinicalConditionDetails/PatientProfile',
    clearState: 'clearState/PatientProfile'
};

export const clearState = () => {
    return {
        type: PatientProfile.clearState
    }
}

export const setPatient = (data) => {
    return {
        type: PatientProfile.setPatient,
        data
    }
}

export const getProfilePercentageSuccess = (data) => {
    return {
        type: PatientProfile.getProfilePercentageSuccess,
        data
    }
}

export function getProfilePercentage() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientProfilePercentage + patientId)
        .then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
        }).catch((err) => {
        })
    }
};

export const getPersonalDetailSuccess = data => {
    return {
        type: PatientProfile.getPersonalDetailSuccess,
        data
    }
}

export function getPersonalDetail() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        dispatch(startLoading())
        PatientGet(API.getPatientPersonalDetail + patientId + '/PatientDetails')
        .then(resp => {
            dispatch(getPersonalDetailSuccess(resp.data))
            dispatch(endLoading())
        })
        .catch(err => {
            dispatch(endLoading())
        })
    }
}

export const getImgSuccess = data => {
    return {
        type: PatientProfile.getImgSuccess,
        data
    }
}

export function getImage() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientImage + patientId)
        .then(resp => {
            dispatch(getImgSuccess(resp.data))
        })
        .catch(err => {
        })
    }
}

export const getPointServiceSuccess = data => {
    return {
        type: PatientProfile.getPointServiceSuccess,
        data
    }
}

export function getPointService() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientAddress + patientId + '/PatientAddress')
        .then(resp => {
            dispatch(getPointServiceSuccess(resp.data))
        })
        .catch(err => {
        })
    }
}

export const getManageConnectionSuccess = data => {
    return {
        type: PatientProfile.getManageConnectionSuccess,
        data
    }
}

export function getManageConnection () {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientConnections + patientId + '/' + USERTYPES.PATIENT)
        .then(resp => {
            dispatch(getManageConnectionSuccess(resp.data.users))
        })
        .catch(err => {
        })
    }
}

export const getSelectedLanguageDetails = (data) => {
    return {
        type: PatientProfile.getSelectedLanguageDetails,
        data
    }
}

export function getSelectedLanguages() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientLanguages + patientId + '/Languages').then((resp) => {
            dispatch(getSelectedLanguageDetails(resp.data))
        }).catch(() => {
        })
    }
};

export const getSelectedClinicalConditionDetails = (data) => {
    return {
        type: PatientProfile.getSelectedClinicalConditionDetails,
        data
    }
}

export function getSelectedClinicalCondition() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        PatientGet(API.getPatientClinicalCondition + patientId).then((resp) => {
            dispatch(getSelectedClinicalConditionDetails(resp.data))
        }).catch(() => {
        })
    }
};
