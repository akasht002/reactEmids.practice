import { API, baseURLServiceRequest } from '../../../services/api';
import { ServiceRequestGet, Get, ServiceRequestPost } from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';
import _ from 'lodash';

export const vistServiceHistoryDetails = {
    getVisitServiceHistoryListSuccess: 'getVisitServiceHistoryListSuccess/visitHistory',
    getVisitServiceHistoryDetailsSuccess: 'getVisitServiceHistoryDetailsSuccess/visitHistory',
    getVisitServiceHistoryByIdDetailSuccess: 'getVisitServiceHistoryByIdDetailSuccess/visitHistory',
    updateVisitHistoryFilter: 'updateVisitHistoryFilter/visitHistory',
    getServiceCategorySuccess: "getServiceCategorySuccess/VisitHistory",
    getSubmittedResponse: "getSubmittedResponse/visitHistory",
    getAllServiceProviders: "getServiceProviders/visitHistory",
    getServiceRequestId: 'getServiceRequestId/visitHistory',
    getServiceTypeSuccess: 'get_type_success/visitHistory',
    clearServiceTypes: 'clearServiceTypes/visitHistory',
    clearServiceProviders: 'clearServiceProviders/visitHistory',
    getHistoryListCountSuccess: 'getHistoryListCountSuccess/visitHistory',
    getVisitFeedBack: 'getVisitFeedBack/visit',
    getAllPatientForServiceProviders: "getAllPatientForServiceProviders/visitHistory",
    clearPatientForServiceProviders: "clearPatientForServiceProviders/visitHistory",
    formDirty: 'formDirty/visitHistory',
    visitHistoryLoading: 'visitHistoryLoading/visitHistory'
};

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
        data
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
        ServiceRequestGet(API.getVisitHistoryList + serviceProviderId + '/' + data.pageNumber + '/' + data.pageSize + '/' + data.sortOrder + '/' + data.sortName).then((resp) => {
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
        ServiceRequestGet(API.getSortedVisitHistory + serviceProviderId + '/' + data.sortByOrder + '/' + data.sortByColumn).then((resp) => {
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
        ServiceRequestGet(API.getServiceVisitsHistoryById + data).then((resp) => {
            dispatch(getVisitServiceHistoryByIdDetailSuccess(resp.data))
            resp.data.length > 0 && dispatch(push(Path.visitSummaryDetail))
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
        ServiceRequestPost(API.getFilteredVisitHistory, { ...data, serviceProviderId }).then((resp) => {
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
        Get(API.getSortedVisitHistory + url, baseURLServiceRequest).then((resp) => {
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getServiceProviderRating(data) {
    return (dispatch, getState) => {
        dispatch(startLoading())
        ServiceRequestGet(API.getRatingAndFeedback + data).then((resp) => {
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
        ServiceRequestGet(API.getAllServiceProviders).then((resp) => {
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
        ServiceRequestGet(API.getServiceCategory).then((resp) => {
            dispatch(getServiceCategorySuccess(resp.data));
            //dispatch(endLoading());
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
}

export const getServiceTypeSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getServiceTypeSuccess,
        data
    }
}

export function getServiceType(data) {
    return (dispatch) => {
        let serviceCategoryId = data;
        dispatch(startLoading());
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
            dispatch(getServiceTypeSuccess(data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
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
        ServiceRequestGet(API.getHistoryListCount + serviceProviderId).then((resp) => {
            dispatch(getHistoryListCountSuccess(resp.data));
            //dispatch(endLoading());
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
}

export function getVisitFeedBack(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getVisitFeedback + data).then((resp) => {
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
        ServiceRequestGet(API.getAllPatientForServiceProviders + serviceProviderId).then((resp) => {
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