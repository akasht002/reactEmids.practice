import {
    VisitServiceDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
};

const VisitServiceDetailsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceDetails.getVisitServiceDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceDetailsState;
