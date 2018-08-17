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

        default:
            return state;
    }
}

export default FeedbackState;
