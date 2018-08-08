import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const VisitService = {
    getVisitServiceListSuccess: 'get_visit_service_list_success/visitservice',
};

export const getVisitServiceListSuccess = (data) => {
    return {
        type: VisitService.getVisitServiceListSuccess,
        data
    }
}

export function getVisitServiceList() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get('http://www.mocky.io/v2/5b6a81f73200004c00372f0c').then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



