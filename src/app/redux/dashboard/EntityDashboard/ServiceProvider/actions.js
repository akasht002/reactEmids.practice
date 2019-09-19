import { API } from '../../../../services/api'
import { Post } from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions';
import { VisitServiceProviderList } from './bridge';
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';
import { ENTITY_DASHBOARD_STATUS } from '../../../../constants/constants';
import { formatPhoneNumber } from '../../../../utils/formatName';

export const setActiveSubTab = data => {
  return {
    type: VisitServiceProviderList.setActiveSubTab,
    data
  }
}

export const getServiceProviderCountListSuccess = data => {
  return {
    type: VisitServiceProviderList.getVisitsServiceProviderCountListSuccess,
    data
  }
}

export const getServiceProviderTableListSuccess = data => {
  return {
    type: VisitServiceProviderList.getVisitsServiceProviderTableListSuccess,
    data
  }
}

export const setPaginationRowCountSuccess = data => {
  return {
    type: VisitServiceProviderList.setPaginationRowCountSuccess,
    data
  }
}

export function getVisitServiceProviderCountList(data, isFilterApplied = false) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return Post(
      API.getVisitServiceProviderCount,
      data
    )
      .then(resp => {
        if (resp && resp.data) {
          let {activeSubTab, visitServiceProviderCountList} = getState().dashboardState.VisitServiceProviderState
          let filteredArray = resp.data.filter(item => {
            return caseInsensitiveComparer(activeSubTab, item.statusName)
          });
          let dataCount = checkDataCount(filteredArray)
          dispatch(setPaginationRowCountSuccess(dataCount));
            if(caseInsensitiveComparer(data.tab, ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.all) && !isFilterApplied) {
              dispatch(getServiceProviderCountListSuccess(resp.data))
            }
            else {
              dispatch(getServiceProviderCountListSuccess(updateCountList(visitServiceProviderCountList, resp)))
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

export function getVisitServiceProviderTableList(data) {
  return dispatch => {
    dispatch(startLoading())
    return Post(
      API.getVisitServiceProviderTable,
      data
    )
      .then(resp => {
        if (resp && resp.data) {
          let data = resp.data.map(res => {
            return {
              ...res,
              name: `${res.firstName} ${res.lastName}`,
              phoneNumber: formatPhoneNumber(res.phoneNumber)
            }
          })
          dispatch(getServiceProviderTableListSuccess(data))
        }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endLoading())
      })
  }
}

export function getPointofServicedata(data) {
  return dispatch => {
    let reqObj = {
      stateName: data.StateName.label,
      city: data.City,
      zip: data.Zip,
      street: data.StreetName
    }
    return Post(API.getGeologicalPosition, reqObj)
      .then(resp => {
        dispatch(getGeologicalPositionSuccess(resp.data))
        data.lat = resp.data.latitude;
        data.lon = resp.data.longitude;
        dispatch(getVisitServiceProviderTableList(data))
      })
      .catch(err => {
        logError(err)
      })
  }
}

export const getGeologicalPositionSuccess = data => {
  return {
    type: VisitServiceProviderList.getGeologicalPositionSuccess,
    data
  }
}

export function getFeedbackAlertDetails(data) {
  return dispatch => {
    dispatch(startFeedbackAlertLoading())
    return Post(API.getServiceProviderFeedbackList, data)
      .then(resp => {
        if (resp && resp.data) {
          dispatch(getFeedbackAlertDetailsSuccess(resp.data))
        }
        dispatch(endFeedbackAlertLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endFeedbackAlertLoading())
      })
  }
}

export const getFeedbackAlertDetailsSuccess = data => {
  return {
    type: VisitServiceProviderList.getFeedbackAlertDetailsSuccess,
    data
  }
}

export const startFeedbackAlertLoading = () => {
  return {
    type: VisitServiceProviderList.startFeedbackAlertLoading
  }
}

export const endFeedbackAlertLoading = () => {
  return {
    type: VisitServiceProviderList.endFeedbackAlertLoading
  }
}

export const savePaginationNumber = data => {
  return {
    type: VisitServiceProviderList.savePaginationNumber,
    data
  }
} 