import axios from 'axios';
import {API, baseURL} from '../../../services/api';
import {startLoading, endLoading} from '../../loading/actions';
import { push } from '../../navigation/actions';
import {Path} from '../../../routes';

export const SetPassword = {
    setPassword: 'set_password/setPassword',
    onSetUserDetailsCompletion: 'set_user_details/setPassword',
    cancelClick: 'cancel_click/verifycontact',
};

export const cancelClick = () => {
    return {
        type: SetPassword.cancelClick
    }
}

// export const clearState = () => {
//     return {
//         type: SetPassword.clearState
//     }
// }

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
        type: SetPassword.onSetUserDetailsCompletion,
        data
    }
};

export function setPassword(data) {
    return (dispatch, getState) => {
        let body = {
            userName: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword
        };
        dispatch(startLoading());
        axios.post(baseURL + API.setPassword, body).then((resp) => {
            dispatch(onboardSucess());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function onboardSucess() {
    return (dispatch, getState) => {
        dispatch(passwordSetSuccess());
        //dispatch(clearOnboardingState());
        dispatch(push('/onboardsuccess'));
    }
};


export function passwordSetSuccess(){
    return{
        type: SetPassword.serviceProviderOnboardSucess
    }
};


export function onCancelClick(){
    return (dispatch, getState) => {
        dispatch(cancelClick());
        dispatch(push(Path.root));
    }
}
    