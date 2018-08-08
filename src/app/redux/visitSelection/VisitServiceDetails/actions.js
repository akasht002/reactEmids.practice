import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const VisitServiceDetails = {
    getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
};

export const getVisitServiceDetailsSuccess = (data) => {
    return {
        type: VisitServiceDetails.getVisitServiceDetailsSuccess,
        data
    }
}

export function getVisitServiceDetails() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get('http://www.mocky.io/v2/5b6ae51b3200006507373197').then((resp) => {
            dispatch(getVisitServiceDetailsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



