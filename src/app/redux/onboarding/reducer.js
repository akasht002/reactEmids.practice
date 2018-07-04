import {
    Onboarding
} from './actions'

const defaultState = {
    loading: false,
    error: {
        message: '',
        code: ''
    },
    isDirty: false,
    isEmailExist: false,
    isEmailNotExist: false,
    userEmail: '',
    serviceProviderDetails: {
        memberId: '',
        emailId: '',
        fullName: '',
        mobileNumber: ''
    }
};

const onboardingState = (state = defaultState, action) => {
    switch (action.type) {
        case Onboarding.onSetUserIdCompletion:
            return {
                ...state,
                userEmail: action.data.emailId,
                isEmailExist: true,
                isEmailNotExist: false,
                serviceProviderDetails: {
                    ...state.serviceProviderDetails,
                    memberId: action.data.memberId,
                    emailId: action.data.emailId,
                    fullName: action.data.firstName + ' ' + action.data.lastName,
                    mobileNumber: action.data.mobileNumber
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
        return{
            ...state,
            isEmailExist: false,
            isEmailNotExist: true
        }

        case Onboarding.selectProfileType:
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    profileType: action.name
                }
            };

        case Onboarding.selectPlan:
            return {
                ...state,
                loading: false
            };

        case Onboarding.searchPatient:
            return {
                ...state,
                patientProfiles: action.data,
            };
        case Onboarding.selectPatientProfile:
            return {
                ...state,
                error: {
                    message: '',
                    code: ''
                }
            };

        case Onboarding.getPlans:
            return {
                ...state,
                plans: action.data
            };
        case Onboarding.onMemberDetailsCompletion:
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    planId: action.data.planId,
                    patientProfileId: action.data.memberId,
                    patientName: action.data.patientName
                }
            };
        case Onboarding.onProfileTypeCompletion:
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    profileType: action.data.profileType
                }
            };
        case Onboarding.clearOnboardingState:
            return defaultState;
        default:
            return state;
    }
}

export default onboardingState;
