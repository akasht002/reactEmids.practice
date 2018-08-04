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

export function onLoginSuccess(data){
    return (dispatch, getState) => {
        dispatch(loginSuccess(data));
        save(USER_LOCALSTORAGE, data);
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