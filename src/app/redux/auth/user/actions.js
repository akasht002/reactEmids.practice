import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { push } from '../../navigation/actions';
import { save } from '../../../utils/storage';
import { remove } from '../../offline/actions';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/constants';
import userManager from '../../../utils/userManager';

export const USER = {
    setUser: 'fetch_success/user',
    deleteUser: 'delete_user/user',
    setAutoLogout: 'set_auto_logout/user',
    clearData: 'clear_data/user'
};

export const setUserSuccess = (userData) => {
    return {
        type: USER.setUser,
        userData
    }
}

export const setAutoLogout = (data) => {
    return {
        type: USER.setAutoLogout,
        data
    }
}

export const clearData = () => {
    return {
        type: USER.clearData
    }
}

export function onSetUserSuccess(data){
    return (dispatch, getState) => {
        dispatch(setUserSuccess(data));
        dispatch(setServiceProviderDetails(getState().oidc.user.profile.sub));
        dispatch(getUserInactiveTimeout()); 
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

export function setServiceProviderDetails(emailID){ 
    return (dispatch, getState) => {
        Get(API.getServiceProviderID + emailID )
          .then(resp => {
          let userData = {
                ...getState().oidc.user,
                serviceData: {
                    serviceProviderID: resp.data.serviceProviderId,
                    serviceProviderTypeID: resp.data.serviceProviderTypeId,
                }
            };
            localStorage.setItem('serviceProviderID', resp.data.serviceProviderId);
            localStorage.setItem('serviceProviderTypeID', resp.data.serviceProviderTypeId);
            save(USER_LOCALSTORAGE, userData);
            dispatch(setUserSuccess(userData))
            dispatch(push(Path.profile));   
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function getUserInactiveTimeout() {
    return (dispatch) => {
        Get(API.getTimeoutMilliseconds).then((response) => {
            dispatch(setAutoLogout(parseInt(response.data[0].name)));
        })
        .catch((error) => { });
    }
}

export const checkUserData = () => {
    return (dispatch, getState) => {
        let userData = getState().userData;
        if (userData) {
            dispatch(onSetUserSuccess(userData));
        } else {
            let userData = localStorage.getItem(USER_LOCALSTORAGE);
            dispatch(setUserSuccess(userData));
        }
      }
}
