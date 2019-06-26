import { API } from '../../../services/api';
import { AuthGet, AuthPut } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {RESPONSE_STATUS} from '../../../redux/constants/constants';
import {encryptPassword} from '../../../utils/encryptPassword';
import {ResetPassword} from './bridge';

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
            dispatch(getEmailIdError(err.response.data));
            dispatch(endLoading());
        })
    }
}

export function resetPassword(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let userModel = {
            userId: '',
            userName: '',
            password: '',
            token: ''
        };
        const encryptedPass = encryptPassword(data.password);
         if (currstate.authState.resetPasswordState) {
            userModel = {
                userId: data.userId,
                userName: currstate.authState.resetPasswordState.emailId,
                password: encryptedPass,
                token: data.token
            };
        }
        dispatch(startLoading());
        return AuthPut(API.resetPassword, userModel).then((resp) => {
            if (resp && resp.statusText === RESPONSE_STATUS.OK) {
                dispatch(resetPasswordSuccess(resp.data));
                dispatch(push(Path.resetPasswordSuccess));
            } else {
                dispatch(resetPasswordError());
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(resetPasswordError(err.response.data));
            dispatch(endLoading());
        })
    }
}