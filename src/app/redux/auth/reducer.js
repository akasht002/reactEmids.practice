import { combineReducers } from 'redux';
import forgetPasswordState from './ForgetPassword/reducer';
import resetPasswordState from './ResetPassword/reducer';
import loginState from './login/reducer';
import userState from './user/reducer';

export const authState = combineReducers({
    forgetPasswordState,
    resetPasswordState,
    loginState,
    userState
});