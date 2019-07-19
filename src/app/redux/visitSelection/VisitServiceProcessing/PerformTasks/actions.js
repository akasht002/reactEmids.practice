import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut } from '../../../../services/http';
import { endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import {PerformTasks} from './bridge'

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

export const startLoadingProcessing = () => {
    return {
      type: PerformTasks.startLoading,
    }
  };
  
  export const endLoadingProcessing = () => {
    return {
      type: PerformTasks.endLoading,
    }
};

export function getPerformTasksList(data, startOrStop) {
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))       
        return ServiceRequestGet(API.getServiceRequestPerformTasks + data).then((resp) => {
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
        dispatch(startLoadingProcessing());
        dispatch(getServiceRequestVisitId(data))
        return ServiceRequestGet(API.getServiceRequestPerformTasks + data).then((resp) => {
            if (startOrStop === false) {
                dispatch(getVisitStatus(resp.data))
            }
            else {
                dispatch(getPerformTasksListSuccess(resp.data))
            }
            dispatch(endLoadingProcessing());
        }).catch((err) => {
        })
    }
};

export function addPerformedTask(data, startServiceAction) {
    return (dispatch) => {
        return ServiceRequestPut(API.savePerformedTask + data.serviceRequestVisitId, data).then((resp) => {
            if (startServiceAction === 1 || startServiceAction === undefined) {
                dispatch(push(Path.feedback))
            }
        }).catch((err) => {
            dispatch(push(Path.feedback))
        })
    }
};


export function startOrStopService(data, visitId, startedTime) {
    return (dispatch) => {
        const model = {
            "serviceRequestVisitId": visitId,
            "visitAction": data
        }
        dispatch(startLoadingProcessing());
        return ServiceRequestPut(API.startOrStopService, model).then((resp) => {
            dispatch(saveStartedTime(startedTime))
            dispatch(getPerformTasksList(visitId, false));
            dispatch(getSummaryDetails(visitId));
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};

export function getSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        return ServiceRequestGet(API.getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};




