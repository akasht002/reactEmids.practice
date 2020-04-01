import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import userManager from '../../../utils/userManager';
import { onSetUserSuccess, checkUserData } from '../user/actions';
import { USER_LOCALSTORAGE, OKTA, USER_CREDENTIALS } from '../../../constants/constants';
import { LOGIN } from './bridge'
import { encryptPassword } from '../../../utils/encryptPassword';
import { ThirdPartyPost } from '../../../services/http';
import { API } from '../../../services/api';
import { loadData, save } from '../../../utils/storage';
import { userFound } from 'redux-oidc'
import { startLoading, endLoading } from '../../loading/actions';
import { logError } from '../../../utils/logError';

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

export const loginFail = (data) => {
    return {
        type: LOGIN.failed,
        data
    }
}

export function onLoginSuccess(data) {
    return (dispatch) => {
        dispatch(onSetUserSuccess(data));
    }
}

export function onLoginFail(data) {
    return (dispatch) => {
        dispatch(loginFail(data));
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

export const login = (data) => async (dispatch, getState) => {
    let modelData = {
        UserName: data.UserName,
        Password: encryptPassword(data.Password),
        ApplicationType: 'SP'
    }
    save(USER_CREDENTIALS, modelData)
    dispatch(startLoading());
    try {
        const resp = await ThirdPartyPost(`${API.getToken}`, modelData)
        save(OKTA.tokenStorage, resp.data)
        let localStorageData = loadData(OKTA.tokenStorage);
        if (localStorageData && localStorageData.data.status === "Success") {
            const { idToken, accessToken, expiresIn } = localStorageData.data
            let loginResponse = {
                access_token: accessToken,
                expires_at: expiresIn,
                id_token: idToken,
                profile: {
                    amr: idToken.amr,
                    auth_time: idToken.auth_time,
                    idp: idToken.idp,
                    sub: idToken.preferred_username,
                    scope: accessToken.scopes,
                    token_type: accessToken.tokenType
                }
            }
            dispatch(userFound(loginResponse))
            dispatch(onLoginSuccess(loginResponse))
        } else {
            dispatch(onLoginFail(localStorageData.data.status))
        }
    } catch (error) {
        logError(error)
    }
    dispatch(endLoading());
}; 