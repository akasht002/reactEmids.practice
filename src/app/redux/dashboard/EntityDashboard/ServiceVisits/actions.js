import { API } from '../../../../services/api';
import { ServiceRequestGet, Post } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import _ from 'lodash';
import { DATE_FORMATS } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { getValue } from '../../../../utils/userUtility'
import {getFullName} from '../../../../utils/stringHelper'
import moment from 'moment';

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

export function getVisitServiceCountList(data) {
    return (dispatch, getState) => {
        Post(API.getVisitServiceCount, data).then((resp) => {
            if (resp && resp.data) {
                let activeSubTab = getState().dashboardState.VisitServiceCountListState.activeSubTab
                let visitServiceCountList = getState().dashboardState.VisitServiceCountListState.visitServiceCountList
                let dataCount = (resp.data && resp.data[0].totalCount > 0) ? resp.data[0].totalCount : 0
                dispatch(setPaginationRowCountSuccess(dataCount));
                if (activeSubTab !== 'All') {
                  let index = _.findIndex(visitServiceCountList, { statusName: resp.data[0].statusName });
                  visitServiceCountList.splice(index, 1, {
                    label: resp.data[0].label,
                    statusName: resp.data[0].statusName,
                    subtext: resp.data[0].subtext,
                    totalCount: resp.data[0].totalCount
                  })
                  dispatch(getVisitsCountListSuccess(visitServiceCountList))
                }
                else {
                    dispatch(getVisitsCountListSuccess(resp.data))
                }
            }
        }).catch(() => {
        })
    }
}

export function getVisitServiceTableList(data) {
    return (dispatch) => {
        dispatch(startLoading());
        data.offset = getTimeZoneOffset();
        Post(API.getVisitServiceTable, data).then((resp) => {
            if (resp.statusText === 'No Content') {
                dispatch(getVisitsTableListSuccess([]))
            }
            else {
                if (resp && resp.data) {
                    let data = resp.data.map(res => {
                        return {
                          ...res,
                          patientFullName: getFullName(getValue(res.patientFirstName), getValue(res.patientLastName)),
                          providerFullName: getFullName(getValue(res.entityServiceProviderFirstName), getValue(res.entityServiceProviderLastName)),
                          schedule: res.schedule && `${moment(res.schedule.split(' ,')[0], DATE_FORMATS.mm_dd_yyy).format(DATE_FORMATS.ddmm)}, ${res.schedule.split(' ,')[1].substring(0, 5).toUpperCase()}`,
                          task: res.totalTaskCompleted && res.totalTask && `${Math.round(res.totalTaskCompleted / res.totalTask * 100)}%`
                        }
                      })
                    dispatch(getVisitsTableListSuccess(data))
                }
            }
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
}

export const clearRequestStatus = (data) => {
    _.forEach(data, function (obj) { obj.isChecked = false; });
    return {
        type: VisitServiceList.clearRequestStatus,
        data
    }
}