import {
    PerformTasks
} from './actions'

const defaultState = {
    PerformTasksList: {},
    ServiceRequestVisitId: '',
    startedTime: '',
    SummaryDetails: ''
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

        case PerformTasks.saveStartedTime:
            return {
                ...state,
                startedTime: action.data
            };

        case PerformTasks.getSummaryDetailsSuccess:
            return {
                ...state,
                SummaryDetails: action.data
            };

        default:
            return state;
    }
}

export default PerformTasksState;
