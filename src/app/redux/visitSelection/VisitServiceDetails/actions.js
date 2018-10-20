import { API } from '../../../services/api'
import {
  ServiceRequestGet,
  ThirdPartyGet,
  ServiceRequestPost,
  ThirdPartyPost
} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { push } from '../../navigation/actions'
import { Path } from '../../../routes'
import { getUserInfo } from '../../../services/http'

export const VisitServiceDetails = {
  getVisitServiceDetailsSuccess: 'get_visit_service_details_success/visitservicedetails',
  getVisitServiceScheduleSuccess: 'get_visit_service_schedule_success/visitservicedetails',
  getServiceRequestId: 'get_service_requestId/visitservicedetails',
  updateHireServiceRequestByServiceProvider: 'updateHireServiceRequestByServiceProvider/visitservicedetails',
  getVisitServiceEligibityStatusSuccess: 'getVisitServiceEligibityStatusSuccess/visitservicedetails'
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

export const getVisitServiceEligibityStatusSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceEligibityStatusSuccess,
    data
  }
}

export function updateServiceRequestByServiceProvider(data) {
  let modelData = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: getUserInfo().serviceProviderId,
    applyOrNotInterested: data.type
  }
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestPost(
      API.applyServiceRequestByServiceProvider,
      modelData
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

export function cancelServiceRequestByServiceProvider(data) {
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

export function getVisitServiceDetails(data) {
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

export function getVisitServiceSchedule(data) {
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestGet(API.getServiceRequestSchedule + `${data}/${getUserInfo().serviceProviderId}`)
      .then(resp => {
        dispatch(getVisitServiceScheduleSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getVisitServiceEligibilityStatus(data) {
  return (dispatch) => {
    dispatch(startLoading());
    ThirdPartyPost(API.getServiceRequestEligibilityStatus, data).then((resp) => {
      dispatch(getVisitServiceEligibityStatusSuccess(resp.data))
      dispatch(endLoading());
    }).catch((err) => {
      dispatch(endLoading());
    })
  }
};
