import { QuestionsList } from './bridge'

const defaultState = {
    questionsList: {},
    isLoading: false
};

const AssessmentState = (state = defaultState, action) => {
    switch (action.type) {

        case QuestionsList.getQuestionsListSuccess:
            return {
                ...state,
                questionsList: action.data
            };

        case QuestionsList.formDirtyFeedback:
            return {
                ...state,
                questionsList: {}
            };

        case QuestionsList.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case QuestionsList.endLoading:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}

export default AssessmentState;
