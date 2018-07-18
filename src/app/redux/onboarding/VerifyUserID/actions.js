import axios from 'axios';
import {API, baseURL} from '../../../services/api';
import {startLoading, endLoading} from '../../loading/actions';
import { push } from '../../navigation/actions';
import {Path} from '../../../routes';

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
        dispatch(push('/verifycontact'));
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
                if(resp.data.isExist === "Valid"){
                    dispatch(onSetUserIdCompletion(resp.data));
                    dispatch(isAlreadyOnboarded(false));
                    dispatch(userEmailNotExist(false, true));
                }else{
                    dispatch(isAlreadyOnboarded(true));
                    dispatch(userEmailNotExist(false, false));
                }
                dispatch(endLoading());
            } else {
                dispatch(isAlreadyOnboarded(false));
                dispatch(endLoading());
                dispatch(userEmailNotExist(true, false));
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

export const isAlreadyOnboarded =(isExist) =>{
    return{
        type: VerifyUserID.setIsAlreadyOnboarded,
        isExist
    }
};

export const userEmailNotExist = (isNotExistMsg, isExistMsge) => {
    return {
        type: VerifyUserID.userEmailNotExist,
        isNotExistMsg,
        isExistMsge
    }
};

export function onCancelClick(){
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(clearState());
        dispatch(push(Path.root));
    }
}
    