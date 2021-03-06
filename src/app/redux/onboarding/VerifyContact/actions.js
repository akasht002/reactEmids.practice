import { API } from '../../../services/api';
import { Post, Get } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { clearState as verifyUserIdClear } from '../VerifyUserID/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import { USERTYPES } from '../../../constants/constants';
import { VerifyContact } from './bridge'

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
        return Post(API.sendTemporaryPasscode, modal).then((resp) => {
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
        return Post(API.verifyTemporaryPasscode, modal).then((resp) => {
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
                passcode: serviceProviderDetails.passcode,
                token: '',
                userType: USERTYPES.SERVICE_PROVIDER
            };
            dispatch(onSetUserIdCompletion(getUserData));
        }
    }
};

export function getEntityUserData(data) {
    return (dispatch) => {
        dispatch(startLoading());
        return Get(API.getEntityUserData + data.serviceProviderId + '/' + data.token).then((resp) => {
            let getUserData = {
                serviceProviderId: resp.data.serviceProviderId,
                memberId: '',
                emailId: resp.data.entityUserEmail,
                fullName: '',
                mobileNumber: resp.data.mobileNumber,
                passcode: '',
                token: data.token,
                userType: data.userType,
                lastName: resp.data.lastName,
                firstName: resp.data.firstName
            };
            dispatch(onSetUserIdCompletion(getUserData));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
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
