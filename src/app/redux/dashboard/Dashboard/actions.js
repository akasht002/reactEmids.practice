import _ from 'lodash'
import {
  ServiceRequestGet,
  Put,
  Get,
  ServiceRequestPost,
  MessageURLGet
} from '../../../services/http'
import { API } from '../../../services/api'
import { startLoading, endLoading } from '../../loading/actions'
import { formatDate } from '../../../utils/validations'
import {
  PAGE_NO,
  PAGE_SIZE,
  DEFAULT_SERVICE_REQUIEST_STATUS_DASHBOARD
} from '../../constants/constants'
import {
  DashboardConversationPagination,
  USERTYPES
} from '../../../constants/constants'
import { getUnreadMessageCounts } from '../../asyncMessages/actions'
import { getUserInfo } from '../../../services/http'
import {
  getVisitServiceSchedule
} from '../../visitSelection/VisitServiceDetails/actions';

export const DashboardDetail = {
  get_conversation_detail_success: 'get_conversation_detail_success/dashboard',
  get_conversation_detail: 'get_conversation_detail/dashboard',
  set_unread_conversation_count_detail:
    'set_unread_conversation_count_detail/dashboard',
  get_service_provider_detail_success:
    'get_service_provider_detail_success/dashboard',
  get_service_provider_detail: 'get_service_provider_detail/dashboard',
  get_patient_service_request_detail:
    'get_patient_service_request_detail/dashboard',
  get_patient_service_request_detail_success:
    'get_patient_service_request_detail_success/dashboard',
  get_patient_visit_detail: 'get_patient_visit_detail/dashboard',
  get_patient_visit_detail_success:
    'get_patient_visit_detail_success/dashboard',
  get_service_request_success: 'get_service_request_success/dashboard',
  get_service_request: 'get_service_request/dashboard',
  get_service_visit_count: 'get_service_visit_count/dashboard',
  get_entity_service_provider_list:
    'get_entity_service_provider_list/dashboard',
  setServiceVisitDate: 'setServiceVisitDate/dashboard',
  setConversationLoader : 'setConversationLoader/dashboard',
  setServiceRequestLoader : 'setServiceRequestLoader/dashboard',
  setServiceVisitLoader : 'setServiceVisitLoader/dashboard'
}

export const getServiceStatusSuccess = data => {
  return {
    type: DashboardDetail.get_service_request_success,
    data
  }
}

export function getServiceStatusDetail () {
  return (dispatch, getState) => {
    dispatch(setServiceRequestLoader(true))
    ServiceRequestGet(API.getServiceRequestStatus)
      .then(resp => {
        console.log(resp.data)
        dispatch(getServiceStatusSuccess(resp.data.slice(0, 5)))
        dispatch(setServiceRequestLoader(false))
      })
      .catch(err => {
        dispatch(setServiceRequestLoader(false))
      })
  }
}

// export const updateStandByModeSuccess = () => {}

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

export const getEntityServiceProviderListSuccess = data => {
  return {
    type: DashboardDetail.get_entity_service_provider_list,
    data
  }
}

export function getEntityServiceProviderList () {
  return (dispatch, getState) => {
    // dispatch(startLoading())
    Get(API.getEntityServiceProviderList + getUserInfo().serviceProviderId)
      .then(resp => {
        dispatch(getEntityServiceProviderListSuccess(resp.data))
        // dispatch(endLoading())
      })
      .catch(err => {
        // dispatch(endLoading())
      })
  }
}

export const setServiceVisitDate = data => {
  return {
    type: DashboardDetail.setServiceVisitDate,
    data
  }
}

export function getEntityServiceProviderListSearch (data) {
  return (dispatch, getState) => {
    dispatch(setServiceVisitLoader(true))
    Get(API.getEntityServiceProviderList + getUserInfo().serviceProviderId)
      .then(resp => {
        const filtered = _.filter(resp.data, function (o) {
          return (
            o.firstName.toLowerCase().indexOf(data.toLowerCase())  > -1
          )
        })
        dispatch(getEntityServiceProviderListSuccess(filtered))
        dispatch(setServiceVisitLoader(false))
      })
      .catch(err => {
        dispatch(setServiceVisitLoader(false))
      })
  }
}

export function getServiceProviderVists (data) {
  return (dispatch, getState) => {
    dispatch(setServiceVisitLoader(true))
    ServiceRequestGet(
      API.getServiceProviderVists + getUserInfo().serviceProviderId + '/' + data
    )
      .then(resp => {
        dispatch(getPatientVisitDetailSuccess(resp.data))
        dispatch(setServiceVisitLoader(false))
      })
      .catch(err => {
        dispatch(setServiceVisitLoader(false))
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
  let id = data || DEFAULT_SERVICE_REQUIEST_STATUS_DASHBOARD
  return (dispatch, getState) => {
    dispatch(setServiceRequestLoader(true))
    ServiceRequestGet(
      API.getServiceProviderRequests +
        getUserInfo().serviceProviderId +
        '/' +
        id
    )
      .then(resp => {
        dispatch(getPatientServiceRequestDetailSuccess(resp.data))
        dispatch(setServiceRequestLoader(false))
      })
      .catch(err => {
        dispatch(setServiceRequestLoader(false))
      })
  }
}

export const getServiceProviderDetailSuccess = data => {
  return {
    type: DashboardDetail.get_service_provider_detail_success,
    data
  }
}
export function updateEntityServiceVisit (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestPost(API.assignServiceVisit, data)
      .then(resp => {
        dispatch(getVisitServiceSchedule(data.serviceRequestId, 1))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getServiceProviderDetail (data) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    ServiceRequestGet(
      API.getServiceProviders +
        getUserInfo().serviceProviderId +
        '/' +
        PAGE_NO +
        '/' +
        PAGE_SIZE +
        '/' +
        data
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

export function getConversationDetail (data) {
  return (dispatch, getState) => {
    dispatch(setConversationLoader(true))
    MessageURLGet(
      API.getConversationSummary +
        getUserInfo().coreoHomeUserId +
        '/' +
        USERTYPES.SERVICE_PROVIDER +
        '/' +
        DashboardConversationPagination.pageNumber +
        '/' +
        DashboardConversationPagination.pageSize
    )
      .then(resp => {
        dispatch(getConversationDetailSuccess(resp.data))
        dispatch(setConversationLoader(false))
      })
      .catch(err => {
        dispatch(setConversationLoader(false))
      })
  }
}

export function updateStandByMode (data) {
  return dispatch => {
    dispatch(startLoading())

    Put(API.updateStandByMode + getUserInfo().serviceProviderId + '/' + data)
      .then(resp => {
        // dispatch(updateStandByModeSuccess())
        dispatch(endLoading())
      })
      .catch(err => {
        try {
        } catch (e) {
          if (e instanceof TypeError) {
          } else if (e instanceof RangeError) {
            dispatch(endLoading())
          } else if (e instanceof EvalError) {
            dispatch(endLoading())
          } else {
          }
        }
        console.log(err)
      })
  }
}

export function getConversationSummaryDashboardSignalR (conversationId) {
  return (dispatch, getState) => {
    let userId = getUserInfo().coreoHomeUserId
    let userType = USERTYPES.SERVICE_PROVIDER
    MessageURLGet(
      API.getConversationSummary +
        conversationId +
        '/' +
        userId +
        '/' +
        userType
    )
      .then(resp => {
        dispatch(getConversationSummaryItemSignalRSuceess(resp.data))
      })
      .catch(err => {
      })
  }
}

const getConversationSummaryItemSignalRSuceess = data => {
  return (dispatch, getState) => {
    let state = getState()
    let conversationSummaryData = [
      ...state.dashboardState.dashboardState.conversationDetail
    ]
    const index = conversationSummaryData.indexOf(
      conversationSummaryData.filter(
        el => el.conversationId === data.conversationId
      )[0]
    )
    if (index !== -1) {
      conversationSummaryData.splice(index, 1)
    }
    conversationSummaryData = [data, ...conversationSummaryData]
    dispatch(getConversationDetailSuccess(conversationSummaryData))
    dispatch(getUnreadMessageCounts())
  }
}

export const setConversationLoader =(data) =>{
  return {
    type: DashboardDetail.setConversationLoader,
    data
  } 
}

export const setServiceRequestLoader =(data) =>{
  return {
    type: DashboardDetail.setServiceRequestLoader,
    data
  }
}

export const setServiceVisitLoader =(data) =>{
  return {
    type: DashboardDetail.setServiceVisitLoader,
    data
  }
}