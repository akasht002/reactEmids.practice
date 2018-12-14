import { API } from '../../../services/api';
import { Get, elasticSearchPost, elasticSearchGet, getUserInfo } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getVisitServiceListSuccess } from '../VisitServiceList/actions';
import _ from "lodash"

export const ServiceRequestFiltersList = {
    getServiceCategoryListSuccess: 'get_service_request_filters_list_success/servicerequestfilters',
    getServiceTypeSuccess: 'get_service_type_success/servicerequestfilters',
    getServiceRequestStatusSuccess: 'get_servicerequest_status_success/servicerequestfilters',
    getServiceAreaSuccess: 'get_servicearea_status_success/servicerequestfilters',
    clearServiceCategory: 'clear_service_category/servicerequestfilters',
    clearServiceArea: 'clear_service_area/servicerequestfilters',
    clearServiceRequestStatus: 'clear_servicerequest_status_success/servicerequestfilters',
    checkAllServiceRequestStatus: 'checkAllServiceRequestStatus/servicerequestfilters',
    getFilterDataCountSuccess:'getFilterDataCountSuccess/servicerequestfilters',
    formDirty:'formDirty/servicerequestfilters',
    clearServiceType:'clear_service_type/servicerequestfilters',
};

export const clearServiceRequestStatus = (data) => {
    data.map((item) => {
        return item.isChecked = false;
    })
    return {
        type: ServiceRequestFiltersList.clearServiceRequestStatus,
        data
    }
}


export const clearServiceCategory = (data) => {
    data && data.map((item) => {
        return item.isChecked = false;
    })
    return {
        type: ServiceRequestFiltersList.clearServiceCategory,
        data
    }
}

export const clearServiceType = data => {
    return {
        type: ServiceRequestFiltersList.clearServiceType,
        data
    }
}

export const clearServiceArea = (data) => {

    data.map((item) => {
        return item.isChecked = false;
    })
    return {
        type: ServiceRequestFiltersList.clearServiceArea,
        data
    }
}

export const getServiceCategoryListSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getServiceCategoryListSuccess,
        data
    }
}

export const getFilterDataCountSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getFilterDataCountSuccess,
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

export const formDirty = () => {
    return {
        type: ServiceRequestFiltersList.formDirty,
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
    data.isChecked = false;
    return (dispatch) => {

        dispatch(startLoading());
        let serviceCategoryId = data.value;
        elasticSearchGet(API.getServiceType + `${serviceCategoryId}`).then((resp) => {
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
            let newArr = _.map(resp.data, function(element) { 
                return _.extend({}, element, {isChecked: true});
           });
            let listToDelete = [106, 107];
            let data =newArr.filter(obj => !listToDelete.includes(obj.id));
            dispatch(getServiceRequestStatusSuccess(data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getServiceArea(data) {
    return (dispatch) => {

        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
        Get(API.getServiceareaList + `${serviceProviderId}`).then((resp) => {
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
        let reqObj;
        if (data.startDate === "" && data.endDate === "") {
            reqObj = {
                "Category": data.ServiceCategoryId,
                "ServiceTypes": data.serviceTypes,
                "Status": data.serviceStatus,
                "FromPage": data.FromPage,
                "ToPage": data.ToPage,
                "ServiceAreas": data.ServiceAreas,
                "serviceProviderId": data.serviceProviderId
            }
        } else {
            reqObj = {
                "Category": data.ServiceCategoryId,
                "ServiceTypes": data.serviceTypes,
                "Status": data.serviceStatus,
                "FromPage": data.FromPage,
                "ToPage": data.ToPage,
                "FromDate": data.startDate,
                "ToDate": data.endDate,
                "ServiceAreas": data.ServiceAreas,
                "serviceProviderId": data.serviceProviderId
            }
        }

        elasticSearchPost(API.PostSearchServiceRequest, reqObj).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            resp.data.length === 0 && dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getFilterDataCount(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let reqObj;
            reqObj = {
                "Category": data.ServiceCategoryId,
                "ServiceTypes": data.serviceTypes,
                "Status": data.serviceStatus,
                "FromPage": data.FromPage,
                "ToPage": data.ToPage,
                "FromDate": data.startDate,
                "ToDate": data.endDate,
                "ServiceAreas": data.ServiceAreas,
                "serviceProviderId": data.serviceProviderId
            }
        elasticSearchPost(API.getServiceRequestCountOfFilters, reqObj).then((resp) => {
            dispatch(getFilterDataCountSuccess(resp.data))
            resp.data.length === 0 && dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export const checkAllServiceRequestStatus = (checked, data) => {
    if (checked) {
        data.map((item) => {
            return item.isChecked = true;
        })
    }
    else {
        data.map((item) => {
            return item.isChecked = false;
        })
    }
    return {
        type: ServiceRequestFiltersList.checkAllServiceRequestStatus,
        data
    }
};

