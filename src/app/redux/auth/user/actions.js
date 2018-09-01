import axios from 'axios'
import { API, baseURL } from '../../../services/api'
import { push } from '../../navigation/actions';
import { save } from '../../../utils/storage';
import { remove } from '../../offline/actions';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/constants';
import userManager from '../../../utils/userManager';

export const USER = {
    setUser: 'authentication_success/login',
    deleteUser: 'authentication_success/login'
};

export const setUserSuccess = (userData) => {
    return {
        type: USER.setUser,
        userData
    }
}

export function onSetUserSuccess(data){
    return (dispatch, getState) => {
        dispatch(setUserSuccess(data));
        save(USER_LOCALSTORAGE, getState().oidc.user);
        dispatch(setServiceProviderID(JSON.parse(localStorage.getItem("userData")).data.profile.sub));   
    }
}

export const getServiceProviderIDSuccess = (data)=>{
    return {
        type: USER.service_provider_id,
        data
    }
}

export const deleteUserSuccess = (userData) => {
    return {
        type: USER.deleteUser,
        userData: userData
    }
}

export function onLogout(){
    return (dispatch, getState) => {
        userManager.removeUser();
        dispatch(remove(USER_LOCALSTORAGE, onClear));
        userManager.signoutRedirect();
    }
}

export function onClear(){
    return (dispatch, getState) => {
        dispatch(deleteUserSuccess(null));
        dispatch(push(Path.root));
    }
}

export function setServiceProviderID(emailID) { 
    return (dispatch, getState) => {           
        axios
          .get(baseURL + API.getServiceProviderID + emailID )
          .then(resp => {
            dispatch(getServiceProviderIDSuccess(resp.data.serviceProviderId))
            localStorage.setItem("serviceProviderTypeID",resp.data.serviceProviderTypeId)
            localStorage.setItem("serviceProviderID",resp.data.serviceProviderId)
            dispatch(push(Path.profile));
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export const checkUserData = () => {
    return (dispatch, getState) => {
        var userData = getState().userData;
        if (userData) {
            dispatch(onSetUserSuccess(userData));
        } else {
            let authData = JSON.parse(localStorage.getItem("userData"));
            let serviceProviderID = localStorage.getItem('serviceProviderID');
            let serviceProviderTypeID = localStorage.getItem('serviceProviderTypeID');
            let userObj = {
                authData,
                serviceProviderID,
                serviceProviderTypeID
            }
            dispatch(setUserSuccess(userObj));
        }
      }
}

