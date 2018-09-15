import { API, baseURLServiceRequest } from '../../../services/api';
import {ServiceRequestGet,Get, Post} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const vistServiceHistoryDetails = {
    getVisitServiceHistoryListSuccess: 'getVisitServiceHistoryListSuccess/visitHistory',
    getVisitServiceHistoryDetailsSuccess: 'getVisitServiceHistoryDetailsSuccess/visitHistory',
    getVisitServiceHistoryByIdDetailSuccess: 'getVisitServiceHistoryByIdDetailSuccess/visitHistory',
    updateVisitHistoryFilter: 'updateVisitHistoryFilter/visitHistory',
    getServiceCategoriesSuccess: "getServiceCategoriesSuccess/VisitHistory/Filter",
    getSubmittedResponse: "getSubmittedResponse/visitHistory",
    getAllServiceProviders: "getServiceProviders",    
    getServiceRequestId:'getServiceRequestId/visitHistory',

};

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

export const getServiceCategoriesSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getServiceCategoriesSuccess,
        data
    }
}

export const getServiceProviders = (data) => {
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

export function getVisitServiceLists() {
    return (dispatch) => {
        dispatch(startLoading());
        let serviceProviderId =   getUserInfo().serviceProviderId;
        ServiceRequestGet(API.getVisitHistoryList + serviceProviderId).then((resp) => {           
            dispatch(getVisitServiceHistoryListSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getVisitServiceListSort(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let serviceProviderId =   getUserInfo().serviceProviderId;
        ServiceRequestGet(API.getSortedVisitHistory + serviceProviderId +'/'+ data.sortByOrder + '/' + data.sortByColumn).then((resp) => {           
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
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceVisitsHistoryById + data).then((resp) => {           
            dispatch(getVisitServiceHistoryByIdDetailSuccess(resp.data)) 
            dispatch(push(Path.visitSummaryDetail))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getFilteredData(data){
    return (dispatch, getState) => {
        dispatch(startLoading());
        let serviceProviderId =   getUserInfo().serviceProviderId;
        Post(API.getFilteredVisitHistory, {...data, serviceProviderId}, baseURLServiceRequest).then((resp) => {           
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getSort(data){
    return (dispatch, getState) => {
        dispatch(startLoading());
        let serviceProviderId =   getUserInfo().serviceProviderId;
        let url =  serviceProviderId + "/" + data.sortByOrder + "/" + data.sortByColumn + "?fromDate=" + data.fromDate + "&toDate=" + data.toDate
        Get(API.getSortedVisitHistory + url, baseURLServiceRequest).then((resp) => {           
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getServiceProviderRating(data){
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(API.getRatingAndFeedback + data.serviceVisitId, baseURLServiceRequest).then((resp) => {
            dispatch(getSubmittedResponse(resp.data))
            dispatch(endLoading)
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function getAllServiceProviders(){
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(API.getAllServiceProviders, baseURLServiceRequest).then((resp) => {
            dispatch(getServiceProviders(resp.data))
            dispatch(endLoading())
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

function  getAllServiceCategories(data){
    return async (dispatch) => {
        let serviceCategories = []
       await data.map((service, index) => {
            dispatch(startLoading())
            Get(API.getServiceTasks + service.serviceCategoryId, baseURLServiceRequest).then((payload) => {
                let serviceCategoryResponse = {
                    ...service,
                    serviceTypeTasks: payload.data
                }
                serviceCategories.push(serviceCategoryResponse)
                if(index === data.length - 1){
                    dispatch(getServiceCategoriesSuccess(serviceCategories))
                }
            }).catch((error) => {
                dispatch(endLoading())
            })
        })
        dispatch(startLoading())
    }
}

export function getServiceCategories(){
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(API.getServiceCategories, baseURLServiceRequest).then((resp) => {
            dispatch(getAllServiceCategories(resp.data))
            dispatch(endLoading())
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}




