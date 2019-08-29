import { API } from '../../../../services/api'
import { Post, Get } from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions';
import { VisitServiceProviderList } from './bridge';
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';

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

export function getVisitServiceProviderCountList(data) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return Post(
      API.getVisitServiceProviderCount,
      data
    )
      .then(resp => {
        if (resp && resp.data) {
          let {activeSubTab, visitServiceProviderCountList} = getState().dashboardState.VisitServiceProviderState
          let dataCount = checkDataCount(resp)
          dispatch(setPaginationRowCountSuccess(dataCount));
          if (activeSubTab !== 'All') {
            dispatch(getServiceProviderCountListSuccess(updateCountList(visitServiceProviderCountList, resp)))
          }
          else {
            dispatch(getServiceProviderCountListSuccess(resp.data))
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
              name: `${res.firstName} ${res.lastName}`
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
    return Get(`${API.getServiceProviderFeedbackList}${data.serviceProviderId}/${data.pageNumber}/${data.pageSize}`)
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