import { API } from '../../../services/api';
import { Get, elasticSearchPost, elasticSearchGet, getUserInfo,ServiceRequestPost } from '../../../services/http';
import { getVisitServiceListSuccess, startLoading, endLoading } from '../VisitServiceList/actions';
import { SERVICE_REQ_STATUS } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../utils/dateUtility';
import { SERVICE_REQUEST_STATUS } from '../../constants/constants';

export const ServiceRequestFiltersList = {
    getServiceCategoryListSuccess: 'get_service_request_filters_list_success/servicerequestfilters',
    getServiceTypeSuccess: 'get_service_type_success/servicerequestfilters',
    getServiceRequestStatusSuccess: 'get_servicerequest_status_success/servicerequestfilters',
    getServiceAreaSuccess: 'get_servicearea_status_success/servicerequestfilters',
    clearServiceCategory: 'clear_service_category/servicerequestfilters',
    clearServiceArea: 'clear_service_area/servicerequestfilters',
    clearServiceRequestStatus: 'clear_servicerequest_status_success/servicerequestfilters',
    checkAllServiceRequestStatus: 'checkAllServiceRequestStatus/servicerequestfilters',
    getFilterDataCountSuccess: 'getFilterDataCountSuccess/servicerequestfilters',
    formDirty: 'formDirty/servicerequestfilters',
    clearServiceType: 'clear_service_type/servicerequestfilters',
    setDefaultFilteredStatus: 'setDefaultFilteredStatus/servicerequestfilters',
    getDashboardStatusSuccess: 'getDashboardStatusSuccess/servicerequestfilters',
    getSearchDataCountSuccess: 'getSearchDataCountSuccess/servicerequestfilters'
};

export const clearServiceRequestStatus = (data) => {
        data.map(item => {
          return item.isChecked = !(item.keyValue === SERVICE_REQUEST_STATUS.closed.keyValue || item.keyValue === SERVICE_REQUEST_STATUS.all.keyValue)              
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

export const setDefaultFilteredStatus = () => {
    return {
        type: ServiceRequestFiltersList.setDefaultFilteredStatus,
    }
};

export const getServiceAreaSuccess = (data) => {
    data.map((item) => {
        return item.isChecked = false;
    })
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
        elasticSearchGet(API.getServiceCategory).then((resp) => {
            dispatch(getServiceCategoryListSuccess(resp.data))
        }).catch((err) => {
        })

    }
};

export function getServiceType(data) {
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
        elasticSearchGet(API.getServiceRequestStatus).then((resp) => {
         resp.data.forEach(obj => {
            obj.isChecked = !(obj.keyValue === SERVICE_REQUEST_STATUS.closed.keyValue || obj.keyValue === SERVICE_REQUEST_STATUS.all.keyValue)              
            let listToDelete = [SERVICE_REQ_STATUS.PENDING_APPROVAL, SERVICE_REQ_STATUS.DECLINED,  
                                    SERVICE_REQ_STATUS.IN_PROGRESS];
            let data = resp.data.filter(obj => !listToDelete.includes(obj.id));
            dispatch(getServiceRequestStatusSuccess(data))
        })
    }).catch((err) => {
    })
}
}

export function getServiceArea(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        Get(API.getServiceareaList + `${serviceProviderId}`).then((resp) => {
            dispatch(getServiceAreaSuccess(resp.data))
        }).catch((err) => {
        })

    }
};

export const formatRequestPayload = data => {
    let reqObj = {
        Category: data.ServiceCategoryId,
        ServiceTypes: data.serviceTypes,
        Status: data.serviceStatus,
        FromPage: data.FromPage,
        ToPage: data.ToPage,
        ServiceAreas: data.ServiceAreas,
        serviceProviderId: data.serviceProviderId,
        offset: getTimeZoneOffset()
    }
    if (data.startDate === "" && data.endDate === "") {
        return reqObj
    } else {
        reqObj.FromDate = data.startDate;
        reqObj.ToDate = data.endDate;
        return reqObj
    }
}

export const getServiceRequestListByFilter = data =>{
    return (dispatch) => {
        dispatch(startLoading());
        let payload = formatRequestPayload(data)
        ServiceRequestPost(API.getServiceRequestLists, payload).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
}

export function getServiceRequestListByFilterCount(data) {
    return (dispatch) => {
        let payload = formatRequestPayload(data)
        ServiceRequestPost(API.getServiceRequestListCount, payload).then((resp) => {
            dispatch(getFilterDataCountSuccess(resp.data))
        }).catch((err) => {
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
                "serviceProviderId": data.serviceProviderId,
                "offset": getTimeZoneOffset()
            }
        }

        elasticSearchPost(API.PostSearchServiceRequest, reqObj).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function getFilterDataCount(data) {
    return (dispatch) => {
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
            "serviceProviderId": data.serviceProviderId,
            "offset": getTimeZoneOffset()
        }
        elasticSearchPost(API.getServiceRequestCountOfFilters, reqObj).then((resp) => {
            dispatch(getFilterDataCountSuccess(resp.data))
        }).catch((err) => {
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

export function getDashboardStatusSuccess(data) {
    return {
        type: ServiceRequestFiltersList.getDashboardStatusSuccess,
        data
    }
}

export function checkParticularServiceRequestStatus(updatedData) {
    return (dispatch, getState) => {
        let data = getState().visitSelectionState.ServiceRequestFilterState
            .ServiceStatus
        let finalData = data.map(item => {
                 return {
                    ...item,
                    isChecked: item.id === updatedData.status
                }
        })
        dispatch(getServiceRequestStatusSuccess(finalData))
        dispatch(getDashboardStatusSuccess(updatedData))
    }
}

export const getSearchDataCountSuccess = (data) => {
    return {
        type: ServiceRequestFiltersList.getSearchDataCountSuccess,
        data
    }
}

export function getSearchDataCount(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId
        let reqObj = {
            status: null,
            ServiceAreas: {},
            serviceProviderId: serviceProviderId,
            queryString: data.searchKeyword
        }
        elasticSearchPost(API.getServiceRequestCountOfFilters, reqObj).then((resp) => {
            dispatch(getSearchDataCountSuccess(resp.data))
        }).catch((err) => {
        })

    }
};