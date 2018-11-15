import {
    QuestionsList
} from './actions'

const defaultState = {
    QuestionsList: {},
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

        default:
            return state;
    }
}

export default FeedbackState;
