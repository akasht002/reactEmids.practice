import { API } from '../../../../services/api'
import _ from 'lodash'
import {
  Post
} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions'
import {getFullName} from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { VisitServiceRequestList } from './bridge'
import { logError } from '../../../../utils/logError';

export const setActiveSubTab = data => {
  return {
    type: VisitServiceRequestList.setActiveSubTab,
    data
  }
}

export const setPaginationRowCountSuccess = data => {
  return {
    type: VisitServiceRequestList.setPaginationRowCountSuccess,
    data
  }
}

export const getServiceRequestCountListSuccess = data => {
  return {
    type: VisitServiceRequestList.getServiceRequestCountListSuccess,
    data
  }
}

export const getServiceRequestTableListSuccess = data => {
  return {
    type: VisitServiceRequestList.getServiceRequestTableListSuccess,
    data
  }
}

export function getServiceRequestCountList(data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    return Post(
      API.getVisitServiceRequestCount, data
    )
      .then(resp => {
        if (resp && resp.data) {
          let activeSubTab = getState().dashboardState.VisitServiceRequestState.activeSubTab
          let visitServiceRequestCountList = getState().dashboardState.VisitServiceRequestState.visitServiceRequestCountList
          let dataCount = (resp.data && resp.data[0].totalCount > 0) ? resp.data[0].totalCount : 0
          dispatch(setPaginationRowCountSuccess(dataCount));
          if (activeSubTab !== 'All') {
            let index = _.findIndex(visitServiceRequestCountList, { statusName: resp.data[0].statusName });
            visitServiceRequestCountList.splice(index, 1, {
              label: resp.data[0].label,
              statusName: resp.data[0].statusName,
              subtext: resp.data[0].subtext,
              totalCount: resp.data[0].totalCount
            })
            dispatch(getServiceRequestCountListSuccess(visitServiceRequestCountList))
          }
          else {
            dispatch(getServiceRequestCountListSuccess(resp.data))
          }
        }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endLoading())
      })
  }
}

export function getServiceRequestTableList(data) {
  return (dispatch) => {
    dispatch(startLoading())
    return Post(API.getVisitServiceRequestTable, data)
      .then(resp => {
        if (resp && resp.data) {
          let data = resp.data.map(res => {
            return {
              ...res,
              patientFullName: getFullName(getValue(res.firstName), getValue(res.lastName)),
              serviceType: res.serviceType.join(', ')
            }
          })
          dispatch(getServiceRequestTableListSuccess(data))
        }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(getServiceRequestTableListSuccess([]))
        dispatch(endLoading())
      })
  }
}