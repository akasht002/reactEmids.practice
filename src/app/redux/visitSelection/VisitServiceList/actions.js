import { API } from '../../../services/api';
import { elasticSearchGet, ServiceRequestGet } from '../../../services/http';
import { push } from '../../navigation/actions'
import { Path } from '../../../routes'
import { getUserInfo } from '../../../services/http';
import { checkParticularServiceRequestStatus } from '../ServiceRequestFilters/actions';
import _ from 'lodash';
import { VisitServiceList } from './bridge';

export const startLoading = () => {
    return {
        type: VisitServiceList.startLoading,
    }
};

export const endLoading = () => {
    return {
        type: VisitServiceList.endLoading,
    }
};

export const getVisitServiceListSuccess = (data) => {
    return {
        type: VisitServiceList.getVisitServiceListSuccess,
        data
    }
};

export const formDirtyVisitList = () => {
    return {
        type: VisitServiceList.formDirtyVisitList,
    }
};

export const clearVisitServiceList = () => {
    return (dispatch) => {
        dispatch(getVisitServiceListSuccess([]))
    }
}

 export function  getVisitServiceList(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId
        dispatch(startLoading());
        return elasticSearchGet(API.getServiceRequestList + `${serviceProviderId}/${data.pageNumber}/${data.pageSize}`).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    };
};


export function keywordSearchServiceRequest(data) {
    return (dispatch)=>{
        let serviceProviderId = getUserInfo().serviceProviderId
        dispatch(startLoading())
        ServiceRequestGet(API.keywordSearchServiceRequest + `${data.searchKeyword}/${serviceProviderId}/${data.pageNumber}/${data.pageSize}`).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
}


export function getServiceRequestCount() {
    return (dispatch, getState) => {
        let data = getState().visitSelectionState.VisitServiceListState.status
        let serviceProviderId = getUserInfo().serviceProviderId
        ServiceRequestGet(
            API.getServiceRequestCount + serviceProviderId + '/' + data
        )
            .then(resp => {
                if (resp && resp.data) {
                    dispatch(serviceRequestCountSuccess(resp.data))
                }
            })
            .catch(() => {
            })
    }
};

export function serviceRequestCountSuccess(data) {
    return {
        type: VisitServiceList.serviceRequestCount,
        data
    }
}

export function setServiceRequestStatus(data) {
    return (dispatch, getState) => {
        let serviceStatus = getState().visitSelectionState.ServiceRequestFilterState
        .ServiceStatus
        _.forEach(serviceStatus, function (obj) { 
            if(obj.id === parseInt(data.status, 10))
            {
                data.status = obj.keyValue;
            }
        });
        dispatch(checkParticularServiceRequestStatus(data))
        dispatch(push(Path.visitServiceList))
    }
}

export const setServiceRequestStatusSuccess = (data) => {
    return {
        type: VisitServiceList.setServiceRequestStatus,
        data
    }
}
