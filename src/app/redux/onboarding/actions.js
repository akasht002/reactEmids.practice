
import { push } from '../navigation/actions';
import axios from 'axios';

export const Onboarding = {
    sendVerificationLink: 'send_verification_link/onboard',
    onSetUserIdCompletion: 'set_user_id/onboard',
    setPassword: 'set_password/onboard',
    clearOnboardingState: 'clear_state/onboard'
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

export function sendVerificationLink(data) {
    return (dispatch, getState) => {
        dispatch(onSetUserIdCompletion(data));
        dispatch(sendVerificationLinkSuccess(true));
    }
};


export function getPlans() {
    return (dispatch, getState) => {
        dispatch(loadingStart());
        axios.get(baseURL + API.GetPlan).then((resp) => {
        //axios.get('http://www.mocky.io/v2/5b34e9ba2f0000560037612b').then((resp) => {
            if(resp && resp.data){
                dispatch(getPlansSuccess(resp.data))
                dispatch(loadingEnd());
            }else{
               // dispatch(loginEnd())
               // dispatch(loginFail())
            }
        }).catch((err) => {
            dispatch(loadingEnd());
        })
    }
}


export const onSetUserIdCompletion = (data) => {
    return {
        type: Onboarding.onSetUserIdCompletion,
        data
    }
};

export const sendVerificationLinkSuccess = (isSuccess) => {
    return {
        type: Onboarding.sendVerificationLink,
        isSuccess
    }
};

export function onUserEmailNext(data){
    debugger;
     return (dispatch, getState) => {
        dispatch(onSetUserIdCompletion(data))
        dispatch(push('/verifycontact'));
    }
};