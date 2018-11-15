import { combineReducers } from 'redux';
import VisitNotificationSettingsState from './VisitNotificationSettings/reducer';
import VisitNotificationState from './VisitNotification/reducer';

export const visitNotificationState = combineReducers({
    VisitNotificationSettingsState,
    VisitNotificationState
});