import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getUserInfo} from '../../../utils/userUtility';

import {
    VisitNotificationSettings
} from './bridge'

export const startLoadingNotification = () =>{
    return {
        type: VisitNotificationSettings.startLoadingNotification
    }
}

 export const endLoadingNotification = () =>{
    return {
        type: VisitNotificationSettings.endLoadingNotification
    }
}

export const getVisitNotificationSettingsSuccess = (data) => {
    return {
        type: VisitNotificationSettings.getVisitNotificationSettingsSuccess,
        data
    }
}

export const updateVisitNotificationSettingsSuccess = (data) => {
    return {
        type: VisitNotificationSettings.getVisitNotificationSettingsSuccess,
        data
    }
}

export function getVisitNotificationSettings() {
    return (dispatch) => {
        let userId = getUserInfo().serviceProviderId;
        dispatch(startLoadingNotification());
        Get(API.getNotificationSettings + userId).then((resp) => {
            dispatch(getVisitNotificationSettingsSuccess(resp.data))
            dispatch(endLoadingNotification());
        }).catch((err) => {
            dispatch(endLoadingNotification());
        })
    }
};

export function updateVisitNotificationSettings(data) {
    console.log('data: '+JSON.stringify(data))
    return (dispatch) => {
        let userId = getUserInfo().serviceProviderId;
        dispatch(startLoading());
        Post(API.updateNotificationSettings + userId, data).then((resp) => {
            dispatch(updateVisitNotificationSettingsSuccess(resp.data))
            dispatch(getVisitNotificationSettings())
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const handlePushChangeSuccess = (data) => {
    return {
        type: VisitNotificationSettings.handlePushChangeSuccess,
        data
    }
}

export const handleEmailChangeSuccess = (data) => {
    return {
        type: VisitNotificationSettings.handleEmailChangeSuccess,
        data
    }
}

export function handlePushChange(data) {
    return (dispatch, getState) => {
        let checkedPush = getState().visitNotificationState.VisitNotificationSettingsState.pushNotification;
        var foundIndex = checkedPush.findIndex(function (i) {
             return i.userPrefrencesApplicationModuleID === data.userPrefrencesApplicationModuleID;
         });
         checkedPush.splice(foundIndex, 1, data)
         dispatch(handlePushChangeSuccess(checkedPush));
    }
};

export function handleEmailChange(data) {
    return (dispatch, getState) => {
        let checkedPush = getState().visitNotificationState.VisitNotificationSettingsState.emailNotification;
        var foundIndex = checkedPush.findIndex(function (i) {
             return i.userPrefrencesApplicationModuleID === data.userPrefrencesApplicationModuleID;
         });
         checkedPush.splice(foundIndex, 1, data)
        dispatch(handleEmailChangeSuccess(checkedPush));
    }
};