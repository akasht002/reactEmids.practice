
import { onLoginSuccess } from '../auth/login/actions';
import { push } from '../navigation/actions';
import { deviceInit } from '../device/actions';
import {load} from '../offline/actions';
import { USER_LOCALSTORAGE } from '../../constants/constants';

export const APP_INIT = "APP_INIT";
export const APP_READY = "APP_READY";


export const appInit = () => {
    return {
        type: APP_INIT
    }
}

export function checkPrevLogin() {
    return (dispatch) => {
       dispatch(load(USER_LOCALSTORAGE, onCheckPrevLogin))
    }
};

export function onCheckPrevLogin(userData) {
    return (dispatch) => {
        if (userData && userData.username) {
            dispatch(onLoginSuccess(userData))
        } else {
            dispatch(push('/login'))
        }
    }
};

export function onAppReady() {
    return (dispatch, getState) => {
        dispatch(deviceInit())
        dispatch(checkPrevLogin())
    }
}


