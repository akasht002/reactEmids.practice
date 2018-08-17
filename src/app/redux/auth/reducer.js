import { combineReducers } from 'redux';
import forgetPasswordState from './ForgetPassword/reducer';
import resetPasswordState from './ResetPassword/reducer';

export const authState = combineReducers({
    forgetPasswordState,
    resetPasswordState,
});