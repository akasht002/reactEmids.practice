import { API } from '../../../services/api';
import { AuthGet, ThirdPartyPost } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {RESPONSE_STATUS} from '../../../redux/constants/constants';
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

// export function sendResetPasswordLink(data) {
//     return (dispatch) => {
//         let emailId = data && data.emailId;
//         dispatch(startLoading());
//         return AuthGet(
//             API.SendResetPasswordLink + emailId
//         ).then((resp) => {
//             if (resp && resp.statusText === RESPONSE_STATUS.OK) {
//                 dispatch(sendResetPasswordLinkSuccess(resp.data, emailId));
//                 dispatch(push(Path.resetPasswordConfirmation));
//             } else {
//                 dispatch(sendResetPasswordLinkError());
//             }
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(sendResetPasswordLinkError());
//             dispatch(endLoading());
//         })
//     }
// }

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
    }
    dispatch(endLoading());
}