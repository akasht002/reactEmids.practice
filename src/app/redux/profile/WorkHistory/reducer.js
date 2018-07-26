import {
    WorkHistory
} from './actions'

const defaultState = {
    workhistoryList:[]
};

const WorkHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case WorkHistory.getEducationSuccess:
            return {
                ...state,
                workhistoryList: action.data
            };
        default:
        return state;
    }
}

export default WorkHistoryState;
