import {
    WorkHistory
} from './actions'

const defaultState = {
    workhistoryList:[],
    addeworkhistorySuccess: false,
    workhistoyFieldDetails: {
        designation: '',
        company: '',
        location: '',
        fromDate: '',
        toDate: '',
        description:'',
        isWorking:false,
        workHistoryId:'',
        currentlyWorking: false
    }
};

const WorkHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case WorkHistory.getWorkhistorySuccess:
            return {
                ...state,
                workhistoryList: action.data
            };

        case WorkHistory.addWorkhistorySuccess:
            return {
                ...state,
                addeworkhistorySuccess: action.isSuccess,
                workhistoyFieldDetails: {
                    designation: '',
                    company: '',
                    location: '',
                    fromDate: '',
                    toDate: '',
                    description:'',
                    isWorking:false,
                    workHistoryId:'',
                    currentlyWorking: false
                }
            };

        case WorkHistory.getWorkhistoryFieldDetails:
            return {
                ...state,
                workhistoyFieldDetails: action.data
            };

        default:
        return state;
    }
}

export default WorkHistoryState;
