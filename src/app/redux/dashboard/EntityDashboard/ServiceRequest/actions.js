import { API } from '../../../../services/api'
import _ from 'lodash'
import {
  Post, PatientGet, ServiceRequestGet, Get
} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions'
import {getFullName, concatCommaWithSpace} from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { VisitServiceRequestList } from './bridge'
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { ENTITY_SR_STATUS, RECURRING_OPTIONS, entityDashboardTab, ENTITY_SV_STATUS } from '../../../../constants/constants';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';
import { ENTITY_DASHBOARD_STATUS } from '../../../../constants/constants';

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
          let filteredArray = resp.data.filter(item => {
            return caseInsensitiveComparer(activeSubTab, item.statusName)
          });
          let dataCount = checkDataCount(filteredArray)
          dispatch(setPaginationRowCountSuccess(dataCount));
            if(caseInsensitiveComparer(data.tab, ENTITY_DASHBOARD_STATUS.serviceRequests.statCard.all) && !isFilterApplied) {
              dispatch(getServiceRequestCountListSuccess(resp.data))
          }
          else {
            dispatch(getServiceRequestCountListSuccess(updateCountList(visitServiceRequestCountList, resp)))
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
  return (dispatch, getState) => {
    let {activeTab} = getState().dashboardState.individualsListState
    let get = (activeTab === entityDashboardTab.serviceRequests) ? ServiceRequestGet(API.getServiceStatus) : Get(API.getServiceProviderVisitStatus)
    dispatch(startLoading())
    return get
      .then(resp => {
        // dispatch(getUpdatedStatus(resp.data, activeTab))
        dispatch(getServiceRequestStatusSuccess(getUpdatedStatusForSrSv(resp.data, activeTab)))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getUpdatedStatusForSrSv = (data, activeTab) => {
  let isServiceRequestTab = (activeTab === entityDashboardTab.serviceRequests)
  let statusToFilter = isServiceRequestTab ? ENTITY_SR_STATUS : ENTITY_SV_STATUS

  _.forEach(data, function (obj) { 
    obj.isActive = false; 
      if(!isServiceRequestTab) {
        obj.keyValue = obj.name
      }
  });

  let updatedData = data.filter(itemX => statusToFilter.includes(itemX.keyValue));

  return updatedData
}

export const getServiceRequestStatusSuccess = data => {
return {
    type: VisitServiceRequestList.getServiceRequestStatusSuccess,
    data
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