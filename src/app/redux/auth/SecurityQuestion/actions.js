import { API } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { ThirdPartyPost, ThirdPartyGet } from '../../../services/http';
import { SecurityQuestion } from './bridge';
import { logError } from '../../../utils/logError';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import { caseInsensitiveComparer } from '../../../utils/comparerUtility';
import { API_STATUS_CODE } from '../../../constants/status_code';

export const getSecurityQuestionSuccess = (data) => {
    return {
        type: SecurityQuestion.getSecurityQuestionSuccess,
        data
    }
}

export const validateSecurityAnswerSuccess = (data) => {
    return {
        type: SecurityQuestion.validateSecurityAnswerSuccess,
        data
    }
}

export const validateSecurityAnswerFail = (data) => {
    return {
        type: SecurityQuestion.validateSecurityAnswerFail,
        data
    }
}

export const formDirty = () => {
    return {
        type: SecurityQuestion.formDirty
    }
}

export const getSecurityQuestion = (uid) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const resp = await ThirdPartyGet(`${API.getSecurityQuestion}` + uid);
        dispatch(getSecurityQuestionSuccess(resp.data));
    } catch (error) {
        logError(error);
    } finally {
        dispatch(endLoading());
    }
}

export const validateSecurityAnswer = (data) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const resp = await ThirdPartyPost(`${API.validateSecurityAnswer}`, data);
        if (caseInsensitiveComparer(resp.data.statusMessage, API_STATUS_CODE.success)) {
            dispatch(validateSecurityAnswerSuccess(resp.data && resp.data.stateToken))
            dispatch(push(Path.resetPassword))
        } else {
            dispatch(validateSecurityAnswerFail(resp.data.statusMessage))
        }
    }
    catch (error) {
        logError(error);
    } finally {
        dispatch(endLoading());
    }
}