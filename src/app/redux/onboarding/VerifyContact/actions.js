import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import {clearState as verifyUserIdClear} from '../VerifyUserID/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const VerifyContact = {
    passcodeSentSuccess: 'passcode_sent_success/verifycontact',
    setPasscodeNotMatch: 'set_passcode_match/verifycontact',
    setPasscodeMatch: 'set_passCode_match/verifycontact',
    passcodeVerifySuccess: 'passcode_verify_success/verifycontact',
    setPasscodeErrorStatus: 'passcode_error_status/verifycontact',
    onSetUserDetailsCompletion: 'set_user_details/verifycontact',
    cancelClick: 'cancel_click/verifycontact',
};

export const onSetUserId = (data) => {
    return {
        type: VerifyContact.setUserId,
        data
    }
};

export const cancelClick = () => {
    return {
        type: VerifyContact.cancelClick
    }
}

export const clearState = () => {
    return {
        type: VerifyContact.clearState
    }
}


export function sendTemporaryPasscode(data) {
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
        }
        dispatch(startLoading());
        axios.post(baseURL + API.sendTemporaryPasscode, modal).then((resp) => {
            if (resp && resp.data) {
                dispatch(onPasscodeSent());
                dispatch(endLoading());
            } else {
                dispatch(endLoading());
            }
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function verifyTempPasscode(data) {
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
            otpCode: data.passcode,
            isActive: true
        };
        dispatch(startLoading());
        axios.post(baseURL + API.verifyTemporaryPasscode, modal).then((resp) => {
            dispatch(verifyPasscodeSuccess());
            if (resp && resp.data === true) {
                dispatch(temporaryPasscodeSuccess());
                dispatch(endLoading());
            } else {
                dispatch(endLoading());
                dispatch(setPasscodeNotMatch(true))
            }
        }).catch((err) => {
            dispatch(endLoading());
            dispatch(setPasscodeNotMatch(true))
        })
    }
};

export function getUserData() {
    return (dispatch, getState) => {
        let currstate = getState();
        let getUserData = {
            serviceProviderId: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.serviceProviderId,
            memberId: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.memberId,
            emailId: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.emailId,
            fullName: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.fullName,
            mobileNumber: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.mobileNumber,
            passcode: currstate.onboardingState.verifyUserIDState.serviceProviderDetails.passcode
        };
        dispatch(onSetUserIdCompletion(getUserData));
    }
};

export const onSetUserIdCompletion = (data) => {
    return {
        type: VerifyContact.onSetUserDetailsCompletion,
        data
    }
};

export function setPasscodeError() {
    return (dispatch, getState) => {
        dispatch(setPasscodeNotMatch(false));
        dispatch(push('/verifyemail'));
    }
};

export function temporaryPasscodeSuccess() {
    return (dispatch, getState) => {
        dispatch(setPasscodeNotMatch(false))
        dispatch(setPasscodeMatch(true))
        dispatch(push('/setpassword'));
    }
};

export function setPasscodeMatch(isSuccess) {
    return {
        type: VerifyContact.setPasscodeMatch,
        isSuccess
    }
};

export function verifyPasscodeSuccess() {
    return {
        type: VerifyContact.passcodeVerifySuccess
    };
};

export function setPasscodeNotMatch(isSuccess) {
    return {
        type: VerifyContact.setPasscodeNotMatch,
        isSuccess
    };
};

export function onPasscodeSent() {
    return {
        type: VerifyContact.sendVerificationLink
    }
};

export function onCancelClick() {
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(verifyUserIdClear());
        dispatch(push(Path.root));
    }
}
