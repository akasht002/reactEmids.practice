import { API } from '../../../services/api';
import { Get, CareTeamGet, ThirdPartyGet, OktaGet } from '../../../services/http';
import { push } from '../../navigation/actions';
import { save, loadData } from '../../../utils/storage';
import { remove } from '../../offline/actions';
import { Path } from '../../../routes';
import { USER_LOCALSTORAGE, ENTITY_USER, LOCALSTORAGE_KEYS, OKTA } from '../../../constants/constants';
import userManager from '../../../utils/userManager';
import { objectCreationRoles } from '../../../utils/roleUtility';
import { startLoading, endLoading } from '../../loading/actions';
import { USER } from './bridge'
import { logError } from '../../../utils/logError';
import moment from 'moment'

export const setUserRoles = (data) => {
    return {
        type: USER.setUserRoles,
        data
    }
}

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

export function isSecureLogin(data) {
    return {
        type: USER.isSecureLogin,
        data
    }
}

export function getsessionTimeOutSuccess(data) {
    return {
        type: USER.getsessionTimeOutSuccess,
        data
    }
}

export function onSetUserSuccess(data) {
    return (dispatch, getState) => {
        let userData = {
            ...getState().oidc.user
        };
        dispatch(setUserSuccess(userData))
        dispatch(getUserInactiveTimeout(getState().oidc.user.profile.sub));
    }
}

export const deleteUserSuccess = (userData) => {
    return {
        type: USER.deleteUser,
        userData: userData
    }
}

export function onLogout() {
    return (dispatch, getState) => {
        userManager.removeUser();
        dispatch(remove(USER_LOCALSTORAGE, onClear));
        userManager.signoutRedirect();
    }
}

export function onClear() {
    return (dispatch, getState) => {
        dispatch(deleteUserSuccess(null));
        dispatch(push(Path.root));
    }
}

export function setServiceProviderDetails(emailID, autoLogoutTime) {
    return (dispatch, getState) => {
        Get(API.getUserIdForCT)
            .then(resp => {
                let userData = {
                    ...getState().oidc.user,
                    userInfo: resp.data,
                    autoLogoutTime: autoLogoutTime
                };
                save(LOCALSTORAGE_KEYS.serviceProviderID, resp.data.serviceProviderId);
                save(LOCALSTORAGE_KEYS.serviceProviderTypeID, resp.data.serviceProviderTypeId);
                save(USER_LOCALSTORAGE, userData);
                dispatch(setUserSuccess(userData))
                dispatch(getUserRoles(userData))
            })
            .catch(err => {
                logError(err)
            })
    }
}

export function getUserRoles(userData) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return CareTeamGet(API.getUserRoles).then((response) => {
            if (response.data.length > 0) {
                dispatch(setUserRoles(objectCreationRoles(response.data)));
                userData.roles = objectCreationRoles(response.data);
            }
            save(USER_LOCALSTORAGE, userData);
            dispatch(setUserSuccess(userData))
            if (getState().authState.userState.userData.userInfo) {
                if (getState().authState.userState.userData.userInfo.serviceProviderTypeId === ENTITY_USER) {
                    dispatch(push(Path.entityDashboard))
                } else {
                    dispatch(push(Path.dashboard))
                }
            }
            dispatch(endLoading());
        })
            .catch((error) => {
                dispatch(endLoading());
            });
    }
}

export function getUserInactiveTimeout(emailID) {
    return (dispatch) => {
        return Get(API.getTimeoutMilliseconds).then((response) => {
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
            let localStorageData = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE));
            if (localStorageData) {
                dispatch(setUserSuccess(localStorageData.data));
            }
        }
    }
}

export function setMenuClicked(data) {
    return {
        type: USER.menuClicked,
        data
    }
};

export function setIsFormDirty(isDirty) {
    return {
        type: USER.setIsFormDirty,
        data: isDirty
    }
};

export const getThresholdRadius = () => async (dispatch) => {
    try {
        const resp = await ThirdPartyGet(API.getThresholdRadius)
        dispatch(getThresholdRadiusSuccess(resp.data[0]));
    } catch (error) {
        logError(error)
    }
};

export const getCurrentSession = () => async (dispatch) => {
    let localStorageData = loadData(OKTA.tokenStorage);
    try {
        const resp = await ThirdPartyGet(API.oktaSession + localStorageData.data.sessionId);
        if (resp && resp.data.expiresAt) {
            const momentUtcNow = moment.utc();
            const momentUtcExp = moment.utc(resp.data.expiresAt);
            const diff = momentUtcExp.diff(momentUtcNow, 'seconds') * 1000;
            dispatch(getsessionTimeOutSuccess(diff))
        }
    }
    catch (error) {
        logError(error)
    }
}

export const getThresholdRadiusSuccess = (data) => {
    return {
        type: USER.getThresholdRadiusSuccess,
        data
    }
}