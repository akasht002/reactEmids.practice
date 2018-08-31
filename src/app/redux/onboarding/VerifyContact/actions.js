import { API } from '../../../services/api';
import { Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { clearState as verifyUserIdClear } from '../VerifyUserID/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const VerifyContact = {
    passcodeSentSuccess: 'passcode_sent_success/verifycontact',
    setPasscodeNotMatch: 'set_passcode_match/verifycontact',
    setPasscodeMatch: 'set_passCode_match/verifycontact',
    temporaryPasscodeExpired: 'temporary_password_expired/verifycontact',
    passcodeVerifySuccess: 'passcode_verify_success/verifycontact',
    setPasscodeErrorStatus: 'passcode_error_status/verifycontact',
    onSetUserDetailsCompletion: 'set_user_details/verifycontact',
    cancelClick: 'cancel_click/verifycontact',
    formDirty: 'form_dirty/memberdetails',
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

export const formDirty = () => {
    return {
        type: VerifyContact.formDirty
    }
}

export const onSetUserIdCompletion = (data) => {
    return {
        type: VerifyContact.onSetUserDetailsCompletion,
        data
    }
};

export function temporaryPasscodeExpired(isExpired) {
    return {
        type: VerifyContact.temporaryPasscodeExpired,
        isExpired
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

export function sendTemporaryPasscode(data) {
    return (dispatch) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
        }
        dispatch(startLoading());
        Post(API.sendTemporaryPasscode, modal).then((resp) => {
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
    return (dispatch) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
            otpCode: data.passcode,
            isActive: true
        };
        dispatch(startLoading());
        Post(PI.verifyTemporaryPasscode, modal).then((resp) => {
            if (resp && resp.data === 'Otp Matched') {
                dispatch(verifyPasscodeSuccess());
                dispatch(temporaryPasscodeSuccess());
                dispatch(endLoading());
            } else if(resp && resp.data === 'Otp Expired'){
                dispatch(endLoading());
                dispatch(temporaryPasscodeExpired(true))
            } else if(resp && resp.data === 'Otp Not Matched'){
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
        let serviceProviderDetails = currstate.onboardingState.verifyUserIDState.serviceProviderDetails;
        if (serviceProviderDetails) {
            let getUserData = {
                serviceProviderId: serviceProviderDetails.serviceProviderId,
                memberId: serviceProviderDetails.memberId,
                emailId: serviceProviderDetails.emailId,
                fullName: serviceProviderDetails.fullName,
                mobileNumber: serviceProviderDetails.mobileNumber,
                passcode: serviceProviderDetails.passcode
            };
            dispatch(onSetUserIdCompletion(getUserData));
        }
    }
};

export function setPasscodeError() {
    return (dispatch) => {
        dispatch(setPasscodeNotMatch(false));
        dispatch(push(Path.verifyEmail));
    }
};

export function temporaryPasscodeSuccess() {
    return (dispatch) => {
        dispatch(setPasscodeNotMatch(false))
        dispatch(setPasscodeMatch(true))
        dispatch(push(Path.setPassword));
    }
};

export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(verifyUserIdClear());
        dispatch(push(Path.root));
    }
}
