import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const PerformTasks = {
    getPerformTasksListSuccess: 'get_perform_tasks_list_success/performtasks',
    getServiceRequestVisitId: 'get_service_request_visitId/performtasks',
    saveStartedTime: 'save_started_time/performtasks',
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
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

export function getPerformTasksList(data) {
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))
        dispatch(startLoading());
        // axios.get(baseURLServiceRequest + API.getServiceRequestPerformTasks + data).then((resp) => {
        axios.get(baseURLServiceRequest + API.getServiceRequestPerformTasks + '4').then((resp) => {
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
        axios.put(baseURLServiceRequest + API.savePerformedTask + data.serviceRequestVisitId, '4').then((resp) => {
            dispatch(push(Path.feedback))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
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
        axios.put(baseURLServiceRequest + API.startOrStopService + visitId + '/' + data).then((resp) => {
            dispatch(saveStartedTime(startedTime))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};




