import { API } from '../../../../services/api'
import { Path } from '../../../../routes'
import { push } from '../../../navigation/actions'
import _ from 'lodash'
import {
  CareTeamPost,
  CareTeamGet,
  ServiceRequestGet,
  Get,
  CareTeamPut,
  Post,
  ServiceRequestPut
} from '../../../../services/http'
import moment from 'moment'
import { startLoading, endLoading } from '../../../loading/actions'
import { getValue } from '../../../../utils/userUtility'
import { YEAR_MONTH_DAY } from '../../../constants/constants';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { VisitServiceRequestList } from './bridge'

export const setActiveSubTab = data => {
  return {
    type: VisitServiceRequestList.setActiveSubTab,
    data
  }
}

export function getServiceRequestDetailsSuccess(data) {
  return {
    type: VisitServiceRequestList.getServiceRequestDetailsSuccess,
    data
  }
}
export function getServiceRequestApprovalStatus(data) {
  return {
    type: VisitServiceRequestList.getServiceRequestApprovalStatus,
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

export const getDiagnosisCodeSuccess = data => {
  return {
    type: VisitServiceRequestList.getDiagnosisCodeSuccess,
    data
  }
}
// +'?searchText='+data
export function getDiagnosisCode() {
  return dispatch => {
    dispatch(startLoading())
    return Get(API.getDiagnosisCode)
      .then(resp => {
        dispatch(getDiagnosisCodeSuccess(resp.data.slice(0, 25)))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getDiagnosisCodeText(data) {
  return dispatch => {
    return Get(API.getDiagnosisCode + '?searchText=' + data)
      .then(resp => {
        dispatch(getDiagnosisCodeSuccess(resp.data.slice(0, 25)))
      })
      .catch(err => {
      })
  }
}

export function postDiagnosisCode(data) {
  return dispatch => {
    dispatch(startLoading())
    return Post(API.postDiagnosisCode, data)
      .then(resp => {
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
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
          }
          else {
            dispatch(getServiceRequestCountListSuccess(resp.data))
          }
        }
        dispatch(endLoading())
      })
      .catch(() => {
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
              patientFullName: getValue(res.firstName) +
                ' ' +
                getValue(res.lastName)
            }
          })
          dispatch(getServiceRequestTableListSuccess(data))
        }
        dispatch(endLoading())
      })
      .catch(() => {
        dispatch(getServiceRequestTableListSuccess([]))
        dispatch(endLoading())
      })
  }
}

export const getServiceRequestStatusSuccess = data => {
  return {
    type: VisitServiceRequestList.getServiceRequestStatusSuccess,
    data
  }
}


export const getServiceRequestStatusNeedingApprovalSuccess = data => {
  return {
    type: VisitServiceRequestList.getServiceRequestStatusSuccess,
    data
  }
}

export function getServiceRequestStatus() {
  return dispatch => {
    dispatch(startLoading())
    return ServiceRequestGet(API.getServiceRequestCardStatus)
      .then(resp => {
        dispatch(getServiceRequestStatusSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getServiceRequestNeedingApproval() {
  return dispatch => {
    dispatch(startLoading())
    return ServiceRequestGet(API.getServiceRequestNeedingApproval)
      .then(resp => {
        dispatch(getServiceRequestStatusNeedingApprovalSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const clearRequestStatus = data => {
  return {
    type: VisitServiceRequestList.clearRequestStatus,
    data
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

export function getScheduleType() {
  return dispatch => {
    dispatch(startLoading())
    return Get(API.getScheduleType)
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
  return {
    type: VisitServiceRequestList.getScheduleTypeSuccess,
    data
  }
}

export function getServiceRequestDetails(data) {
  let id = data
  return dispatch => {
    dispatch(startLoading())
    return ServiceRequestGet(API.getServiceRequestDetails + `${id}`)
      .then(resp => {
        dispatch(getServiceRequestDetailsSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getApprovalStatus(data) {
  let serviceRequestId = data.id
  let approvalStatus = data.status
  return dispatch => {
    dispatch(startLoading())
    return CareTeamPut(API.getapprovalStatus + `${serviceRequestId}/${approvalStatus}`)
      .then(resp => {
        dispatch(getServiceRequestApprovalStatus(resp.data))
        dispatch(push(Path.careteamdashboard))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function cancelServiceRequest(data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    let modal = {
      serviceRequestId: data.serviceRequestId,
      serviceProviderId: 0,
      patientId: data.patientId,
      cancelledDescription: ""
    }
    return ServiceRequestPut(API.cancelServiceRequestByServiceProviderNew, modal).then((resp) => {
      dispatch(endLoading())
    }).catch((err) => {
      dispatch(endLoading())
    })
  }
}
