import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const PerformTasks = {
    getPerformTasksListSuccess: 'get_perform_tasks_list_success/performtasks',
    getServiceRequestVisitId: 'get_service_request_visitId/performtasks'
};

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

export function getPerformTasksList(data) {
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestPerformTasks + data).then((resp) => {
            dispatch(getPerformTasksListSuccess(resp.data))
            dispatch(push(Path.performTasks))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addPerformedTask(data) {
    console.log(data)
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(API.savePerformedTask + data.serviceRequestVisitId, data).then((resp) => {
            dispatch(push(Path.feedback))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
            dispatch(push(Path.feedback))
        })
    }
};

export function startOrStopService(data, visitId) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(API.startOrStopService + visitId + "/" + data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




