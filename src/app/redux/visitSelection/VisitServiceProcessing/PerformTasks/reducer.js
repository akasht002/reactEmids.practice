import {
    PerformTasks
} from './actions'

const defaultState = {
    PerformTasksList: {},
};

const PerformTasksState = (state = defaultState, action) => {
    switch (action.type) {

        case PerformTasks.getPerformTasksListSuccess:
            return {
                ...state,
                PerformTasksList: action.data
            };

        default:
            return state;
    }
}

export default PerformTasksState;
