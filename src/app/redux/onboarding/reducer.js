import { combineReducers } from 'redux';
import verifyUserIDState from './VerifyUserID/reducer';
import verifyContactState from './VerifyContact/reducer';
import setPasswordState from './SetPassword/reducer';

export const onboardingState = combineReducers({
    verifyUserIDState,
    verifyContactState,
    setPasswordState
});
