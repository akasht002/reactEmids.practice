import { API } from '../../../services/api';
import { Get } from '../../../services/http';
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
        dispatch(setServiceProviderDetials(JSON.parse(localStorage.getItem("userData")).data.profile.sub));   
    }
}

export const getServiceProviderDetailsSuccess = (data)=>{
    return {
        type: USER.setUser,
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

export function setServiceProviderDetials(emailID){ 
    return (dispatch, getState) => {           
        Get(API.getServiceProviderID + emailID )
          .then(resp => {
            dispatch(getServiceProviderDetailsSuccess(resp.data))
            const serviceData = {
                serviceProviderID: resp.data.serviceProviderId,
                serviceProviderTypeID: resp.data.serviceProviderTypeId
            }
            save(USER_LOCALSTORAGE, getState().oidc.user, serviceData);   
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export const checkUserData = () => {
    return (dispatch, getState) => {
        const userData = getState().userData;
        if (userData) {
            dispatch(onSetUserSuccess(userData));
        } else {
            const userData = localStorage.getItem("userData");
            dispatch(setUserSuccess(userData));
        }
      }
}

