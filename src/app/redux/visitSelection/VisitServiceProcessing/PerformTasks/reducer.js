import {PerformTasks} from './bridge'
import { SERVICE_STATES } from '../../../../constants/constants'
import { getServiceTasks } from './actions'
const defaultState = {
    PerformTasksList: {},
    ServiceRequestVisitId: '',
    startedTime: '',
    SummaryDetails: '',
    visitStatus: '',
    isLoading: false
};

const PerformTasksState = (state = defaultState, action) => {
    switch (action.type) {

        case PerformTasks.getPerformTasksListSuccess:
            let visitStatus = SERVICE_STATES.YET_TO_START
            if (action.data.visitStatusId === 44) {
                visitStatus = SERVICE_STATES.IN_PROGRESS
            } else if (action.data.visitStatusId === 45) {
                visitStatus = SERVICE_STATES.COMPLETED
            } else if (action.data.visitStatusId === 90) {
                visitStatus = SERVICE_STATES.PAYMENT_PENDING
            }
            return {
                ...state,
                PerformTasksList: { ...action.data, visitStatus,
                    serviceRequestTypeVisits: getServiceTasks(action.data && action.data.serviceTypes),
                    serviceRequestVisitId: action.data && action.data.servicePlanVisitId,
                    visitTimeDuration: parseInt(action.data && action.data.visitTimeDuration, 10)
                },
            };

        case PerformTasks.getVisitStatus:
            let visitStatuses = SERVICE_STATES.YET_TO_START
            if (action.data.visitStatusId === 44) {
                visitStatuses = SERVICE_STATES.IN_PROGRESS
            } else if (action.data.visitStatusId === 45) {
                visitStatuses = SERVICE_STATES.COMPLETED
            } else if (action.data.visitStatusId === 90) {
                visitStatuses = SERVICE_STATES.PAYMENT_PENDING
            }
            return {
                ...state,
                PerformTasksList: {
                    ...state.PerformTasksList,
                    visitStatus: visitStatuses,
                    visitStartTime: action.data.visitStartTime,
                    visitEndTime: action.data.visitEndTime
                }
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

        case PerformTasks.formDirtyPerformTask:
            return {
                ...state,
                PerformTasksList: {}
            };

        case PerformTasks.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case PerformTasks.endLoading:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}

export default PerformTasksState;
