import { API } from '../../../../services/api';
import { Post } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import _ from 'lodash';
import { DATE_FORMATS, API_RESPONSE } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { getValue } from '../../../../utils/userUtility'
import { getFullName } from '../../../../utils/stringHelper'
import { getUTCFormatedDate } from "../../../../utils/dateUtility";
import moment from 'moment';
import { VisitServiceList } from './bridge'
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';
import { ENTITY_DASHBOARD_STATUS } from '../../../../constants/constants';

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

export function getVisitServiceCountList(data, isFilterApplied = false) {
    return (dispatch, getState) => {
        Post(API.getVisitServiceCount, data).then((resp) => {
            if (resp && resp.data) {
                let {activeSubTab, visitServiceCountList} = getState().dashboardState.VisitServiceCountListState
                let filteredArray = resp.data.filter(item => {
                    return caseInsensitiveComparer(activeSubTab, item.statusName)
                  });
                let dataCount = checkDataCount(filteredArray)
                dispatch(setPaginationRowCountSuccess(dataCount));
                if(caseInsensitiveComparer(data.tab, ENTITY_DASHBOARD_STATUS.serviceVisits.statCard.all) && !isFilterApplied) {
                    dispatch(getVisitsCountListSuccess(resp.data))
                    }
                    else {
                        dispatch(getVisitsCountListSuccess(updateCountList(visitServiceCountList, resp)))
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
            if ((caseInsensitiveComparer(resp.statusText, API_RESPONSE.statusText))) {
                dispatch(getVisitsTableListSuccess([]))
            }
            else {
                if (resp && resp.data) {
                    let data = resp.data.map(res => {
                        return {
                            ...res,
                            patientFullName: getFullName(getValue(res.patientFirstName), getValue(res.patientLastName)),
                            providerFullName: getFullName(getValue(res.entityServiceProviderFirstName), getValue(res.entityServiceProviderLastName)),
                            schedule: res.visitDate && `${moment(res.visitDate, DATE_FORMATS.yyyy_mm_dd).format(DATE_FORMATS.ddmm)}, ${getUTCFormatedDate(res.visitDate, DATE_FORMATS.hhMinSession)}`,
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