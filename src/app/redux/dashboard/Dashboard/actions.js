import axios from 'axios'
import {
  API,
  baseURL,
  messageURL,
  baseURLServiceRequest
} from '../../../services/api'
import { startLoading, endLoading } from '../../loading/actions'
import { SERVICE_PROVIDER,MSG_SERVICE_PROVIDER } from '../../constants/constants'

export const DashboardDetail = {
  GET_CONVERSATION_DETAIL_SUCCESS: 'GET_CONVERSATION_DETAIL_SUCCESS',
  GET_CONVERSATION_DETAIL: 'GET_CONVERSATION_DETAIL',
  SET_UNREAD_CONVERSATION_COUNT_DETAILS: 'SET_UNREAD_CONVERSATION__COUNT_DETAILS',
  GET_SERVICE_PROVIDER_DETAIL_SUCCESS: 'GET_SERVICE_PROVIDER_DETAIL_SUCCESS',
  GET_SERVICE_PROVIDER_DETAIL: 'GET_SERVICE_PROVIDER_DETAIL',
  GET_PATIENT_SERVICE_REQUEST_DETAIL: 'GET_PATIENT_SERVICE_REQUEST_DETAIL',
  GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS: 'GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS',
  GET_PATIENT_VISIT_DETAIL: 'GET_PATIENT_VISIT_DETAIL',
  GET_PATIENT_VISIT_DETAIL_SUCCESS: 'GET_PATIENT_VISIT_DETAIL',
  GET_SERVICE_REQUEST_SUCCESS: 'GET_SERVICE_REQUEST_SUCCESS',
  GET_SERVICE_REQUEST: 'GET_SERVICE_REQUEST'
}

export const getServiceStatusSuccess = data => {
  return {
    type: DashboardDetail.GET_SERVICE_REQUEST_SUCCESS,
    data
  }
}

export function getServiceStatusDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(baseURL + API.getServiceRequestStatus)
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
    type: DashboardDetail.GET_PATIENT_VISIT_DETAIL_SUCCESS,
    data
  }
}

export function getServiceProviderVists (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(
        baseURLServiceRequest +
          API.getServiceProviderVists  + SERVICE_PROVIDER + '/'+ data
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
    type: DashboardDetail.GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS,
    data
  }
}

export function getPatientServiceRequestDetail (data) {
  let type = data ?data:38;
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(baseURLServiceRequest + API.getServiceProviderRequests + SERVICE_PROVIDER )
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
    type: DashboardDetail.GET_SERVICE_PROVIDER_DETAIL_SUCCESS,
    data
  }
}

export function getServiceProviderDetail (data) {
  console.log(data);
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(baseURL + API.getServiceProviders + SERVICE_PROVIDER + '/1/2/' + data)
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
    type: DashboardDetail.GET_CONVERSATION_DETAIL_SUCCESS,
    data
  }
}

export function getConversationDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(messageURL + API.getConversation + MSG_SERVICE_PROVIDER + '/S')
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
    type: DashboardDetail.SET_UNREAD_CONVERSATION_COUNT_DETAILS,
    data: data
  }
}
export function getUnreadMessageCounts (userId) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(messageURL + API.getUnreadCount + SERVICE_PROVIDER + '?participantType=i')
      .then(resp => {
        dispatch(onUnreadCountSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}
