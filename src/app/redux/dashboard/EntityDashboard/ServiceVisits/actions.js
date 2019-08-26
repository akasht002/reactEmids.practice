import { API } from '../../../../services/api';
import { CareTeamPost, ServiceRequestGet } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import _ from 'lodash';
import { CARETEAM_SV_STATUS } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';

export const VisitServiceList = {
    getVisitsCountListSuccess: 'get_visits_countList_success/visitservice',
    getVisitsTableListSuccess: 'get_visits_tableList_success/visitservice',
    getServiceRequestVisitStatusSuccess: 'get_servicerequest_visit_status_success/visitservice',
    clearRequestStatus: 'clear_request_status/visitservice',
    setPaginationRowCountSuccess: 'set_pagination_row_count_success/visitservice',
    setActiveSubTab: 'setActiveSubTab/visitservice'
}

export const setActiveSubTab = data => {
    return {
        type: VisitServiceList.setActiveSubTab,
        data
    }
}  

export const getVisitsCountListSuccess = data => {
    return {
        type: VisitServiceList.getVisitsCountListSuccess,
        data
    }
}

export const getVisitsTableListSuccess = data => {
    return {
        type: VisitServiceList.getVisitsTableListSuccess,
        data
    }
}

export const setPaginationRowCountSuccess = data => {
    return {
        type: VisitServiceList.setPaginationRowCountSuccess,
        data
    }
}

export const getServiceRequestVisitStatusSuccess = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    let updatedData = data.filter(itemX => CARETEAM_SV_STATUS.includes(itemX.keyValue));
    return {
        type: VisitServiceList.getServiceRequestVisitStatusSuccess,
        updatedData
    }
}

export function getVisitServiceCountList(data) {
    return (dispatch) => {
        data.offset = getTimeZoneOffset();
        CareTeamPost(API.getVisitServiceCount, data).then((resp) => {
            if (resp && resp.data) {
                dispatch(getVisitsCountListSuccess(resp.data))
                dispatch(setPaginationRowCountSuccess(resp.data[0].dataCount));
            }
        }).catch(() => {
        })
    }
}

export function getVisitServiceTableList(data) {
    return (dispatch) => {
        dispatch(startLoading());
        data.offset = getTimeZoneOffset();
        CareTeamPost(API.getVisitServiceTable, data).then((resp) => {
            if (resp.statusText === 'No Content') {
                dispatch(getVisitsTableListSuccess([]))
            }
            else {
                if (resp && resp.data) {
                    dispatch(getVisitsTableListSuccess(resp.data))
                }
            }
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
}

export function getServiceRequestVisitStatus() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getServiceRequestCardStatus).then((resp) => {
            dispatch(getServiceRequestVisitStatusSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const clearRequestStatus = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: VisitServiceList.clearRequestStatus,
        data
    }
}