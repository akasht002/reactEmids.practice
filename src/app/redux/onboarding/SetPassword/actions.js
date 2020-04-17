import { API } from '../../../services/api';
import { Post, ThirdPartyGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { clearState as verifyContactClear } from '../VerifyUserID/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import { encryptPassword } from '../../../utils/encryptPassword';
import { USERTYPES } from '../../../constants/constants';
import { SetPassword } from './bridge';
import { logError } from '../../../utils/logError';
import { caseInsensitiveComparer } from '../../../utils/comparerUtility';

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

// Let it be till all EU/ESP onboarding completes

// export function setPassword(data) {
//     return (dispatch, getState) => {
//         let userDetails = getState().onboardingState.verifyUserIDState.serviceProviderDetails
//         let payload = {
//             "firstName": userDetails.firstName,
//             "lastName": userDetails.lastName,
//             "userName": userDetails.emailId,
//             "password": data.password,
//         }

//         let userType = getState().onboardingState.setPasswordState.serviceProviderDetails.userType;
//         if (userType === USERTYPES.ENTITY_USER) {
//             dispatch(setPasswordEntity(data))
//         } else {
//             dispatch(setPasswordIndividual(payload))
//         }
//     }
// };

export const setPassword = (data) => async (dispatch, getState) => {
    dispatch(startLoading());

    let userType = getState().onboardingState.setPasswordState.serviceProviderDetails.userType;

    let isEntityUser = caseInsensitiveComparer(userType, USERTYPES.ENTITY_USER);

    let userDetails = isEntityUser ? getState().onboardingState.setPasswordState.serviceProviderDetails : getState().onboardingState.verifyUserIDState.serviceProviderDetails;

    let URL = isEntityUser ? API.setPasswordEntityUser : API.setPassword;

    let payload =
    {
        "userName": userDetails.emailId,
        "password": data.password,
        "confirmPassword": data.password,
        "isActive": true,
        "question": data.selectedQuestionName,
        "answer": data.securityAnswer,
        "serviceProviderId": userDetails.serviceProviderId,
        "firstName": userDetails.firstName,
        "lastName": userDetails.lastName,
        "phoneNumber": userDetails.mobileNumber
    }

    try {
        let resp = await Post(URL, payload)
        resp && dispatch(onboardSucess());
        dispatch(endLoading());
    } catch (error) {
        dispatch(endLoading());
        logError(error)
    }
};

export function setPasswordIndividual(data) {
    return (dispatch) => {
        dispatch(startLoading());
        return Post(API.setPassword, data).then((resp) => {
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
        return Post(API.setPasswordEntityUser, body).then((resp) => {
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


export function passwordSetSuccess() {
    return {
        type: SetPassword.serviceProviderOnboardSucess
    }
};


export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(verifyContactClear());
        dispatch(push(Path.root));
    }
}

export const getQuestionsSuccess = (data) => {
    return {
        type: SetPassword.getQuestions,
        data
    }
}

export const getQuestions = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const resp = await ThirdPartyGet(`${API.getSecurityQuestionList}`)
        dispatch(getQuestionsSuccess(resp.data))
    } catch (error) {
        logError(error)
    } finally {
        dispatch(endLoading());
    }
}

