import { API } from '../../../services/api';
import { ThirdPartyPost } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {ForgetPassword} from './bridge';
import { caseInsensitiveComparer } from '../../../utils/comparerUtility';
import { logError } from '../../../utils/logError';
import { API_STATUS_CODE } from '../../../constants/status_code';

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

export const sendResetPasswordLink = (data) => async (dispatch) => {
    dispatch(startLoading());
    let model = ({
        userName: data && data.emailId,
        ApplicationType: 'SP'
    });
    try {
        const resp = await ThirdPartyPost(`${API.SendResetPasswordLink}`, model);
        caseInsensitiveComparer(resp.data.statusMessage, API_STATUS_CODE.success) ?
            dispatch(push(Path.resetPasswordConfirmation))
            :
            dispatch(sendResetPasswordLinkError())
    } catch (error) {
        logError(error)
    } finally {
        dispatch(endLoading());
    }
}