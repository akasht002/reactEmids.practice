import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import userManager from '../../../utils/userManager';
import { onSetUserSuccess, checkUserData } from '../user/actions';
import { USER_LOCALSTORAGE, USERTYPES } from '../../../constants/constants';

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
        let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
        if (localStorageData && localStorageData.data && localStorageData.data.access_token) {
            dispatch(checkUserData())
            dispatch(push(Path.dashboard))
        } else {
            dispatch(loginStart());
            userManager.signinRedirect();
        }
    }
}