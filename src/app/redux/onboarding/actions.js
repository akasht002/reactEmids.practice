import axios from 'axios';
import { push } from '../navigation/actions';
import { API, baseURL } from '../../services/api';


export const Onboarding = {
    sendVerificationLink: 'send_verification_link/onboard',
    onSetUserDetailsCompletion: 'set_user_id/onboard',
    setPassword: 'set_password/onboard',
    clearOnboardingState: 'clear_state/onboard',
    loadingStart: 'loading_start/onboard',
    loadingEnd: 'loading_end/onboard',
    userEmailNotExist: 'email_fail/onboard',
    setUserId: 'set_useris/onboard',
    passcodeSentSuccess: 'passcode_sent_success/onboard',
    setPasscodeNotMatch: 'set_passcode_match/onboard',
    serviceProviderOnboardSucess: 'onboard_success/onboard',
    passcodeVerifySuccess : 'passcode_verify_success/onbaord',
    setPasscodeErrorStatus: 'passcode_error_status/onbaord'
};


export const clearOnboardingState = () => {
    return {
        type: Onboarding.clearOnboardingState
    }
};

export function onCancelClick() {
    return (dispatch, getState) => {
        dispatch(clearOnboardingState());
        dispatch(push('/'));
    }
};


export const loadingStart = () => {
    return {
        type: Onboarding.loadingStart
    }
};


export const loadingEnd = () => {
    return {
        type: Onboarding.loadingEnd
    }
};

export function sendVerificationLink(emailData) {
    return (dispatch, getState) => {
        dispatch(loadingStart());
        axios.get(baseURL + API.sendEmailVerification + emailData.emailId).then((resp) => {
            if (resp && resp.data) {
                dispatch(onSetUserIdCompletion(resp.data));
                dispatch(loadingEnd());
            } else {
                dispatch(loadingEnd());
                dispatch(userEmailNotExist())
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};


export const onSetUserIdCompletion = (data) => {
    return {
        type: Onboarding.onSetUserDetailsCompletion,
        data
    }
};

export const userEmailNotExist = (data) => {
    return {
        type: Onboarding.userEmailNotExist,
    }
};

export const sendVerificationLinkSuccess = (isSuccess) => {
    return {
        type: Onboarding.sendVerificationLink,
        isSuccess
    }
};

export function onUserEmailNext(data) {
    return (dispatch, getState) => {
        dispatch(push('/verifycontact'));
    }
};

export const onSetUserId = (data) => {
    return {
        type: Onboarding.setUserId,
        data
    }
};

export function sendTemporaryPasscode(data) {
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
            serviceProviderEmailId: data.emailId,
            mobileNumber: data.mobileNumber,
            firstName: '',
            lastName: '',
            memberId: '',
            tempPassword: 0
        }
        dispatch(loadingStart());
        axios.post(baseURL + API.sendTemporaryPasscode, modal).then((resp) => {
            if (resp && resp.data) {
                dispatch(onPasscodeSent());
                dispatch(loadingEnd());
            } else {
                dispatch(loadingEnd());
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};


export function verifyTempPasscode(data) {
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId: data.serviceProviderId,
            serviceProviderEmailId: data.emailId,
            mobileNumber: data.mobileNumber,
            firstName: '',
            lastName: '',
            memberId: '',
            tempPassword: data.passcode
        };
        dispatch(loadingStart());
        axios.post(baseURL + API.verifyTemporaryPasscode, modal).then((resp) => {
            dispatch(verifyPasscodeSuccess());
            if (resp && resp.data === true) {
                dispatch(temporaryPasscodeSuccess());
                dispatch(loadingEnd());
            } else {
                dispatch(loadingEnd());
                dispatch(setPasscodeSuccess(true))
            }
        }).catch((err) => {
            dispatch(loadingEnd());
            dispatch(setPasscodeSuccess(false))
        })
    }
};

export function setPasscodeError(){
    return(dispatch, getState) => {
        dispatch(setPasscodeSuccess(false));
         dispatch(push('/verifyemail'));
    }
};

export function temporaryPasscodeSuccess() {
    return (dispatch, getState) => {
        dispatch(setPasscodeSuccess(false))
        dispatch(push('/setpassword'));
    }
};

export function verifyPasscodeSuccess() {
    return {
        type: Onboarding.passcodeVerifySuccess
    };
};

export function setPasscodeSuccess(isSuccess) {
    return {
        type: Onboarding.setPasscodeNotMatch,
        isSuccess
    };
};

export function onPasscodeSent() {
    return {
        type: Onboarding.sendVerificationLink
    }
};


export function setPassword(data) {
    return (dispatch, getState) => {
        let body = {
            userName: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        dispatch(loadingStart());
        axios.post(baseURL + API.setPassword, body).then((resp) => {
            dispatch(onboardSucess());
            dispatch(loadingEnd());
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};

export function onboardSucess() {
    return (dispatch, getState) => {
        dispatch(passwordSetSuccess());
        dispatch(clearOnboardingState());
        dispatch(push('/'));
    }
};


export function passwordSetSuccess(){
    return{
        type: Onboarding.serviceProviderOnboardSucess
    }
};