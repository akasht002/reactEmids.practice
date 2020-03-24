import { API, baseURLServiceRequest } from '../../../services/api';
import { ServiceRequestGet, Get, ServiceRequestPost } from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import {getUpdatedPerformTasksList} from '../../visitSelection/VisitServiceProcessing/PerformTasks/actions'
import _ from 'lodash';
import { isEntityUser } from '../../../utils/userUtility';
import { logError } from '../../../utils/logError';
import { vistServiceHistoryDetails } from './bridge';

export const visitHistoryLoading = (data) => {
    return {
        type: vistServiceHistoryDetails.visitHistoryLoading,
        data
    }
}

export const getVisitServiceHistoryDetailsSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess,
        data
    }
}

export const getSubmittedResponse = (data) => {
    return {
        type: vistServiceHistoryDetails.getSubmittedResponse,
        data
    }
}

export const updateVisitHistoryFilterState = (data) => {
    return {
        type: vistServiceHistoryDetails.updateVisitHistoryFilter,
        data
    }
}

export const getServiceCategorySuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getServiceCategorySuccess,
        data
    }
}

export const getServiceProviders = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: vistServiceHistoryDetails.getAllServiceProviders,
        data
    }
}

export const getVisitServiceHistoryByIdDetailSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess,
        data : getUpdatedPerformTasksList(data)
    }
}


export const getVisitServiceHistoryListSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryListSuccess,
        data
    }
}

export const getHistoryListCountSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getHistoryListCountSuccess,
        data
    }
}

export const getVisitFeedBackSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitFeedBack,
        data
    }
}

export const formDirty = () => {
    return {
        type: vistServiceHistoryDetails.formDirty,
    }
}

export const clearVisitServiceHistoryByIdDetail = () =>{
    return (dispatch) => {
    dispatch(getVisitServiceHistoryByIdDetailSuccess([]))
    }
}

export function getVisitServiceLists(data) {
    return (dispatch) => {
        dispatch(visitHistoryLoading(true));
        let serviceProviderId = getUserInfo().serviceProviderId;
        return ServiceRequestGet(API.getVisitHistoryList + serviceProviderId + '/' + data.pageNumber + '/' + data.pageSize + '/' + data.sortOrder + '/' + data.sortName).then((resp) => {
            dispatch(getVisitServiceHistoryListSuccess(resp.data))
            dispatch(visitHistoryLoading(false));
        }).catch((err) => {
            dispatch(visitHistoryLoading(false));
        })
    }
};

export function getVisitServiceListSort(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
        return ServiceRequestGet(API.getSortedVisitHistory + serviceProviderId + '/' + data.sortByOrder + '/' + data.sortByColumn).then((resp) => {
            dispatch(getVisitServiceHistoryListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const getServiceRequestId = (data) => {
    return {
        type: vistServiceHistoryDetails.getServiceRequestId,
        data
    }
}

export function getVisitServiceHistoryByIdDetail(data) {
    return (dispatch) => {
        dispatch(getServiceRequestId(data))
        dispatch(visitHistoryLoading(true));
        let getServiceVisitsHistoryById = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getSummaryDetailsForEsp : API.getServiceVisitsHistoryById
        ServiceRequestGet(getServiceVisitsHistoryById + data).then((resp) => {
            dispatch(getVisitServiceHistoryByIdDetailSuccess(resp.data))
            resp.data && dispatch(push(Path.visitSummaryDetail))
            dispatch(visitHistoryLoading(false));
        }).catch((err) => {
            dispatch(visitHistoryLoading(false));
        })
    }
};

export function getFilteredData(data) {
    return (dispatch) => {
        dispatch(visitHistoryLoading(true));
        let serviceProviderId = getUserInfo().serviceProviderId;
        return ServiceRequestPost(API.getFilteredVisitHistory, { ...data, serviceProviderId }).then((resp) => {
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data))
            dispatch(visitHistoryLoading(false));
        }).catch((err) => {
            dispatch(visitHistoryLoading(false));
        })
    }
}

export function getSort(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
        let url = serviceProviderId + "/" + data.sortByOrder + "/" + data.sortByColumn + "?fromDate=" + data.fromDate + "&toDate=" + data.toDate
        return Get(API.getSortedVisitHistory + url, baseURLServiceRequest).then((resp) => {
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getServiceProviderRating(data) {
    return (dispatch, getState) => {
        let {isServiceProviderFeedbackTab} = getState().dashboardState.VisitServiceProviderState
        let getRatingAndFeedback = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? 
        (isServiceProviderFeedbackTab ? API.getVisitFeedbackForEntity : API.getPlanVisitFeedBack) : API.getRatingAndFeedback
        dispatch(startLoading())
        ServiceRequestGet(getRatingAndFeedback + data).then((resp) => {
            dispatch(getSubmittedResponse(resp.data))
            dispatch(endLoading)
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getAllServiceProviders() {
    return (dispatch, getState) => {
        //dispatch(startLoading())
        return ServiceRequestGet(API.getAllServiceProviders).then((resp) => {
            dispatch(getServiceProviders(resp.data))
            //dispatch(endLoading())
        }).catch((err) => {
           // dispatch(endLoading());
        })
    }
}

export function getServiceCategory() {
    return (dispatch, getState) => {
       // dispatch(startLoading());
       return ServiceRequestGet(API.getServiceCategory).then((resp) => {
            dispatch(getServiceCategorySuccess(resp.data));
            //dispatch(endLoading());
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
}

export const getServiceTypeSuccess = (data, filterApplied) => {
    !filterApplied && _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: vistServiceHistoryDetails.getServiceTypeSuccess,
        data
    }
}

export function getServiceType(data) {
    return (dispatch, getState) => {
        let serviceCategoryId = data;
        let {filterApplied} = getState().dashboardState.VisitServiceRequestState
        ServiceRequestGet(API.servicerequest + `ServiceType/${serviceCategoryId}`).then((resp) => {
            let data = resp.data.map((type, index) => {
                if (index === 0) {
                    return {
                        ...type,
                        selected: true
                    }
                }
                return type;
            });
            dispatch(getServiceTypeSuccess(data, filterApplied))
        }).catch((err) => {
            logError(err)
        })
    }
}

export const clearServiceProviders = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: vistServiceHistoryDetails.clearServiceProviders,
        data
    }
}
export const clearPatientForServiceProviders = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: vistServiceHistoryDetails.clearPatientForServiceProviders,
        data
    }
}
export function clearServiceTypes() {
    return {
        type: vistServiceHistoryDetails.clearServiceTypes
    }
}

export function getHistoryListCount() {
    return (dispatch, getState) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        //dispatch(startLoading());
        return ServiceRequestGet(API.getHistoryListCount + serviceProviderId).then((resp) => {
            dispatch(getHistoryListCountSuccess(resp.data));
            //dispatch(endLoading());
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
}

export function getVisitFeedBack(data) {
    return (dispatch, getState) => {
        let {isServiceProviderFeedbackTab} = getState().dashboardState.VisitServiceProviderState
        let getVisitFeedback = (getUserInfo().isEntityServiceProvider || isEntityUser())? 
        (isServiceProviderFeedbackTab ? API.getVisitFeedbackForEntity : API.getPlanVisitFeedBack) : API.getVisitFeedback
        dispatch(startLoading());
        ServiceRequestGet(getVisitFeedback + data).then((resp) => {
            dispatch(getVisitFeedBackSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};
export function getAllPatientForServiceProviders(data) {
  
    let serviceProviderId = getUserInfo().serviceProviderId;
    return (dispatch, getState) => {
        //dispatch(startLoading())
        return ServiceRequestGet(API.getAllPatientForServiceProviders + serviceProviderId).then((resp) => {
            dispatch(getAllPatientForServiceProvidersSuccess(resp.data))
          //  dispatch(endLoading())
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
}
export const getAllPatientForServiceProvidersSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getAllPatientForServiceProviders,
        data
    }
}

export const getAssessmentQuestionsListSuccess = data => {
    return {
        type: vistServiceHistoryDetails.getAssessmentQuestionsListSuccess,
        data
    }
}

export function getAssessmentQuestionsList(data) {
    return dispatch => {
      dispatch(startLoading())
      return ServiceRequestGet(API.getAssessmentQuestionsByEntityServiceProviderId + `${data.serviceProviderId}/${data.visitId}`)
        .then(resp => {
          dispatch(getAssessmentQuestionsListSuccess(resp.data));
          dispatch(endLoading())
        })
        .catch(err => {
          dispatch(endLoading())
        })
    }
  }

export const getUserFeedbackInfo = data => async (dispatch, getState) => {
    try {
        const resp = await ServiceRequestGet(`${API.getUserFeedbackInfo}${data.visitId}/${true}`)
        dispatch(getUserFeedbackInfoSuccess(resp.data))
        dispatch(endLoading());
    } catch (error) {
        dispatch(endLoading());
        logError(error)
    }
};  

export const getUserFeedbackInfoSuccess = data => {
    return {
        type: vistServiceHistoryDetails.getUserFeedbackInfoSuccess,
        data
    }
}