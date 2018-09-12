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
    clearData: 'clear_data/user'
};

export const setUserSuccess = (userData) => {
    return {
        type: USER.setUser,
        userData
    }
}

export const clearData = () => {
    return {
        type: USER.clearData
    }
}

export function onSetUserSuccess(data){
    return (dispatch, getState) => {
        dispatch(getUserInactiveTimeout(getState().oidc.user.profile.sub));
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

export function setServiceProviderDetails(emailID, autoLogoutTime){ 
    return (dispatch, getState) => {           
        Get(API.getServiceProviderID + emailID )
          .then(resp => {
            let userData = {
                ...getState().oidc.user,
                userInfo: resp.data,
                autoLogoutTime: autoLogoutTime
            };
            localStorage.setItem('serviceProviderID', resp.data.serviceProviderId);
            localStorage.setItem('serviceProviderTypeID', resp.data.serviceProviderTypeId);
            save(USER_LOCALSTORAGE, userData);
            dispatch(setUserSuccess(userData))
            dispatch(push(Path.dashboard));   
          })
          .catch(err => {
            console.log(err);
          })
      }
}

export function getUserInactiveTimeout(emailID) {
    return (dispatch) => {
        Get(API.getTimeoutMilliseconds).then((response) => {
            dispatch(setServiceProviderDetails(emailID, parseInt(response.data[0].name, 10)));
        })
        .catch((error) => { });
    }
}

export const checkUserData = () => {
    return (dispatch, getState) => {
        let userState = getState().authState.userState;
        let access_token = userState && userState.userData && userState.userData.access_token
        if (!access_token) {
            let userData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE)).data;
            dispatch(setUserSuccess(userData));
        }
    }
}
