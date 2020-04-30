import { API } from '../../../services/api';
import { AuthGet,ThirdPartyPost } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {RESPONSE_STATUS} from '../../../redux/constants/constants';
import {encryptPassword} from '../../../utils/encryptPassword';
import { ResetPassword } from './bridge'
import { caseInsensitiveComparer } from '../../../utils/comparerUtility';
import { API_STATUS_CODE } from '../../../constants/status_code';
import { logError } from '../../../utils/logError';

export const formDirty = () => {
    return {
        type: ResetPassword.formDirty
    }
}

export const resetPasswordSuccess = (data) => {
    return {
        type: ResetPassword.resetPasswordSuccess,
        data
    }
}

export const resetPasswordError = (data) => {
    return {
        type: ResetPassword.resetPasswordError,
        data
    }
}

export const getEmailIdSuccess = (data) => {
    return {
        type: ResetPassword.getEmailIdSuccess,
        data
    }
}

export const getEmailIdError = (data) => {
    return {
        type: ResetPassword.getEmailIdError,
        data
    }
}

export const resetPasswordErrorMessage = (data) => {
    return {
        type: ResetPassword.resetPasswordErrorMessage,
        data
    }
}

export function getEmailId(data) {
    return (dispatch) => {
        let url;
        url = API.getEmailIdByUserId + data.uid + '/' + data.tokenkey;
        dispatch(startLoading());
        return AuthGet(url).then((resp) => {
            if (resp && resp.data && resp.data.result === RESPONSE_STATUS.LINK_ACTIVE) {
                dispatch(getEmailIdSuccess(resp.data));
            } else {
                dispatch(getEmailIdError(resp.data));
            }
            dispatch(endLoading());
        }).catch((err) => {
            //dispatch(getEmailIdError(err.response.data));
            dispatch(endLoading());
        })
    }
}

export const resetPassword = (data) => async (dispatch, getState) => {
    dispatch(startLoading());
    const encryptedPass = encryptPassword(data.password);
    let stateToken = getState().authState.securityQuestionState.stateToken;
    let model = {
        password: encryptedPass,
        stateToken: stateToken
    }
    try {
        const resp = await ThirdPartyPost(`${API.resetPassword}`, model);
        caseInsensitiveComparer(resp.data.statusMessage, API_STATUS_CODE.success) ?
            dispatch(push(Path.resetPasswordSuccess))
            :
            dispatch(resetPasswordErrorMessage(resp.data.statusMessage))
    } catch (error) {
        logError(error)
    } finally {
        dispatch(endLoading());
    }
}