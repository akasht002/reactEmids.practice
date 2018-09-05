import {
    vistServiceHistoryDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceHistory: []
};

const vistServiceHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case vistServiceHistoryDetails.getVisitServiceHistoryListSuccess:
            return {
                ...state,
                VisitServiceHistory: action.data
            };
            case vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };
        default:
            return state;
    }
}

export default vistServiceHistoryState;
