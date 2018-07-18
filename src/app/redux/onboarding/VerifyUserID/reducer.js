import {
    VerifyUserID
} from './actions'

const defaultState = {
    isEmailExist: false,
    isEmailNotExist: false,
    setIsAlreadyOnboarded: false,
    serviceProviderDetails: {
        serviceProviderId: '',
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: '',
        passcode: ''
    },
};

const verifyUserIDState = (state = defaultState, action) => {
    switch (action.type) {
        case VerifyUserID.onSetUserDetailsCompletion:
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

        case VerifyUserID.setIsAlreadyOnboarded:
            return {
                ...state,
                setIsAlreadyOnboarded: action.isExist
            }

        case VerifyUserID.userEmailNotExist:
            return {
                ...state,
                isEmailExist: action.isExistMsge,
                isEmailNotExist: action.isNotExistMsg
            }

        case VerifyUserID.setUserId:
            return {
                ...state,
                userEmail: action.data.emailId
            }

        case VerifyUserID.cancelClick:
            return defaultState;

        case VerifyUserID.clearState:
            return defaultState;
            
        default:
            return state;
    }
}

export default verifyUserIDState;
