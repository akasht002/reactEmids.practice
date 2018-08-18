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

export function getPerformTasksList() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURL + API.getServiceRequestPerformTasks + '3').then((resp) => {
            dispatch(getPerformTasksListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addPerformedTask(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.put(baseURL + API.savePerformedTask + '3', data).then((resp) => {
            dispatch(push(Path.feedback))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function startOrStopService(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.put(baseURL + API.startOrStopService + '3/' + data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




