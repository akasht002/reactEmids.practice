import { API } from '../../../services/api';
import { Get,elasticSearchPost,elasticSearchGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getVisitServiceListSuccess} from '../VisitServiceList/actions';

export const ServiceRequestFiltersList = {
    getServiceCategoryListSuccess: 'get_service_request_filters_list_success/servicerequestfilters',
    getServiceTypeSuccess: 'get_service_type_success/servicerequestfilters',
    getServiceRequestStatusSuccess: 'get_servicerequest_status_success/servicerequestfilters',
    getServiceAreaSuccess: 'get_servicearea_status_success/servicerequestfilters'
};

export const getServiceCategoryListSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getServiceCategoryListSuccess,
        data
    }
}
export const getServiceTypeSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getServiceTypeSuccess,
        data
    }
}
export const getServiceRequestStatusSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getServiceRequestStatusSuccess,
        data
    }
}

export const getServiceAreaSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getServiceAreaSuccess,
        data
    }
}

export function getServiceCategory() {
    return (dispatch) => {
      
        dispatch(startLoading());
        elasticSearchGet(API.getServiceCategory).then((resp) => {
           dispatch(getServiceCategoryListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getServiceType(data) {
    return (dispatch) => {
      
        dispatch(startLoading());
        let serviceCategoryId= data;
        elasticSearchGet(API.getServiceType+`${serviceCategoryId}`).then((resp) => {
           dispatch(getServiceTypeSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function ServiceRequestStatus() {
    return (dispatch) => {
      
        dispatch(startLoading());
        elasticSearchGet(API.getServiceRequestStatus).then((resp) => {
           dispatch(getServiceRequestStatusSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getServiceArea() {
    return (dispatch) => {
      
        dispatch(startLoading());
        let patientId=133;
        elasticSearchGet(API.getServiceareaList+`/${patientId}`).then((resp) => {
           dispatch(getServiceAreaSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getFilter(data) {
    return (dispatch) => {
        dispatch(startLoading());
        if(data.startDate==="" && data.endDate===""){
            var ReqObje={
                "Category": data.ServiceCategoryId,
                "ServiceTypes": data.serviceTypes,
                "Status":data.serviceStatus,
                "FromPage": 0,
                "ToPage": 10
              }
        } else {
            var  ReqObje ={
                "Category": data.ServiceCategoryId,
                "ServiceTypes": data.serviceTypes,
                "Status":data.serviceStatus,
                "FromPage": 0,
                "ToPage": 10,
                "FromDate":data.startDate,
                "ToDate":data.endDate
            }
        }
     
        elasticSearchPost(API.PostSearchServiceRequest,ReqObje).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
  
    }
  };

