import {
    VisitServiceList
} from './actions'

const defaultState = {
    visitServiceList: [],
};

const VisitServiceListState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceList.getVisitServiceListSuccess:
            return {
                ...state,
                visitServiceList: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceListState;
