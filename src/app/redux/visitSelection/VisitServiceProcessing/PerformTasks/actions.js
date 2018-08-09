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
        axios.get('http://www.mocky.io/v2/5b6c49db2f00003700893cb9').then((resp) => {
            dispatch(getPerformTasksListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



