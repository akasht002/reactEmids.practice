import { API } from '../../../services/api';
import { Get,elasticSearchPost } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getVisitServiceListSuccess} from '../VisitServiceList/actions';

export const ServiceRequestFiltersList = {
    getServiceCategoryListSuccess: 'get_service_request_filters_list_success/servicerequestfilters',
    getServiceTypeSuccess: 'get_service_type_success/servicerequestfilters',
    getServiceRequestStatusSuccess: 'get_servicerequest_status_success/servicerequestfilters'
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

export function getServiceCategory() {
    return (dispatch) => {
      
        dispatch(startLoading());
        Get(API.getServiceCategory).then((resp) => {
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
        Get(API.getServiceType+`${serviceCategoryId}`).then((resp) => {
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
        Get(API.getServiceRequestStatus).then((resp) => {
           dispatch(getServiceRequestStatusSuccess(resp.data))
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
