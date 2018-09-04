import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import userManager from '../../../utils/userManager';
import { onSetUserSuccess } from '../user/actions';

export const LOGIN = {
    start: 'authentication_start/login',
    end: 'authentication_end/login',
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

export function onLoginSuccess(data){
    return (dispatch) => {
        dispatch(onSetUserSuccess(data));
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