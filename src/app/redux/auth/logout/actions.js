//actions
import {  push } from '../../navigation/actions';
import { remove } from '../../offline/actions';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE, REFRESH_TOKEN } from '../../../constants/constants';
import userManager from '../../../utils/userManager';
import {LOGOUT} from './bridge'

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

export function onLogout(onSuccess){
    return (dispatch) => {
        let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
        if (localStorageData && localStorageData.data && localStorageData.data.access_token) {
            dispatch(remove(USER_LOCALSTORAGE, onClear));
            dispatch(remove(REFRESH_TOKEN, onClear));
            userManager.removeUser();
            onSuccess ? onSuccess() : userManager.signoutRedirect();
        } else {
            dispatch(push(Path.root))
        }
    }
}

export function onClear(data){
    return (dispatch, getState) => {
        dispatch(logoutSuccess(null));
        dispatch(logoutEnd());
        dispatch(push(Path.root));
    }
}










