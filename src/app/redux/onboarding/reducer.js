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
    isLinkSent: false,
    userEmail: ''
};

const onboardingState = (state = defaultState, action) => {
    switch (action.type) {
        case Onboarding.sendVerificationLink:
            return {
                ...state,
                isLinkSent: action.isSuccess
            };








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
        case Onboarding.onSetUserIdCompletion:
            return {
                ...state,
                userEmail: action.data.emailId
            };
        case Onboarding.clearOnboardingState:
            return defaultState;
        default:
            return state;
    }
}

export default onboardingState;
