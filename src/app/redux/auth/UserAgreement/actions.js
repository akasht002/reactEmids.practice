import { AuthGet, AuthPut } from '../../../services/http';
import { API } from '../../../services/api';

export const UserAgreement = {
    getUserInfoSuccess: 'getUserInfoSuccess/userAgreement',
    getEulaContentSuccess: 'getEulaContentSuccess/userAgreement',
    updateEulaSuccess: 'updateEulaSuccess/userAgreement'
};

export const getUserInfoSuccess = (data) => {
    return {
        type: UserAgreement.getUserInfoSuccess,
        data
    }
}

export const getEulaContentSuccess = (data) => {
    return {
        type: UserAgreement.getEulaContentSuccess,
        data
    }
}

export const updateEulaSuccess = (data) => {
    return {
        type: UserAgreement.updateEulaSuccess,
        data
    }
}


export function getUserInformation() { 
    return (dispatch, getState) => { 
        AuthGet(API.getLoginInfo)          
          .then(resp => {
            dispatch(getUserInfoSuccess(resp.data));
            dispatch(getEulaContent());
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function getEulaContent() { 
    return (dispatch, getState) => {
        AuthGet(API.getEulaContent )          
          .then(resp => {
            dispatch(getEulaContentSuccess(resp.data));
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function updateEula() { 
    return (dispatch, getState) => { 
        let subject = getState().authState.userAgreementState.emailId;
        AuthPut(API.updateEula, {subject: subject})          
          .then(resp => {
            dispatch(updateEulaSuccess(resp.data));
          })
          .catch(err => {
            console.log(err);
          })
      }
}