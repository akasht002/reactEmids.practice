import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../../redux/navigation/actions';
import { Path } from '../../../routes';

export const VisitServiceDetails = {
    getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
    getVisitServiceScheduleSuccess: 'get_visit_service_schedule_success/visitservicedetails',
};

export const getVisitServiceDetailsSuccess = (data) => {
    return {
        type: VisitServiceDetails.getVisitServiceDetailsSuccess,
        data
    }
}

export const getVisitServiceScheduleSuccess = (data) => {
    return {
        type: VisitServiceDetails.getVisitServiceScheduleSuccess,
        data
    }
}

export function getVisitServiceDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get('http://www.mocky.io/v2/5b6ae51b3200006507373197').then((resp) => {
            //axios.get(baseURL + API.getServiceRequestDetails + '1').then((resp) => {
            dispatch(getVisitServiceDetailsSuccess(resp.data))
            dispatch(push(Path.visitServiceDetails))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getVisitServiceSchedule() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURL + API.getServiceRequestSchedule + '1').then((resp) => {
            dispatch(getVisitServiceScheduleSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



