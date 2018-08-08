import {
    VisitService
} from './actions'

const defaultState = {
    visitServiceList: [],
};

const VisitServiceState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitService.getVisitServiceListSuccess:
            return {
                ...state,
                visitServiceList: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceState;
