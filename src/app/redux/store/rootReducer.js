import { combineReducers } from 'redux';
import deviceInfo from '../device/reducer';
import navigationState from '../navigation/reducer'
import {onboardingState} from '../onboarding/reducer';
import {profileState} from '../profile/reducer';
import wizardState from '../wizard/reducer';
// import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    // form:reduxFormReducer,
    navigationState,
    deviceInfo,
    onboardingState,
    profileState,
    wizardState
});