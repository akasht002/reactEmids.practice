import axios from 'axios'
import { API, baseURL } from '../../../services/api'
import { push } from '../../navigation/actions';
import { save } from '../../../utils/storage';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/variables';
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
        // console.log(2222222222222222222222222222222222222222222);   
        dispatch(setServiceProviderID(JSON.parse(localStorage.getItem("userData")).data.profile.sub));
        dispatch(push(Path.profile));
    }
}

export function onLoginFail(){
    return (dispatch, getState) => {
        dispatch(loginFail());
        dispatch(push(Path.root));
    }
}

export function onLogin() {
    return (dispatch, getState) => {
        dispatch(loginStart());
        userManager.signinRedirect();
    }
}


export function setServiceProviderID(emailID){ 
    // let mailId = 'Radhika.Murali@emids.com'
    return (dispatch, getState) => {           
        axios
          .get(baseURL + API.getServiceProviderID + emailID )
          .then(resp => {
            dispatch(getServiceProviderIDSuccess(resp.data))
            localStorage.setItem("serviceProviderID",resp.data.serviceProviderId)
          })
          .catch(err => {
            console.log(err);
          })
      }
}