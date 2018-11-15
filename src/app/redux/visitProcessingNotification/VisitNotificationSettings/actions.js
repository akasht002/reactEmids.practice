import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getPatientData} from '../../../utils/userUtility';

export const VisitNotificationSettings = {
    getVisitNotificationSettingsSuccess: 'get_visit_notification_list_success/VisitNotificationSettings',
    updateVisitNotificationSettingsSuccess: 'update_visit_notification_list_success/VisitNotificationSettings',
    handlePushChangeSuccess: 'handlePushChangeSuccess/VisitNotificationSettings',
    handleEmailChangeSuccess: 'handleEmailChangeSuccess/VisitNotificationSettings',

};

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
        let userId = getPatientData().userId;
        dispatch(startLoading());
        Get(API.getNotificationSettings + userId).then((resp) => {
            dispatch(getVisitNotificationSettingsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateVisitNotificationSettings(data) {
    console.log('data: '+JSON.stringify(data))
    return (dispatch) => {
        let userId = getPatientData().userId;
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