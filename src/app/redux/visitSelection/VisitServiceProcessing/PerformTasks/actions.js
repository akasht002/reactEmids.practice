import axios from 'axios';
import { API, baseURL } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const PerformTasks = {
    getPerformTasksListSuccess: 'get_perform_tasks_list_success/performtasks',
};

export const getPerformTasksListSuccess = (data) => {
    return {
        type: PerformTasks.getPerformTasksListSuccess,
        data
    }
}

export function getPerformTasksList(data) {
    return (dispatch) => {
        dispatch(startLoading());
        // axios.get(baseURL + API.getServiceRequestPerformTasks + data).then((resp) => {
        axios.get(baseURL + API.getServiceRequestPerformTasks + '3').then((resp) => {
            dispatch(getPerformTasksListSuccess(resp.data))
            dispatch(push(Path.performTasks))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addPerformedTask(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.put(baseURL + API.savePerformedTask + data.serviceRequestVisitId, data).then((resp) => {
            dispatch(push(Path.feedback))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function startOrStopService(data, visitId) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.put(baseURL + API.startOrStopService + visitId / + data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




