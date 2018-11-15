import {
    VisitNotificationSettings
} from './actions'

const defaultState = {
    pushNotification: [],
    emailNotification: []
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
    
        default:
            return state;
    }
}

export default VisitNotificationSettingsState;
