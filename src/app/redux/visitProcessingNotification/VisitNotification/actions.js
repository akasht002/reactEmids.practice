import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import {getUserInfo} from '../../../utils/userUtility';
import { USERTYPES } from '../../../constants/constants';
import {
    VisitNotification
} from './bridge'


export const getVisitNotificationSuccess = (data) => {
    return {
        type: VisitNotification.getVisitNotificationSuccess,
        data
    }
}

export const getVisitNotificationCountSuccess = (data) => {
    return {
        type: VisitNotification.getVisitNotificationCountSuccess,
        data
    }
}

export function getVisitNotification(data) {
    return (dispatch) => {
        let userType = USERTYPES.SERVICE_PROVIDER;
        let userId = getUserInfo().serviceProviderId;
        let pageNumber = data.data.pageNumber;
        // let rowsPerPage = data.data.pageSize;
        dispatch(startLoading());
        return Get(`${API.getVisitNotification}${userId}/${userType}/${pageNumber}/${data.count}`).then((resp) => {
           
            dispatch(getVisitNotificationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getVisitNotificationCount() {
    return (dispatch) => {
        let userType = USERTYPES.SERVICE_PROVIDER;
        let userId = getUserInfo().serviceProviderId;
        dispatch(startLoading());
        return Get(`${API.getVisitNotificationCount}${userId}/${userType}`).then((resp) => {
            dispatch(getVisitNotificationCountSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};