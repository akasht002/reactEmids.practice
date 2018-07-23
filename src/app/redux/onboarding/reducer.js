import { combineReducers } from 'redux';
import verifyUserIDState from './VerifyUserID/reducer';
import verifyContactState from './VerifyContact/reducer';
import setPasswordState from './SetPassword/reducer';
import onBoardSuccessState from './OnboardSuccess/reducer';

export const onboardingState = combineReducers({
    verifyUserIDState,
    verifyContactState,
    setPasswordState,
    onBoardSuccessState
});
