import { API } from '../../../services/api'
import {
  ServiceRequestGet,
  ThirdPartyGet,
  ServiceRequestPost,
  ThirdPartyPost,
  ServiceRequestPut
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
  getVisitServiceEligibityStatusSuccess: 'getVisitServiceEligibityStatusSuccess/visitservicedetails',
  getDaysSuccess: 'getDaysSuccess/visitservicedetails',
  updateServiceRequestByServiceProviderSuccess: 'updateServiceRequestByServiceProviderSuccess/visitservicedetails',
  setEntityServiceProviderSuccess: 'getDaysSuccess/setEntityServiceProvider',
  canInitiateConversationSuccess:'canInitiateConversationSuccess/visitservicedetails',
  formDirtyVisitServiceDetails: 'formDirtyVisitServiceDetails/visitservicedetails',
  isScheduleLoading: 'isScheduleLoading/visitservicedetails',
  cancelHiredRequest: 'cancelHiredRequest/visitservicedetails'
}

export const getVisitServiceDetailsSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceDetailsSuccess,
    data
  }
}

export const scheduleLoading = data => {
  return {
    type: VisitServiceDetails.isScheduleLoading,
    data
  }
}

export const cancelHiredRequest = data => {
  return {
    type: VisitServiceDetails.cancelHiredRequest,
    data
  }
}


export const setEntityServiceProviderSuccess = data => {
  return {
    type: VisitServiceDetails.setEntityServiceProviderSuccess,
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

export const updateServiceRequestByServiceProviderSuccess = data => {
  return {
    type: VisitServiceDetails.updateServiceRequestByServiceProviderSuccess,
    data
  }
}

export const canInitiateConversationSuccess = data => {
  return {
    type: VisitServiceDetails.canInitiateConversationSuccess,
    data
  }
}

export function dispatchServiceRequestByServiceProvider() {
  return dispatch => {
    dispatch(push(Path.dashboard))
  }
}

export function setEntityServiceProvider(data) {
  return dispatch => { dispatch(setEntityServiceProviderSuccess(data)) }
}

export function formDirtyVisitServiceDetails() {
  return {
    type: VisitServiceDetails.formDirtyVisitServiceDetails
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
    ServiceRequestPut(API.cancelServiceRequestByServiceProvider, model)
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
  return (dispatch, getState) => {
    let currstate = getState();
    let serviceProviderId = getUserInfo().isEntityServiceProvider ? currstate.visitSelectionState.VisitServiceDetailsState.entityServiceProviderId
      : getUserInfo().serviceProviderId
    dispatch(getServiceRequestId(data));
    dispatch(startLoading())
    ServiceRequestGet(API.getServiceRequestDetails + `${data}/${serviceProviderId}`)
      .then(resp => {
        dispatch(getVisitServiceDetailsSuccess(resp.data));
        dispatch(canInitiateConversation(resp.data));
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function clearVisitServiceSchedule() {
  return dispatch => dispatch(getVisitServiceScheduleSuccess([]))
}


export function getVisitServiceSchedule(data, pageNumber) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let pageSize = 10
  return dispatch => {
    dispatch(scheduleLoading(true));
    ServiceRequestGet(API.getServiceRequestSchedule + `${data}/${serviceProviderId}/${pageNumber}/${pageSize}`)
      .then(resp => {
        dispatch(getVisitServiceScheduleSuccess(resp.data))
        dispatch(scheduleLoading(false));
      })
      .catch(err => {
        dispatch(scheduleLoading(false));
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

export const getDaysSuccess = (data) => {
  return {
    type: VisitServiceDetails.getDaysSuccess,
    data
  }
}

export function getDays() {
  return (dispatch) => {
    dispatch(startLoading());
    ServiceRequestGet(API.servicerequest + `LookUp/Days`).then((resp) => {
      dispatch(getDaysSuccess(resp.data))
      dispatch(endLoading());
    }).catch((err) => {
      dispatch(endLoading());
    })
  }
};



export function cancelInvitedServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestPut(API.cancelInvitedServiceProvider, model)
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

export function cancelAppliedServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    dispatch(startLoading())
    ServiceRequestPut(API.cancelAppliedServiceProvider + `${data.serviceRequestId}/${serviceProviderId}`, model)
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


export function cancelHiredServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: 0,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    dispatch(cancelHiredRequest(true))
    ServiceRequestPut(API.cancelHiredServiceProvider, model)
      .then(resp => {
        dispatch(cancelHiredRequest(false))
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(cancelHiredRequest(false))
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function canInitiateConversation(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  return (dispatch) => {
    dispatch(startLoading());
    ThirdPartyGet(API.canInitiateConversation + `${serviceProviderId}/${data.patient.patientId}`).then((resp) => {
      dispatch(canInitiateConversationSuccess(resp.data))
      dispatch(endLoading());
    }).catch((err) => {
      dispatch(endLoading());
    })
  }
};
