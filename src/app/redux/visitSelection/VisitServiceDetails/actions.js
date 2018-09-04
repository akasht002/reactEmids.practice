import { API } from '../../../services/api';
import { ServiceRequestGet } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const VisitServiceDetails = {
    getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
    getVisitServiceScheduleSuccess: 'get_visit_service_schedule_success/visitservicedetails',
    getServiceRequestId: 'get_service_requestId/visitservicedetails'
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

export const getServiceRequestId = (data) => {
    return {
        type: VisitServiceDetails.getServiceRequestId,
        data
    }
}

export function getVisitServiceDetails(data) {
    return (dispatch) => {
        dispatch(getServiceRequestId(data))
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestDetails + data).then((resp) => {
            dispatch(getVisitServiceDetailsSuccess(resp.data))           
            dispatch(push(Path.visitServiceDetails))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getVisitServiceSchedule(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestSchedule + data).then((resp) => {
            dispatch(getVisitServiceScheduleSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};
