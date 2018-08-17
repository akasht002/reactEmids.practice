import axios from 'axios';
import { API, baseURL } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';

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
    return (dispatch, getState) => {
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
            console.log('Success' + resp.data);
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



