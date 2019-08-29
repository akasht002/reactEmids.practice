import { API } from '../../../../services/api';
import { Post } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import _ from 'lodash';
import { DATE_FORMATS } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { getValue } from '../../../../utils/userUtility'
import { getFullName } from '../../../../utils/stringHelper'
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import moment from 'moment';
import { VisitServiceList } from './bridge'
import { logError } from '../../../../utils/logError';

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
        }).catch((err) => {
            logError(err)
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
                            schedule: res.visitDate && `${moment(res.visitDate, DATE_FORMATS.yyyy_mm_dd).format(DATE_FORMATS.ddmm)}, ${getUTCFormatedDate(res.visitDate, 'hh:mm A')}`,
                        }
                    })
                    dispatch(getVisitsTableListSuccess(data))
                }
            }
            dispatch(endLoading());
        }).catch((err) => {
            logError(err)
            dispatch(endLoading());
        })
    }
}