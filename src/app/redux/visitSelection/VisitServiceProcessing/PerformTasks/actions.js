import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const PerformTasks = {
    getPerformTasksListSuccess: 'get_perform_tasks_list_success/performtasks',
    getServiceRequestVisitId: 'get_service_request_visitId/performtasks',
    saveStartedTime: 'save_started_time/performtasks',
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
    getVisitStatus: 'getVisitStatus/performtasks',
    formDirtyPerformTask: 'formDirtyPerformTask/performtasks'
};

export const formDirtyPerformTask = () => {
    return {
        type: PerformTasks.formDirtyPerformTask,
    }
}

export const getPerformTasksListSuccess = (data) => {
    return {
        type: PerformTasks.getPerformTasksListSuccess,
        data
    }
}

export const getServiceRequestVisitId = (data) => {
    return {
        type: PerformTasks.getServiceRequestVisitId,
        data
    }
}

export const getSummaryDetailsSuccess = (data) => {
    return {
        type: PerformTasks.getSummaryDetailsSuccess,
        data
    }
}

export const saveStartedTime = (data) => {
    return {
        type: PerformTasks.saveStartedTime,
        data
    }
}

export const getVisitStatus = (data) => {
    return {
        type: PerformTasks.getVisitStatus,
        data
    }
}

export function getPerformTasksList(data, startOrStop) {
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestPerformTasks + data).then((resp) => {
            if (startOrStop === false) {
                dispatch(getVisitStatus(resp.data))
            }
            else {
                dispatch(getPerformTasksListSuccess(resp.data))
                dispatch(push(Path.performTasks))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getServiceVisitId(data, startOrStop) {
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestPerformTasks + data).then((resp) => {
            if (startOrStop === false) {
                dispatch(getVisitStatus(resp.data))
            }
            else {
                dispatch(getPerformTasksListSuccess(resp.data))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addPerformedTask(data, startServiceAction) {
    return (dispatch) => {
        //dispatch(startLoading());
        ServiceRequestPut(API.savePerformedTask + data.serviceRequestVisitId, data).then((resp) => {
            if (startServiceAction === 1 || startServiceAction === undefined) {
                dispatch(push(Path.feedback))
                //dispatch(endLoading());
            }
            //dispatch(push(Path.feedback))
            //dispatch(endLoading());
        }).catch((err) => {
           // dispatch(endLoading());
            dispatch(push(Path.feedback))
        })
    }
};

export function startOrStopService(data, visitId, startedTime) {
    return (dispatch) => {
        if (data === 0) {
            dispatch(getSummaryDetails(visitId));
        }
        dispatch(startLoading());
        ServiceRequestPut(API.startOrStopService + visitId + '/' + data).then((resp) => {
            dispatch(saveStartedTime(startedTime))
            dispatch(getPerformTasksList(visitId, false));
            dispatch(getSummaryDetails(visitId));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




