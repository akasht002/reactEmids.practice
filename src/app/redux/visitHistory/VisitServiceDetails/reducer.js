import {
    vistServiceHistoryDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceHistory: []
};

const vistServiceHistoryState = (state = defaultState, action) => {
    switch (action.type) {

        case vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess:
            return {
                ...state,
                VisitServiceHistory: action.data
            };
        default:
            return state;
    }
}

export default vistServiceHistoryState;
