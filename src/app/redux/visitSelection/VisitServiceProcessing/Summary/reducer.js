import {
    SummaryDetails
} from './actions'

const defaultState = {
    SummaryDetails: {},
};

const SummaryState = (state = defaultState, action) => {
    switch (action.type) {

        case SummaryDetails.getSummaryDetailsSuccess:
            return {
                ...state,
                SummaryDetails: action.data
            };

        default:
            return state;
    }
}

export default SummaryState;
