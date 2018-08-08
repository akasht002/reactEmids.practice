import axios from 'axios';
import { API, baseURL } from '../../../services/api';
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
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get('http://www.mocky.io/v2/5b6ac54632000010003730d2').then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



