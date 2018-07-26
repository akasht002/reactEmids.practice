import {
    WorkHistory
} from './actions'

const defaultState = {
    workhistoryList:[],
    addeworkhistorySuccess: false,
    workhistoyFieldDetails: ''
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

        case WorkHistory.workhistoyFieldDetails:
            return {
                ...state,
                workhistoyFieldDetails: action.data
            };

        default:
        return state;
    }
}

export default WorkHistoryState;
