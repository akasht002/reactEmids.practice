import {
    VerifyContact
} from './actions'

const defaultState = {
    loading: false,
    isPasscodeSent: false,
    isPasscodeNotMatch: false,
    isPasscodeMatch: false,
    isOnboardSucess: false,
    isVerifiedPasscode: false,
    serviceProviderDetails: {
        serviceProviderId: '',
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: '',
        passcode: ''
    },
};

const verifyContactState = (state = defaultState, action) => {
    switch (action.type) {
        case VerifyContact.onSetUserDetailsCompletion:
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
        case VerifyContact.loadingStart:
            return {
                ...state,
                loading: true
            };

        case VerifyContact.loadingEnd:
            return {
                ...state,
                loading: false
            };

        case VerifyContact.passcodeSentSuccess:
            return {
                ...state,
                isPasscodeSent: true
            }


        case VerifyContact.setUserId:
            return {
                ...state,
                userEmail: action.data.emailId
            }

        case VerifyContact.setPasscodeMatch:
            return {
                ...state,
                isPasscodeMatch: action.isSuccess
            }

        case VerifyContact.setPasscodeNotMatch:
            return {
                ...state,
                isPasscodeNotMatch: action.isSuccess
            }

        case VerifyContact.passcodeVerifySuccess:
            return {
                ...state,
                isVerifiedPasscode: true
            }

        case VerifyContact.cancelClick:
            return defaultState;

        case VerifyContact.clearState:
            return defaultState;

        default:
            return state;
    }
}

export default verifyContactState;
