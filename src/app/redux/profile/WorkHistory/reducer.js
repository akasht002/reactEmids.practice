import {
    WorkHistory
} from './actions'

const defaultState = {
    workhistoryList:[],
    addeworkhistorySuccess: false
};

const WorkHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case WorkHistory.getEducationSuccess:
            return {
                ...state,
                workhistoryList: action.data
            };

        case WorkHistory.addeworkhistorySuccess:
            return {
                ...state,
                addeworkhistorySuccess: action.isSuccess
            };
        default:
        return state;
    }
}

export default WorkHistoryState;
