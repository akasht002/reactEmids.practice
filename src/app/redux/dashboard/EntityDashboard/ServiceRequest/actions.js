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
import { vistServiceHistoryDetails } from '../../../visitHistory/VisitServiceDetails/bridge';

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
              serviceType: concatCommaWithSpace(res.serviceType),
              serviceCategory: res.serviceCategory && concatCommaWithSpace(res.serviceCategory)
            }
          })
          dispatch(getServiceRequestTableListSuccess(data))
        }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endLoading())
      })
  }
}

export function getScheduleType() {
  return (dispatch, getState) => {
    let {filterApplied} = getState().dashboardState.VisitServiceRequestState
    return PatientGet(API.getScheduleType)
      .then(resp => {
        dispatch(getScheduleTypeSuccess(resp.data, filterApplied))
      })
      .catch(err => {
        logError(err)
      })
  }
}

export const getScheduleTypeSuccess = (data, filterApplied) => {
  !filterApplied && data.forEach(obj => {
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
    let serviceRequestTab = (activeTab === entityDashboardTab.serviceRequests)
    let {filterApplied} = serviceRequestTab ? getState().dashboardState.VisitServiceRequestState :
    getState().dashboardState.VisitServiceCountListState
    let get = serviceRequestTab ? ServiceRequestGet(API.getServiceStatus) : Get(API.getServiceProviderVisitStatus)
    return get
      .then(resp => {
        dispatch(getServiceRequestStatusSuccess(getUpdatedStatusForSrSv(resp.data, activeTab, filterApplied)))
      })
      .catch(err => {
        logError(err)
      })
  }
}

export const getUpdatedStatusForSrSv = (data, activeTab, filterApplied) => {
  let isServiceRequestTab = (activeTab === entityDashboardTab.serviceRequests)
  let statusToFilter = isServiceRequestTab ? ENTITY_SR_STATUS : ENTITY_SV_STATUS
  
   _.forEach(data, function (obj) { 
    !filterApplied && (obj.isActive = false); 
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

export const checkServiceType = (data, id, checked) => {
  var foundIndex = data.findIndex(element => element.serviceTypeId === id);
  data[foundIndex].isChecked = checked;
    return {
      type: vistServiceHistoryDetails.getServiceTypeSuccess,
      data
  }
}

export const setServiceType = data => {
  return {
      type: VisitServiceRequestList.setServiceType,
      data
  } 
}

export const setFilterApplied = data => {
  return {
      type: VisitServiceRequestList.setFilterApplied,
      data
  }  
}

export const checkServiceRequestStatus = (data, id, checked) => {
  var foundIndex = data.findIndex(element => element.id === id);
  data[foundIndex].isActive = checked;
  return {
    type: VisitServiceRequestList.getServiceRequestStatusSuccess,
    data
  }
}

export const setServiceRequestStatus = data => {
  return {
      type: VisitServiceRequestList.setServiceRequestStatus,
      data
  } 
}

export const resetFilter = () => {
  return {
      type: VisitServiceRequestList.resetFilter
  }   
}


export const checkScheduleType = (data, id, checked) => {
  var foundIndex = data.findIndex(element => element.id === id);
  data[foundIndex].isChecked = checked;
  return {
    type: VisitServiceRequestList.getScheduleTypeSuccess,
    data
  }
}

export const setScheduleType = data => {
  return {
      type: VisitServiceRequestList.setScheduleType,
      data
  } 
}

export const setImpersinated = data => {
  return {
      type: VisitServiceRequestList.setImpersinated,
      data
  } 
}

export const setServiceCategory = data => {
  return {
      type: VisitServiceRequestList.setServiceCategory,
      data
  } 
}
