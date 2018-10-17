import {
    PerformTasks
} from './actions'
import {SERVICE_STATES} from '../../../../constants/constants'

const defaultState = {
    PerformTasksList: {},
    ServiceRequestVisitId: '',
    startedTime: '',
    SummaryDetails: ''
};

const PerformTasksState = (state = defaultState, action) => {
    switch (action.type) {

        case PerformTasks.getPerformTasksListSuccess:
        let visitStatus = SERVICE_STATES.YET_TO_START
            if(action.data.visitStatusId === 44){
                visitStatus = SERVICE_STATES.IN_PROGRESS
            }else if(action.data.visitStatusId === 45){
                visitStatus = SERVICE_STATES.COMPLETED
            }else if(action.data.visitStatusId === 90){
                visitStatus = SERVICE_STATES.PAYMENT_PENDING
            }
            return {
                ...state,
                PerformTasksList: {...action.data, visitStatus},
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
