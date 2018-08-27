//actions
import {  push } from '../../navigation/actions';
import { remove } from '../../offline/actions';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/variables';
import userManager from '../../../utils/userManager';

export const LOGOUT = {
    start: 'fetch_start/logout',
    end: 'fetch_end/logout',
    success: 'fetch_success/logout',
    failed: 'fetch_failed/logout',
};

export const logoutStart = () => {
    return {
        type: LOGOUT.start
    }
}

export const logoutEnd = () => {
    return {
        type: LOGOUT.end
    }
}

export const logoutFail = () => {
    return {
        type: LOGOUT.failed
    }
}

export const logoutSuccess = (userData) => {
    return {
        type: LOGOUT.success,
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

export function onClear(data){
    return (dispatch, getState) => {
        dispatch(logoutSuccess(null));
        dispatch(logoutEnd());
        dispatch(push(Path.root));
    }
}










