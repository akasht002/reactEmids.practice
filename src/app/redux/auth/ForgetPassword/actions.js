import { API } from '../../../services/api';
import { AuthGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {RESPONSE_STATUS} from '../../../redux/constants/constants';

export const ForgetPassword = {
    sendResetPasswordLinkSuccess: 'send_verification_link_success/forgetPassword',
    sendResetPasswordLinkError: 'send_verification_link_error/forgetPassword',
    formDirty: 'form_dirty/forgetPassword'
};

export const formDirty = () => {
    return {
        type: ForgetPassword.formDirty
    }
}

export const sendResetPasswordLinkSuccess = (data, emailId) => {
    return {
        type: ForgetPassword.sendResetPasswordLinkSuccess,
        data,
        emailId
    }
}

export const sendResetPasswordLinkError = () => {
    return {
        type: ForgetPassword.sendResetPasswordLinkError
    }
}

export function sendResetPasswordLink(data) {
    return (dispatch) => {
        let emailId = data && data.emailId;
        dispatch(startLoading());
        AuthGet(
            API.SendResetPasswordLink + emailId
        ).then((resp) => {
            if (resp && resp.statusText === RESPONSE_STATUS.OK) {
                dispatch(sendResetPasswordLinkSuccess(resp.data, emailId));
                dispatch(push(Path.resetPasswordConfirmation));
            } else {
                dispatch(sendResetPasswordLinkError());
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(sendResetPasswordLinkError());
            dispatch(endLoading());
        })
    }
}