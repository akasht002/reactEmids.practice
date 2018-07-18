import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import { VALID } from '../../constants/constants';

export const VerifyUserID = {
    verifyEmail: 'verify_email/verifyuserid',
    nextClick: 'next_click/verifyuserid',
    cancelClick: 'cancel_click/verifyuserid',
    setIsAlreadyOnboarded: 'set_already_Onboarded/verifyuserid',
    userEmailNotExist: 'user_email_not_exist/verifyuserid',
    onSetUserIdCompletion: 'on_set_userid_completion/verifyuserid',
    setUserId: 'set_useris/verifyuserid',
    onSetUserDetailsCompletion: 'on_set_user_details_completion/verifyuserid',
    clearState: 'clear_state/verifyuserid'
};

export function onUserEmailNext(data) {
    return (dispatch, getState) => {
        dispatch(push(Path.verifyContact));
    }
};

export const cancelClick = () => {
    return {
        type: VerifyUserID.cancelClick
    }
}

export const clearState = () => {
    return {
        type: VerifyUserID.clearState
    }
}

export function sendVerificationLink(emailData) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.sendEmailVerification + emailData.emailId).then((resp) => {
            if (resp && resp.data) {
                if (resp.data.isExist === VALID) {
                    dispatch(onSetUserIdCompletion(resp.data));
                    dispatch(isAlreadyOnboarded(false));
                    dispatch(userEmailNotExist(true));
                } else {
                    dispatch(isAlreadyOnboarded(true));
                    dispatch(userEmailNotExist(false));
                }
                dispatch(endLoading());
            } else {
                dispatch(isAlreadyOnboarded(false));
                dispatch(endLoading());
                dispatch(userEmailNotExist(false));
            }
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const onSetUserIdCompletion = (data) => {
    return {
        type: VerifyUserID.onSetUserDetailsCompletion,
        data
    }
};

export const isAlreadyOnboarded = (isExist) => {
    return {
        type: VerifyUserID.setIsAlreadyOnboarded,
        isExist
    }
};

export const userEmailNotExist = (isExistMsge) => {
    return {
        type: VerifyUserID.userEmailNotExist,
        isExistMsge
    }
};

export function onCancelClick() {
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(clearState());
        dispatch(push(Path.root));
    }
}
