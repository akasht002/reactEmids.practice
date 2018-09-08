import { API } from '../../../services/api';
import { ServiceRequestGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { STATUS } from '../../../constants/constants';

export const VisitServiceList = {
    getVisitServiceListSuccess: 'get_visit_service_list_success/visitservice',
};

export const getVisitServiceListSuccess = (data) => {
    return {
        type: VisitServiceList.getVisitServiceListSuccess,
        data
    }
}

export function getVisitServiceList() {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestList + serviceProviderId + '/' + STATUS ).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



