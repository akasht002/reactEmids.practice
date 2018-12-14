import { API } from '../../../services/api';
import { elasticSearchGet, ServiceRequestGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';

export const VisitServiceList = {
    getVisitServiceListSuccess: 'get_visit_service_list_success/visitservice',
    serviceRequestCount: 'serviceRequestCount/visitservice',
    formDirtyVisitList: 'formDirtyVisitList/visitservice'
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

export const clearVisitServiceList = () =>{
    return (dispatch) => {
        dispatch(getVisitServiceListSuccess([]))
    }
}

export function getVisitServiceList(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId
        dispatch(startLoading());
        elasticSearchGet(API.getServiceRequestList + `${serviceProviderId}/${data.pageNumber}/${data.pageSize}`).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            //dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    };
};


export function getServiceRequestCount () {
    return (dispatch, getState) => {
      let data = getState().visitSelectionState.VisitServiceListState.status
      dispatch(startLoading())
      let serviceProviderId = getUserInfo().serviceProviderId
      ServiceRequestGet(
        API.getServiceRequestCount + serviceProviderId + '/' + data 
      )
        .then(resp => {
          if (resp && resp.data) {
            dispatch(serviceRequestCountSuccess(resp.data))
          }
        //   dispatch(endLoading())
        })
        .catch(() => {
          dispatch(endLoading())
        })
    }
  };

  export function serviceRequestCountSuccess(data) {  
    return {
      type: VisitServiceList.serviceRequestCount,
      data
    }
  }