import {SetPassword} from './bridge';

const defaultState = {
    serviceProviderDetails: {
        serviceProviderId: '',
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: '',
        passcode: '',
        token: '',
        userType: '',
        securityQuestion:null
    },
};

const setPasswordState = (state = defaultState, action) => {
    switch (action.type) {
        case SetPassword.onSetUserDetailsCompletion:
            return {
                ...state,
                userEmail: action.data.emailId,
                serviceProviderDetails: {
                    ...state.serviceProviderDetails,
                    serviceProviderId: action.data.serviceProviderId,
                    memberId: action.data.memberId,
                    emailId: action.data.serviceProviderEmailId,
                    fullName: action.data.firstName + ' ' + action.data.lastName,
                    mobileNumber: action.data.mobileNumber,
                    passcode: action.data.tempPassword,
                    token: action.data.token,
                    userType: action.data.userType
                }
            };

        case SetPassword.cancelClick:
            return defaultState;

        case SetPassword.clearState:
            return defaultState;

        case SetPassword.clearOnboardingState:
            return defaultState;

        case SetPassword.getQuestions:
            return {
                ...state,
                securityQuestion: action.data
            }

        default:
            return state;
    }
}

export default setPasswordState;
