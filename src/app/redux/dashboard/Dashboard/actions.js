import axios from 'axios'
import { ServiceRequestGet } from '../../../services/http'
import {
  API,
  messageURL
} from '../../../services/api'
import { startLoading, endLoading } from '../../loading/actions'
import { formatDate } from '../../../utils/validations'
import {
  PAGE_NO,
  PAGE_SIZE,
  MSG_SERVICE_PROVIDER,
  MSG_TYPE,
  DEFAULT_SERVICE_STATUS
} from '../../constants/constants'
import { getUserInfo } from '../../../services/http';

export const DashboardDetail = {
  get_conversation_detail_success: 'get_conversation_detail_success/dashboard',
  get_conversation_detail: 'get_conversation_detail/dashboard',
  set_unread_conversation_count_detail: 'set_unread_conversation_count_detail/dashboard',
  get_service_provider_detail_success: 'get_service_provider_detail_success/dashboard',
  get_service_provider_detail: 'get_service_provider_detail/dashboard',
  get_patient_service_request_detail: 'get_patient_service_request_detail/dashboard',
  get_patient_service_request_detail_success: 'get_patient_service_request_detail_success/dashboard',
  get_patient_visit_detail: 'get_patient_visit_detail/dashboard',
  get_patient_visit_detail_success: 'get_patient_visit_detail_success/dashboard',
  get_service_request_success: 'get_service_request_success/dashboard',
  get_service_request: 'get_service_request/dashboard',
  get_service_visit_count: 'get_service_visit_count'
}

export const getServiceStatusSuccess = data => {
  return {
    type: DashboardDetail.get_service_request_success,
    data
  }
}

export function getServiceStatusDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(API.getServiceRequestStatus)
      .then(resp => {
        dispatch(getServiceStatusSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getPatientVisitDetailSuccess = data => {
  return {
    type: DashboardDetail.get_patient_visit_detail_success,
    data
  }
}

export const getServiceVisitCountSuccess = data => {
  return {
    type: DashboardDetail.get_service_visit_count,
    data
  }
}

export function getServiceVisitCount (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(
      API.getServiceVisitsCount +
      getUserInfo().serviceProviderId +
        '/' +
        formatDate(data.start_date) +
        '/' +
        formatDate(data.end_date)
    )
      .then(resp => {
        dispatch(getServiceVisitCountSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getServiceProviderVists (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(
      API.getServiceProviderVists +  getUserInfo().serviceProviderId + '/' + data
    )
      .then(resp => {
        dispatch(getPatientVisitDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getPatientServiceRequestDetailSuccess = data => {
  return {
    type: DashboardDetail.get_patient_service_request_detail_success,
    data
  }
}

export function getPatientServiceRequestDetail (data) {
  let id = data ? data : DEFAULT_SERVICE_STATUS;
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(
          API.getServiceProviderRequests +
          getUserInfo().serviceProviderId
          + '/' + id
      )
      .then(resp => {
        dispatch(getPatientServiceRequestDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getServiceProviderDetailSuccess = data => {
  return {
    type: DashboardDetail.get_service_provider_detail_success,
    data
  }
}

export function getServiceProviderDetail (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(
        API.getServiceProviders +  getUserInfo().serviceProviderId + '/'+PAGE_NO+'/'+PAGE_SIZE+'/'+ data
      )
      .then(resp => {
        dispatch(getServiceProviderDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const getConversationDetailSuccess = data => {
  return {
    type: DashboardDetail.get_conversation_detail_success,
    data
  }
}

export function getConversationDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(messageURL + API.getConversation + MSG_SERVICE_PROVIDER + MSG_TYPE)
      .then(resp => {
        dispatch(getConversationDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}
export const onUnreadCountSuccess = data => {
  return {
    type: DashboardDetail.set_unread_conversation_count_detail,
    data: data
  }
}
export function getUnreadMessageCounts (userId) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(
        messageURL +
          API.getUnreadCount +
          getUserInfo().serviceProviderId +
          '?participantType=i'
      )
      .then(resp => {
        dispatch(onUnreadCountSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}
