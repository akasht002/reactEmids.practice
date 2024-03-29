import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut, getUserInfo } from '../../../../services/http';
import { endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import {PerformTasks} from './bridge'
import { isEntityUser } from '../../../../utils/userUtility';

export const formDirtyPerformTask = () => {
    return {
        type: PerformTasks.formDirtyPerformTask,
    }
}


export const getPerformTasksListSuccess = (data) => {
    return {
        type: PerformTasks.getPerformTasksListSuccess,
        data : getUpdatedPerformTasksList(data)
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
        data : getUpdatedPerformTasksList(data)
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

export function getPerformTasksList(data, startOrStop, goToAssessment = false) {
    let getServiceRequestPerformTasks = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getServiceRequestPerformTasksForEsp : API.getServiceRequestPerformTasks
    return (dispatch) => {
        dispatch(getServiceRequestVisitId(data))       
        ServiceRequestGet(getServiceRequestPerformTasks + data).then((resp) => {
            if (!startOrStop) {
                dispatch(getVisitStatus(resp.data))
            }
            else {
                let path =  goToAssessment ? Path.assessment :Path.performTasks;
                dispatch(getPerformTasksListSuccess(resp.data))
                dispatch(push(path))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getServiceVisitId(data, startOrStop) {
    let getServiceRequestPerformTasks = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getServiceRequestPerformTasksForEsp : API.getServiceRequestPerformTasks
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        dispatch(getServiceRequestVisitId(data))
        ServiceRequestGet(getServiceRequestPerformTasks + data).then((resp) => {
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
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let savePerformedTask = isEntityServiceProvider ? API.savePerformedTaskForEsp : API.savePerformedTask + data.serviceRequestVisitId
    let model = isEntityServiceProvider ? {
        serviceProviderId: data.serviceProviderId,
        servicePlanVisitId: data.serviceRequestVisitId,
        planVistTypeTaskDetailsId: data && data.serviceRequestTypeTaskVisits.map(taskVisitId => {
         return taskVisitId.serviceRequestTypeTaskDetailsId
        })
    } : data
    return (dispatch) => {
        ServiceRequestPut(savePerformedTask, model).then((resp) => {
            if (startServiceAction === 1 || startServiceAction === undefined) {
                dispatch(push(Path.feedback))
            }
        }).catch((err) => {
            dispatch(push(Path.feedback))
        })
    }
};


export function startOrStopService(data, visitId, startedTime) {
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let startOrStopService = isEntityServiceProvider ? API.startOrStopServiceForEsp : API.startOrStopService
    return (dispatch) => {
        let  model = isEntityServiceProvider ? 
        {
            servicePlanVisitId: visitId,
            visitAction: data
        } :
        {
            "serviceRequestVisitId": visitId,
            "visitAction": data
        }
        dispatch(startLoadingProcessing());
        ServiceRequestPut(startOrStopService, model).then((resp) => {
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
    let getSummaryDetails = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getSummaryDetailsForEsp : API.getSummaryDetails
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        ServiceRequestGet(getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};

export const getServiceTasks = (serviceTypes) => {
    return serviceTypes.map(type => {
            return {
                serviceRequestTypeTaskVisitId: type.planVisitTypeDetailsId,
                serviceRequestTypeTaskDetails: type.planVisitTypeDetailsId,
                serviceTypeDescription: type.serviceTypeDescription,
                serviceRequestTypeDetailsId: type.planServiceTypeDetailsId,
                isActive: true,
                serviceRequestTypeTaskVisits: type.serviceTask.map((task, index) => {
                    return {
                        serviceRequestTypeTaskDetailsId: task.planVistTypeTaskDetailsId,
                        serviceRequestTypeDetailsId: type.planVisitTypeDetailsId,
                        serviceTaskDescription: task.serviceTaskDescription,
                        serviceTypeId: type.serviceTypeId,
                        isActive: true,
                        statusId: task.taskStatusId,
                        serviceRequestTypeTaskVisitId: task.planVistTypeTaskDetailsId
                    }
                })
            }
    })
}

export const getUpdatedPerformTasksList = data => {
    let isEntity = getUserInfo().isEntityServiceProvider || isEntityUser()
    return {
        ...data,
        serviceRequestTypeVisits: isEntity ? getServiceTasks(data && data.serviceTypes) 
        : data && data.serviceRequestTypeVisits,
        serviceRequestVisitId: isEntity ? data && data.servicePlanVisitId :
        data && data.serviceRequestVisitId,
        visitTimeDuration: Number(data && data.visitTimeDuration)
    }
}


