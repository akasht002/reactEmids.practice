import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../../services/api';
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
        // axios.get(baseURLServiceRequest + API.getServiceRequestPerformTasks + data).then((resp) => {
        axios.get(baseURLServiceRequest + API.getServiceRequestPerformTasks + '3').then((resp) => {
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
        // axios.put(baseURLServiceRequest + API.savePerformedTask + data.serviceRequestVisitId, data).then((resp) => {
        axios.put(baseURLServiceRequest + API.savePerformedTask + '3', data).then((resp) => {
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
        //axios.put(baseURLServiceRequest + API.startOrStopService + visitId/ + data).then((resp) => {
        axios.put(baseURLServiceRequest + API.startOrStopService + '3/' + data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




