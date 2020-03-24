import { API } from '../../../../services/api';
import { Post } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { DATE_FORMATS, API_RESPONSE } from '../../../constants/constants';
import { getTimeZoneOffset, getHHMinSession } from '../../../../utils/dateUtility';
import { getValue } from '../../../../utils/userUtility'
import { getFullName, concatCommaWithSpace } from '../../../../utils/stringHelper'
import moment from 'moment';
import { VisitServiceList } from './bridge'
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';
import { ENTITY_DASHBOARD_STATUS, VISIT_PROCESSING_STATUS, VISIT_STATUS } from '../../../../constants/constants';
import { VisitServiceRequestList } from '../ServiceRequest/bridge';
import { vistServiceHistoryDetails } from '../../../visitHistory/VisitServiceDetails/bridge';

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

export function getVisitServiceCountList(data, isFilterApplied = false, onSuccess) {
    return (dispatch, getState) => {
        dispatch(startLoading())
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
                onSuccess && onSuccess()
                !onSuccess && dispatch(endLoading())

        }).catch((err) => {
            logError(err)
            dispatch(endLoading())
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
                            schedule: res.visitDate && `${moment(res.visitDate, DATE_FORMATS.yyyy_mm_dd).format(DATE_FORMATS.ddmm)}, ${getHHMinSession(res.visitDate)}`,
                            visitStatus: caseInsensitiveComparer(res.visitStatus, VISIT_PROCESSING_STATUS.inProgress.title) ? VISIT_STATUS.inProgress.keyValue : res.visitStatus,
                            serviceCategory: res.serviceCategory && concatCommaWithSpace(res.serviceCategory)
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
        type: VisitServiceList.setServiceType,
        data
    } 
  }
  
  export const setFilterApplied = data => {
    return {
        type: VisitServiceList.setFilterApplied,
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
        type: VisitServiceList.setServiceRequestStatus,
        data
    } 
  }
  
  export const resetFilter = () => {
    return {
        type: VisitServiceList.resetFilter
    }   
  }

  export const setImpersinated = data => {
    return {
        type: VisitServiceList.setImpersinated,
        data
    } 
  }

  export const setServiceCategory = data => {
    return {
        type: VisitServiceList.setServiceCategory,
        data
    } 
  }