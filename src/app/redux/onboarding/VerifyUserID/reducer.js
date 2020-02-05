import {VerifyUserID} from './bridge';

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
        passcode: '',
        lastName: '',
        firstName: ''
    },
};

const verifyUserIDState = (state = defaultState, action) => {
    switch (action.type) {
        case VerifyUserID.onSetUserDetailsCompletion:
            return {
                ...state,
                userEmail: action.data.emailId,
                isEmailExist: true,
                serviceProviderDetails: {
                    ...state.serviceProviderDetails,
                    serviceProviderId: action.data.serviceProviderId,
                    memberId: action.data.memberId,
                    emailId: action.data.serviceProviderEmailId,
                    fullName: action.data.firstName + ' ' + action.data.lastName,
                    mobileNumber: action.data.mobileNumber,
                    passcode: action.data.tempPassword,
                    lastName: action.data.lastName,
                    firstName: action.data.firstName
                }
            };

        case VerifyUserID.setIsAlreadyOnboarded:
            return {
                ...state,
                setIsAlreadyOnboarded: action.isExist
            }

        case VerifyUserID.userEmailExist:
            return {
                ...state,
                isEmailExist: action.isExistMsge,
            }

        case VerifyUserID.userEmailNotExist:
            return {
                ...state,
                isEmailNotExist: action.isExist,
            }

        case VerifyUserID.setUserId:
            return {
                ...state,
                userEmail: action.data.emailId
            }

        case VerifyUserID.formDirty:
            return {
                ...state,
                isEmailExist: false,
                isEmailNotExist: false,
                setIsAlreadyOnboarded: false,
            };

        case VerifyUserID.cancelClick:
            return defaultState;

        case VerifyUserID.clearState:
            return defaultState;

        default:
            return state;
    }
}

export default verifyUserIDState;
