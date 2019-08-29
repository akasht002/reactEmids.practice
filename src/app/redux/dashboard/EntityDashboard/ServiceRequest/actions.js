import { API } from '../../../../services/api'
import _ from 'lodash'
import {
  Post
} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions'
import {getFullName, concatCommaWithSpace} from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { VisitServiceRequestList } from './bridge'
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';

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
          let {activeSubTab, visitServiceRequestCountList} = getState().dashboardState.VisitServiceRequestState
          let dataCount = checkDataCount(resp)
          dispatch(setPaginationRowCountSuccess(dataCount));
          if (activeSubTab !== 'All') {
            dispatch(getServiceRequestCountListSuccess(updateCountList(visitServiceRequestCountList, resp)))
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
              serviceType: concatCommaWithSpace(resp.serviceType)
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