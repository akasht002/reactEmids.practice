import {
    VisitServiceList
} from './actions'

const defaultState = {
    visitServiceList: [],
    serviceRequestCount: 0,
    status: 0
};

const VisitServiceListState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceList.getVisitServiceListSuccess:
            return {
                ...state,
                visitServiceList: action.data
            };
            case VisitServiceList.serviceRequestCount:
            return {
                ...state,
                serviceRequestCount: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceListState;
