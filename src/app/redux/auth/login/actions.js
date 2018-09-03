import { push } from '../../navigation/actions';
import { save } from '../../../utils/storage';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE } from '../../../constants/constants';
import userManager from '../../../utils/userManager';
import { setServiceProviderDetials } from '../user/actions';

export const LOGIN = {
    start: 'authentication_start/login',
    end: 'authentication_end/login',
    success: 'authentication_success/login',
    failed: 'authentication_failed/login'
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
        save(USER_LOCALSTORAGE, getState().oidc.user);   
        dispatch(setServiceProviderDetials(JSON.parse(localStorage.getItem("userData")).authData.profile.sub));
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