import axios from 'axios';
import { push } from '../navigation/actions';
import {API, baseURL} from '../../services/api';


export const Onboarding = {
    sendVerificationLink: 'send_verification_link/onboard',
    onSetUserIdCompletion: 'set_user_id/onboard',
    setPassword: 'set_password/onboard',
    clearOnboardingState: 'clear_state/onboard',
    loadingStart: 'loading_start/onboard',
    loadingEnd: 'loading_end/onboard',
    userEmailNotExist: 'email_fail/onboard',
    passcodeSentSuccess: 'passcode_sent_success/onboard',
    passcodeSentFailure: 'passcode_sent_fail/onboard',
    passcodeVerifySuccess: 'passcode_verify_success/onboard',
    passcodeVerifyFailure: 'passcode_verify_Failure/onboard'
};



export const clearOnboardingState = () => {
    return {
        type: Onboarding.clearOnboardingState
    }
}

export function onCancelClick(){
    return (dispatch, getState) => {
        dispatch(clearOnboardingState());
        dispatch(push('/'));
    }
}
export function onSetUserIdPrevious(data){
    return (dispatch, getState) => {
        dispatch(onSetUserIdCompletion(data))
        dispatch(push('/memberdetails'));
    }
}

export function setPasswordSuccess(data){
    return (dispatch, getState) => {
        dispatch(push('/'));
    }
}

export function setPassword(data) {
    return (dispatch, getState) => {
        //dispatch(loginStart())
        dispatch(setPasswordSuccess(data))
        // axios.post('http://www.mocky.io/v2/5b34e9ba2f0000560037612b', data).then((resp) => {
        //     if(resp && resp.data){
        //         dispatch(setPasswordSuccess(resp.data))
        //         //dispatch(loginEnd())
        //     }else{
        //        // dispatch(loginEnd())
        //        // dispatch(loginFail())
        //     }
        // }).catch((err) => {
        //    // dispatch(loginEnd())
        //     //dispatch(loginFail())
        // })
    }
}

// export function sendVerificationLink(data) {
//     return (dispatch, getState) => {
//         dispatch(onSetUserIdCompletion(data));
//         dispatch(sendVerificationLinkSuccess(true));
//     }
// };


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
    debugger;
    return (dispatch, getState) => {
        dispatch(loadingStart());
        axios.get(baseURL + API.sendEmailVerification + emailData.emailId).then((resp) => {
            if(resp && resp.data){
                dispatch(onSetUserIdCompletion(resp.data));
                dispatch(loadingEnd());
            }else{
               dispatch(loadingEnd());
               dispatch(userEmailNotExist())
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};


export const onSetUserIdCompletion = (data) => {
    debugger;
    return {
        type: Onboarding.onSetUserIdCompletion,
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

export function onUserEmailNext(data){
     return (dispatch, getState) => {
        dispatch(onSetUserIdCompletion(data))
        dispatch(push('/verifycontact'));
    }
};



export function sendTemporaryPasscode(data) {
    debugger;
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId : data.serviceProviderId,
            serviceProviderEmailId: data.emailId,
            mobileNumber: data.mobileNumber,
            firstName: '',
            lastName: '',
            memberId : '',
            tempPassword: ''
        }
        debugger;
        dispatch(loadingStart());
        axios.post(baseURL + API.sendTemporaryPasscode, modal).then((resp) => {
            if(resp && resp.data){
                dispatch(onPasscodeSent());
                dispatch(loadingEnd());
            }else{
               dispatch(loadingEnd());
               dispatch(userEmailNotExist())
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};


export function verifyTempPasscode(data) {
    debugger;
    let modal = {
        serviceProviderId : data.serviceProviderId,
        serviceProviderEmailId: data.emailId,
        mobileNumber: data.mobileNumber,
        firstName: '',
        lastName: '',
        memberId : '',
        tempPassword: data.passcode
    };
    return (dispatch, getState) => {
        dispatch(loadingStart());
        axios.post(baseURL + API.verifyTemporaryPasscode, modal).then((resp) => {
            if(resp && resp.data){
                dispatch(onPasscodeSent());
                dispatch(loadingEnd());
            }else{
               dispatch(loadingEnd());
               dispatch(userEmailNotExist())
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
};

export function onPasscodeSent(){
    return {
        type: Onboarding.sendVerificationLink
    }
};
