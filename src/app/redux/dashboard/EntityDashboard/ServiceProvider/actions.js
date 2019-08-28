import { API } from '../../../../services/api'
import { CareTeamPost, CareTeamGet, Post } from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions';
import { VisitServiceProviderList } from './bridge';
import _ from 'lodash'

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
          let activeSubTab = getState().dashboardState.VisitServiceProviderState.activeSubTab
          let visitServiceProviderCountList = getState().dashboardState.VisitServiceProviderState.visitServiceProviderCountList
          let dataCount = (resp.data && resp.data[0].totalCount > 0) ? resp.data[0].totalCount : 0
          dispatch(setPaginationRowCountSuccess(dataCount));
          if (activeSubTab !== 'All') {
            let index = _.findIndex(visitServiceProviderCountList, { statusName: resp.data[0].statusName });
            visitServiceProviderCountList.splice(index, 1, {
              label: resp.data[0].label,
              statusName: resp.data[0].statusName,
              subtext: resp.data[0].subtext,
              totalCount: resp.data[0].totalCount
            })
            dispatch(getServiceProviderCountListSuccess(visitServiceProviderCountList))
          }
          else {
            dispatch(getServiceProviderCountListSuccess(resp.data))
          }
        }
        dispatch(endLoading())
      })
      .catch(() => {
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
      .catch(() => {
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
    return CareTeamPost(API.getFeedbackAlertDetails, data)
      .then(resp => {
        if (resp && resp.data) {
          dispatch(getFeedbackAlertDetailsSuccess(resp.data))
        }
        dispatch(endFeedbackAlertLoading())
      })
      .catch(() => {
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