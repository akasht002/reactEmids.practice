import {
    PerformTasks
} from './actions'

const defaultState = {
    PerformTasksList: {},
    ServiceRequestVisitId: ''
};

const PerformTasksState = (state = defaultState, action) => {
    switch (action.type) {

        case PerformTasks.getPerformTasksListSuccess:
            return {
                ...state,
                PerformTasksList: action.data
            };

            case PerformTasks.getServiceRequestVisitId:
            return {
                ...state,
                ServiceRequestVisitId: action.data
            };

        default:
            return state;
    }
}

export default PerformTasksState;
