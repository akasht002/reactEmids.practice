import { API } from '../../../services/api'
import {
  ServiceRequestGet,
  ServiceRequestPut,
  ServiceRequestPost
} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { push } from '../../navigation/actions'
import { Path } from '../../../routes'
import { getUserInfo } from '../../../services/http'

export const VisitServiceDetails = {
  getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
  getVisitServiceScheduleSuccess: 'get_visit_service_schedule_success/visitservicedetails',
  getServiceRequestId: 'get_service_requestId/visitservicedetails',
  putHireServiceRequestByServiceProvider: 'putHireServiceRequestByServiceProvider/visitservicedetails'
}

export const getVisitServiceDetailsSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceDetailsSuccess,
    data
  }
}

export const getVisitServiceScheduleSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceScheduleSuccess,
    data
  }
}

export const getServiceRequestId = data => {
  return {
    type: VisitServiceDetails.getServiceRequestId,
    data
  }
}

export function hireServiceRequestByServiceProvider (data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestPost(
      API.applyServiceRequestByServiceProvider +
        data.serviceRequestId +
        '/' +
        serviceProviderId +
        '/'+
        data.type
    )
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function cancelServiceRequestByServiceProvider (data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestPost(API.cancelServiceRequestByServiceProvider, model)
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function getVisitServiceDetails (data) {
  return dispatch => {
    dispatch(getServiceRequestId(data))
    dispatch(startLoading())
    ServiceRequestGet(API.getServiceRequestDetails + data)
      .then(resp => {
        dispatch(getVisitServiceDetailsSuccess(resp.data))
        dispatch(push(Path.visitServiceDetails))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getVisitServiceSchedule (data) {
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestGet(API.getServiceRequestSchedule + data)
      .then(resp => {
        dispatch(getVisitServiceScheduleSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}
