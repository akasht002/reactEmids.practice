import {
    QuestionsList
} from './actions'

const defaultState = {
    QuestionsList: {},
    isLoading: false
};

const FeedbackState = (state = defaultState, action) => {
    switch (action.type) {

        case QuestionsList.getQuestionsListSuccess:
            return {
                ...state,
                QuestionsList: action.data
            };

        case QuestionsList.formDirtyFeedback:
            return {
                ...state,
                QuestionsList: {}
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

export default FeedbackState;
