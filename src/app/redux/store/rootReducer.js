import { combineReducers } from 'redux';
import deviceInfo from '../device/reducer';
import navigationState from '../navigation/reducer';
import { onboardingState } from '../onboarding/reducer';
import {authState} from '../auth/reducer';
import loadingState from '../loading/reducer';
import { profileState } from '../profile/reducer';
import wizardState from '../wizard/reducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';
import authUser from '../auth/login/reducer'

export default combineReducers({
    authState,
    form:reduxFormReducer,
    navigationState,
    deviceInfo,
    onboardingState,
    profileState,
    wizardState,
    loadingState,
    oidc:oidcReducer,
    authUser
});