import { combineReducers } from 'redux';
import deviceInfo from '../device/reducer';
import navigationState from '../navigation/reducer'
import {onboardingState} from '../onboarding/reducer';
import wizardState from '../wizard/reducer';
export default combineReducers({
    navigationState,
    deviceInfo,
    onboardingState,
    wizardState
});