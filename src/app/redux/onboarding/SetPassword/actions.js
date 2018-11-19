import {API} from '../../../services/api';
import {Post} from '../../../services/http';
import {startLoading, endLoading} from '../../loading/actions';
import {clearState as verifyContactClear} from '../VerifyUserID/actions';
import { push } from '../../navigation/actions';
import {Path} from '../../../routes';
import {encryptPassword} from '../../../utils/encryptPassword';
import { USERTYPES } from '../../../constants/constants';

export const SetPassword = {
    setPassword: 'set_password/setPassword',
    onSetUserDetailsCompletion: 'set_user_details/setPassword',
    cancelClick: 'cancel_click/setPassword',
    clearOnboardingState: 'clear_state/setPassword',
};

export const cancelClick = () => {
    return {
        type: SetPassword.cancelClick
    }
}

export const clearState = () => {
    return {
        type: SetPassword.clearState
    }
}

export const clearOnboardingState = () => {
    return {
        type: SetPassword.clearOnboardingState
    }
};

export function getUserData() {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderDetails = currstate.onboardingState.verifyContactState.serviceProviderDetails;
        if (serviceProviderDetails) {
            let getUserData = {
                serviceProviderId: serviceProviderDetails.serviceProviderId,
                memberId: serviceProviderDetails.memberId,
                emailId: serviceProviderDetails.emailId,
                fullName: serviceProviderDetails.fullName,
                mobileNumber: serviceProviderDetails.mobileNumber,
                passcode: serviceProviderDetails.passcode,
                token: serviceProviderDetails.token,
                userType: serviceProviderDetails.userType
            };
            dispatch(onSetUserIdCompletion(getUserData));
        }
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
        let userType = getState().onboardingState.setPasswordState.serviceProviderDetails.userType;
        if (userType === USERTYPES.ENTITY_USER) {
            dispatch(setPasswordEntity(data))
        } else {
            dispatch(setPasswordIndividual(data))
        }
    }
};

export function setPasswordIndividual(data) {
    return (dispatch) => {
        let body = {
            userName: data.username,
            password: encryptPassword(data.password)
        };
        dispatch(startLoading());
        Post(API.setPassword, body).then((resp) => {
            dispatch(onboardSucess());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function setPasswordEntity(data) {
    return (dispatch, getState) => {
        let token = getState().onboardingState.setPasswordState.serviceProviderDetails.token;
        let body = {
            userName: data.username,
            password: encryptPassword(data.password),
            confirmPassword: encryptPassword(data.password),
            isActive: true,
            rowversionId: '',
            salt: '',
            token: token
        };
        dispatch(startLoading());
        Post(API.setPasswordEntityUser, body).then((resp) => {
            dispatch(onboardSucess());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function onboardSucess() {
    return (dispatch) => {
        dispatch(push(Path.onboardSuccess));
    }
};


export function passwordSetSuccess(){
    return{
        type: SetPassword.serviceProviderOnboardSucess
    }
};


export function onCancelClick(){
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(verifyContactClear());
        dispatch(push(Path.root));
    }
}
    