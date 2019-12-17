import {ForgetPassword} from './bridge';

const defaultState = {
    sendResetPasswordLinkSuccess: false,
    sendResetPasswordLinkError: false,
    emailId: ''
};

export const forgetPasswordState = (state = defaultState, action) => {
    switch (action.type) {
        case ForgetPassword.sendResetPasswordLinkSuccess:
            return {
                ...state,
                sendResetPasswordLinkSuccess: true,
                sendResetPasswordLinkError: false,
                emailId: action.emailId
            };
        case ForgetPassword.sendResetPasswordLinkError:
            return {
                ...state,
                sendResetPasswordLinkSuccess: false,
                sendResetPasswordLinkError: true
            };
        case ForgetPassword.formDirty:
            return defaultState
        default:
            return state;
    }
}

export default forgetPasswordState;