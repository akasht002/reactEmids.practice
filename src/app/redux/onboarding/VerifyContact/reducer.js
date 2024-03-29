import { VerifyContact } from './bridge'
const defaultState = {
    loading: false,
    isPasscodeSent: false,
    isPasscodeNotMatch: false,
    isPasscodeMatch: false,
    isOnboardSucess: false,
    isVerifiedPasscode: false,
    isPasscodeExpired: false,
    serviceProviderDetails: {
        serviceProviderId: '',
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: '',
        passcode: '',
        token: '',
        userType: ''
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
                    emailId: action.data.emailId,
                    fullName: action.data.firstName + ' ' + action.data.lastName,
                    mobileNumber: action.data.mobileNumber,
                    passcode: action.data.tempPassword,
                    token: action.data.token,
                    userType: action.data.userType,
                    lastName: action.data.lastName,
                    firstName: action.data.firstName
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

        case VerifyContact.formDirty:
            return {
                ...state,
                isPasscodeNotMatch: false,
                isPasscodeExpired: false
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

        case VerifyContact.temporaryPasscodeExpired:
            return {
                ...state,
                isPasscodeExpired: action.isExpired
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
