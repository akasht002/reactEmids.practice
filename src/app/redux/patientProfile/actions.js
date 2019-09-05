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
        Get(API.education + serviceProviderId+'/Education').then((resp) => {
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
      Get(API.getImage + serviceProviderId)
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
      Get(API.getPersonalDetail + serviceProviderId + '/ProfileView')
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
        let userType = getState().patientProfileState.userType;
        if(userType === USERTYPES.GUARDIAN || userType === USERTYPES.PATIENT_AND_GUARDIAN){
            dispatch(getPersonalDetailGuardian(patientId));
        }else{
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
}

export function getPersonalDetailGuardian(userId) {
    return (dispatch) => {
      dispatch(startLoading())
      PatientGet(API.getPersonalDetailGuardian + userId)
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
            PatientGet(API.getPatientImage + patientId)
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
      PatientGet(API.getImageGuardian + userId)
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
