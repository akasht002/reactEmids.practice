//actions
import {  push } from '../../navigation/actions';

import {remove } from '../../offline/actions';
//export const ON_LOGOUT = "ON_LOGOUT";

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
        dispatch(logoutSuccess(null))
        //save('userData',null);
        dispatch(logoutEnd());
        //dispatch(navigateToScreenMainStack('LoginScreen'));
        dispatch(remove('userData', onClear))
        dispatch(push('/login'));
        
    }
}

export function onClear(data){
    return (dispatch, getState) => {
        dispatch(push('/login'));
        //dispatch(onBack());
    }
}










