import { API } from '../../../../services/api'
import _ from 'lodash'
import {
  Post, PatientGet, ServiceRequestGet
} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions'
import {getFullName, concatCommaWithSpace} from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { VisitServiceRequestList } from './bridge'
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { CARETEAM_STATUS, ENTITY_SR_STATUS, RECURRING_OPTIONS } from '../../../../constants/constants';

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

export function getServiceRequestCountList(data, isFilterApplied = false) {
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
          if(!isFilterApplied) {
          if (activeSubTab !== 'All') {
            dispatch(getServiceRequestCountListSuccess(updateCountList(visitServiceRequestCountList, resp)))
          }
          else {
            dispatch(getServiceRequestCountListSuccess(resp.data))
          }
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
              serviceType: concatCommaWithSpace(res.serviceType)
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

export function getScheduleType() {
  return dispatch => {
    dispatch(startLoading())
    return PatientGet(API.getScheduleType)
      .then(resp => {
        dispatch(getScheduleTypeSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getScheduleTypeSuccess = data => {
  data.forEach(obj => {
    obj.isChecked = false
  })
  let updatedData = data.filter(itemX => RECURRING_OPTIONS.includes(itemX.id));
  return {
    type: VisitServiceRequestList.getScheduleTypeSuccess,
    updatedData
  }
}

export const clearScheduleType = data => {
  data.forEach(obj => {
    obj.isChecked = false
  })
  return {
    type: VisitServiceRequestList.clearScheduleType,
    data
  }
}

export function getServiceRequestStatus() {
  return dispatch => {
    dispatch(startLoading())
    return ServiceRequestGet(API.getServiceStatus)
      .then(resp => {
        dispatch(getServiceRequestStatusSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getServiceRequestStatusSuccess = data => {
  _.forEach(data, function (obj) { obj.isActive = false; });
  let updatedData = data.filter(itemX => ENTITY_SR_STATUS.includes(itemX.keyValue));
return {
    type: VisitServiceRequestList.getServiceRequestStatusSuccess,
    updatedData
  }
}

export const clearRequestStatus = data => {
  data.forEach(obj => {
      obj.isActive = false
  });
  return {
    type: VisitServiceRequestList.clearRequestStatus,
    data
  }
}