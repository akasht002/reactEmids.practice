import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

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
        axios.get(baseURLServiceRequest + API.getServiceRequestList + serviceProviderId).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



