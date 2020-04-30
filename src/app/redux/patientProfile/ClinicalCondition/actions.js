import { API } from '../../../services/api';
import { PatientGet, PatientPut } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

export const ClinicalCondition = {
    getClinicalConditionSuccess: 'get_ClinicalCondition_success/ClinicalCondition',
    getSelectedClinicalConditionDetails: 'get_selected_ClinicalCondition_details/ClinicalCondition',
    GET_SELECTED_CLINICAL_CONDITION_SUCCESS : 'GET_SELECTED_CLINICAL_CONDITION_SUCCESS',
    clearState: 'clearState/ClinicalCondition'
};

export const clearState = () => {
    return {
        type: ClinicalCondition.clearState
    }
}

export const getClinicalConditionSuccess = (data) => {
    return {
        type: ClinicalCondition.getClinicalConditionSuccess,
        data
    }
}

export const getSelectedClinicalConditionSuccess = (data) => {
    return {
        type: ClinicalCondition.GET_SELECTED_CLINICAL_CONDITION_SUCCESS,
        data
    }
}

export const getSelectedClinicalConditionDetails = (data) => {
    return {
        type: ClinicalCondition.getSelectedClinicalConditionDetails,
        data
    }
}

export function getClinicalCondition() {    
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        return PatientGet(API.getPatientClinicalCondition + patientId).then((resp) => {
            dispatch(getClinicalConditionSuccess(resp.data))
        }).catch(() => {
        })
    }
};

export function addClinicalCondition(data) {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        let ClinicalCondition = data ? data.split(/\s*,\s*/).map((val) => {
            return {
                attributeId: Number.parseInt(val,10),
                patientId: patientId
            }
        }) : [];
        let modal = {
            ClinicalCondition
        };
        dispatch(startLoading());
        return PatientPut(API.addClinicalCondition + patientId , modal.ClinicalCondition).then(() => {
            dispatch(getSelectedClinicalCondition());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
};

export function getSelectedClinicalCondition() {
    return (dispatch, getState) => {
        let { patientId } = getState().patientProfileState;
        return PatientGet(API.getPatientClinicalCondition + patientId).then((resp) => {
            dispatch(getSelectedClinicalConditionDetails(resp.data))
        }).catch(() => {
        })
    }
};