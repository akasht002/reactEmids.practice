import { API } from '../../../services/api'
import { Get } from '../../../services/http'
import { push } from '../../navigation/actions';
import { save } from '../../../utils/storage';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/constants';
import userManager from '../../../utils/userManager';

export const LOGIN = {
    start: 'authentication_start/login',
    end: 'authentication_end/login',
    success: 'authentication_success/login',
    failed: 'authentication_failed/login',
    service_provider_id:'authentication/service_provider_id'
};

export const loginStart = () => {
    return {
        type: LOGIN.start
    }
}

export const loginEnd = () => {
    return {
        type: LOGIN.end
    }
}

export const loginFail = () => {
    return {
        type: LOGIN.failed
    }
}

export const loginSuccess = (userData) => {
    return {
        type: LOGIN.success,
        userData
    }
}

export const getServiceProviderIDSuccess = (data)=>{
    return {
        type: LOGIN.service_provider_id,
        data
    }
}

export function onLoginSuccess(data){
    return (dispatch, getState) => {
        dispatch(loginSuccess(data));
        save(USER_LOCALSTORAGE, getState().oidc.user);   
        dispatch(setServiceProviderID(JSON.parse(localStorage.getItem("userData")).data.profile.sub));
        dispatch(push(Path.profile));
    }
}

export function onLoginFail(){
    return (dispatch) => {
        dispatch(loginFail());
        dispatch(push(Path.root));
    }
}

export function onLogin() {
    return (dispatch) => {
        dispatch(loginStart());
        userManager.signinRedirect();
    }
}

export function setServiceProviderID(emailID){ 
    return (dispatch) => {           
        Get(API.getServiceProviderID + emailID )
          .then(resp => {
            dispatch(getServiceProviderIDSuccess(resp.data))
            localStorage.setItem("serviceProviderID",resp.data.serviceProviderId)
          })
          .catch(err => {
            console.log(err);
          })
      }
}