import { API } from '../../services/api';
import { PatientGet,Get } from '../../services/http';
import { startLoading, endLoading } from '../loading/actions';
import { USERTYPES } from '../../constants/constants';
import { PatientProfile } from './bridge'

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


export const setParticipantProfile = (data) => {
    return {
        type: PatientProfile.setParticipantProfile,
        data
    }
}

export const setESP = (data) => {
    return {
        type: PatientProfile.setESP,
        data
    }
}


export const getProfilePercentageSuccess = (data) => {
    return {
        type: PatientProfile.getProfilePercentageSuccess,
        data
    }
}

export const getESPPersonalDetailSuccess = data => {
    return {
      type: PatientProfile.get_esp_personal_detail_success,
      data
    }
  }

  export const uploadESPImgSuccess = data => {
    return {
      type: PatientProfile.upload_esp_img_success,
      data
    }
  }

  export const getESPEducationSuccess = (data) => {
    return {
        type: PatientProfile.getESPEducationSuccess,
        data
    }
}

export function getESPEducation() {
    return (dispatch, getState) => {
        let serviceProviderId = getState().patientProfileState.espID
        dispatch(startLoading());
        return Get(API.education + serviceProviderId+'/Education').then((resp) => {
            dispatch(getESPEducationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getESPImage () {
    return (dispatch, getState) => {
      let serviceProviderId =  getState().patientProfileState.espID
      dispatch(startLoading())
      return Get(API.getImage + serviceProviderId)
        .then(resp => {
          dispatch(uploadESPImgSuccess(resp.data))
          dispatch(endLoading())
        })
        .catch(err => {
          dispatch(endLoading())
        })
    }
  }
  
  export function getESPPersonalDetail () {
    return (dispatch, getState) => {
      let serviceProviderId = getState().patientProfileState.espID
      dispatch(startLoading())
      return Get(API.getPersonalDetail + serviceProviderId + '/ProfileView')
        .then(resp => {
          dispatch(getESPPersonalDetailSuccess(resp.data))
          dispatch(endLoading())
        })
        .catch(err => {
          dispatch(endLoading())
        })
    }
  }


export function getProfilePercentage() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        return PatientGet(API.getPatientProfilePercentage + patientId)
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
        let userType = getState().patientProfileState.userType;
        if(userType === USERTYPES.GUARDIAN || userType === USERTYPES.PATIENT_AND_GUARDIAN){
            dispatch(getPersonalDetailGuardian(patientId));
        }else{
            dispatch(startLoading())
            return PatientGet(API.getPatientPersonalDetail + patientId + '/PatientDetails')
            .then(resp => {
                dispatch(getPersonalDetailSuccess(resp.data))
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
        }
        
    }
}

export function getPersonalDetailGuardian(userId) {
    return (dispatch) => {
      dispatch(startLoading())
      return PatientGet(API.getPersonalDetailGuardian + userId)
        .then(resp => {
            let data = {
                ...resp.data,
                phoneNumber: resp.data.contactNumber,
                gender: {
                  id: resp.data.genderId,
                  genderName: resp.data.genderName
                }
              };
            dispatch(getPersonalDetailSuccess(data))
            dispatch(endLoading())
        })
        .catch(err => {
          dispatch(endLoading())
        })
    }
  };

export const getImgSuccess = data => {
    return {
        type: PatientProfile.getImgSuccess,
        data
    }
}

export function getImage() {
    return (dispatch, getState) => {
        const patientId = getState().patientProfileState.patientId;
        
        let userType = getState().patientProfileState.userType;
        if(userType === USERTYPES.GUARDIAN || userType === USERTYPES.PATIENT_AND_GUARDIAN){
            dispatch(getImageGuardian(patientId));
        }else{
            return PatientGet(API.getPatientImage + patientId)
            .then(resp => {
                dispatch(getImgSuccess(resp.data))
            })
            .catch(err => {
            })
        }
    }
};

export function getImageGuardian(userId) {
    return (dispatch) => {
        return PatientGet(API.getImageGuardian + userId)
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
        return PatientGet(API.getPatientAddress + patientId + '/PatientAddress')
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
        return PatientGet(API.getPatientConnections + patientId + '/' + USERTYPES.PATIENT)
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
        return PatientGet(API.getPatientLanguages + patientId + '/Languages').then((resp) => {
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
        return PatientGet(API.getPatientClinicalCondition + patientId).then((resp) => {
            dispatch(getSelectedClinicalConditionDetails(resp.data))
        }).catch(() => {
        })
    }
};

export function getPatientVitals() {
    return (dispatch, getState) => {
        let patientId = getState().patientProfileState.patientId;
        dispatch(startLoading());
        return PatientGet(API.getPatientVitals + patientId).then((resp) => {
            dispatch(getPatientVitalsSuccess(resp.data))
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
};

export const getPatientVitalsSuccess = (data) => {
    return {
        type: PatientProfile.getPatientVitalsSuccess,
        data
    }
}

export const getEmergencyContactDetailsSuccess = (data) => {
    return {
        type: PatientProfile.getEmergencyContactDetailsSuccess,
        data
    }
}

export const getAttorneyContactDetailsSuccess = (data) => {
    return {
        type: PatientProfile.getAttorneyContactDetailsSuccess,
        data
    }
}

export const getEmergencyContactDetails = () => async (dispatch, getState) => {
    let patientId = getState().patientProfileState.patientId;
    dispatch(startLoading());
    try {
        const resp = await PatientGet(API.getEmergencyContactDetails + patientId)
        dispatch(getEmergencyContactDetailsSuccess(resp.data))
        dispatch(endLoading());
    } catch (error) {
        dispatch(endLoading());
    }
};

export const getAttorneyContactDetails = () => async (dispatch, getState) => {
    let patientId = getState().patientProfileState.patientId;
    dispatch(startLoading());
    try {
        const resp = await PatientGet(API.getAttorneyContactDetails + patientId)
        dispatch(getAttorneyContactDetailsSuccess(resp.data))
        dispatch(endLoading());
    } catch (error) {
        dispatch(endLoading());
    }
};