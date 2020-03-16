import { ResetPassword } from './bridge'
import { RESPONSE_STATUS } from '../../../redux/constants/constants';

const defaultState = {
    userId: null,
    emailId: '',
    token: '',
    patientId: null,
    resetPasswordSuccess: false,
    resetPasswordError: false,
    getEmailIdSuccess: false,
    getEmailIdError: false,
    resetPasswordStatus: false,
    resetPasswordLinkStatus: '',
    errorMessage: ''
};

const resetPasswordState = (state = defaultState, action) => {
    switch (action.type) {
        case ResetPassword.resetPasswordSuccess:
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordError: false,
                userId: action.data
            };
        case ResetPassword.resetPasswordError:
            return {
                ...state,
                resetPasswordStatus: action.data === RESPONSE_STATUS.ALREADY_EXIST ? true : false,
                resetPasswordSuccess: false,
                resetPasswordError: true
            };
        case ResetPassword.getEmailIdSuccess:
            return {
                ...state,
                emailId: action.data.email,
                token: action.data.token,
                userId: action.data.userId,
                patientId: action.data.patientId,
                resetPasswordLinkStatus: action.data.result,
                getEmailIdSuccess: true,
                getEmailIdError: false
            };
        case ResetPassword.getEmailIdError:
            return {
                ...state,
                emailId: '',
                token: '',
                userId: null,
                resetPasswordLinkStatus: action.data.result,
                getEmailIdSuccess: false,
                getEmailIdError: true
            };
        case ResetPassword.formDirty:
            return {
                ...state,
                resetPasswordStatus: false
            };
        case ResetPassword.resetPasswordErrorMessage:
            return {
                ...state,
                errorMessage: action.data
            };
        default:
            return state;
    }
}

export default resetPasswordState;