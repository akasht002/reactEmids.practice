import {
    OnboardSuccess
} from './actions'

const defaultState = {

};

const onBoardSuccessState = (state = defaultState, action) => {
    switch (action.type) {
        // case SetPassword.onSetUserDetailsCompletion:
        //     return {
        //         ...state,
        //         userEmail: action.data.emailId,
        //         serviceProviderDetails: {
        //             ...state.serviceProviderDetails,
        //             serviceProviderId: action.data.serviceProviderId,
        //             memberId: action.data.memberId,
        //             emailId: action.data.serviceProviderEmailId,
        //             fullName: action.data.firstName + ' ' + action.data.lastName,
        //             mobileNumber: action.data.mobileNumber,
        //             passcode: action.data.tempPassword
        //         }
        //     };

        // case SetPassword.cancelClick:
        //     return defaultState;

        // case SetPassword.clearState:
        //     return defaultState;

        // case SetPassword.clearOnboardingState:
        //     return defaultState;

        default:
            return state;
    }
}

export default onBoardSuccessState;
