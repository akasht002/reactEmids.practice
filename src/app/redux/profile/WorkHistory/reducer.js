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
        workHistoryId:''
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
                    workHistoryId:''
                    
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
