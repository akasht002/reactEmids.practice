import {
    Onboarding
} from './actions'

const defaultState = {
    loading: false,
    isEmailExist: false,
    isEmailNotExist: false,
    userEmail: '',
    serviceProviderDetails: {
        serviceProviderId: '',
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: '',
        passcode: ''
    },
    isPasscodeSent: false,
    isPasscodeCorrect: false,
    isOnboardSucess: false
};

const onboardingState = (state = defaultState, action) => {
    switch (action.type) {
        case Onboarding.onSetUserDetailsCompletion:
            return {
                ...state,
                userEmail: action.data.emailId,
                isEmailExist: true,
                isEmailNotExist: false,
                serviceProviderDetails: {
                    ...state.serviceProviderDetails,
                    serviceProviderId: action.data.serviceProviderId,
                    memberId: action.data.memberId,
                    emailId: action.data.serviceProviderEmailId,
                    fullName: action.data.firstName + ' ' + action.data.lastName,
                    mobileNumber: action.data.mobileNumber,
                    passcode: action.data.tempPassword
                }
            };
        case Onboarding.loadingStart:
            return {
                ...state,
                loading: true
            };

        case Onboarding.loadingEnd:
            return {
                ...state,
                loading: false
            };
        case Onboarding.userEmailNotExist:
            return {
                ...state,
                isEmailExist: false,
                isEmailNotExist: true
            }

        case Onboarding.passcodeSentSuccess:
            return {
                ...state,
                isPasscodeSent: true
            }


        case Onboarding.setUserId:
            return {
                ...state,
                userEmail: action.data.emailId
            }

        case Onboarding.setTemporaryPasscode:
            return {
                ...state,
                isPasscodeCorrect: action.isSuccess
            }

        case Onboarding.serviceProviderOnboardSucess:
            return {
                ...state,
                isOnboardSucess: true
            }
        case Onboarding.clearOnboardingState:
            return defaultState;
        default:
            return state;
    }
}

export default onboardingState;
