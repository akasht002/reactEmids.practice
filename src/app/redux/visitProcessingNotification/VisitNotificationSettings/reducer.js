import {
    VisitNotificationSettings
} from './bridge'

const defaultState = {
    pushNotification: [],
    emailNotification: [],
    isLoading : false
};

const VisitNotificationSettingsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitNotificationSettings.getVisitNotificationSettingsSuccess:
            return {
                ...state,
                pushNotification: action.data.pushNotification,
                emailNotification: action.data.emailNotification
            };
        case VisitNotificationSettings.updateVisitNotificationSettingsSuccess:
            return {
                ...state,
            };
        case VisitNotificationSettings.handlePushChangeSuccess:
            return {
                ...state,
                pushNotification: action.data
            };
        case VisitNotificationSettings.handleEmailChangeSuccess:
            return {
                ...state,
                emailNotification: action.data
            };
        case VisitNotificationSettings.startLoadingNotification:
            return {
                ...state,
                isLoading: true
            };
        case VisitNotificationSettings.endLoadingNotification:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default VisitNotificationSettingsState;
