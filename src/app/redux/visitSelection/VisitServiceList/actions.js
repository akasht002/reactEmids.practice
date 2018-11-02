import { API } from '../../../services/api';
import { elasticSearchGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';

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
        let serviceProviderId = getUserInfo().serviceProviderId
        dispatch(startLoading());
        elasticSearchGet(API.getServiceRequestList + `${serviceProviderId}` + '/' + 1 + '/' + 10).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



