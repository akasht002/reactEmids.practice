import { SecurityQuestion } from './bridge';

const defaultState = {
    securityQuestion: '',
    stateToken: '',
    errorMessage: ''
};

export const securityQuestionState = (state = defaultState, action) => {
    switch (action.type) {
        case SecurityQuestion.getSecurityQuestionSuccess:
            return {
                ...state,
                securityQuestion: action.data
            };
        case SecurityQuestion.validateSecurityAnswerSuccess:
            return {
                ...state,
                stateToken: action.data
            };
        case SecurityQuestion.validateSecurityAnswerFail:
            return {
                ...state,
                errorMessage: action.data
            };
            case SecurityQuestion.formDirty:
            return {
                ...state,
                errorMessage: ''
            };
        default:
            return state;
    }
}

export default securityQuestionState;