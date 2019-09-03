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
  DEFAULT_SERVICE_REQUIEST_STATUS_DASHBOARD,Pagination
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
import {
  getPerformTasksList,
  formDirtyPerformTask,
  getServiceVisitId
} from '../../visitSelection/VisitServiceProcessing/PerformTasks/actions';
import { DashboardDetail } from './bridge'
import { formDirty, getVisitServiceHistoryByIdDetail } from '../../visitHistory/VisitServiceDetails/actions';
import { formDirtyFeedback } from '../../visitSelection/VisitServiceProcessing/Feedback/actions';
import { getSummaryDetails, getSavedSignature, formDirtySummaryDetails } from '../../visitSelection/VisitServiceProcessing/Summary/actions';
import { START_VISIT, IN_PROGRESS,VISIT_SUMMARY, PAYMENT_PENDING } from '../../constants/constants'
import { dispatchToAssessmentProcessing,getServiceRequestVisitDeatilsSuccess } from '../../visitSelection/VisitServiceProcessing/Assessment/actions'

export const getServiceStatusSuccess = data => {
  return {
    type: DashboardDetail.get_service_request_success,
    data
  }
}

export function getServiceStatusDetail () {
  return (dispatch, getState) => {
    dispatch(setServiceRequestLoader(true))
    return ServiceRequestGet(API.getServiceRequestStatus)
      .then(resp => {
        console.log(resp.data)
        dispatch(getServiceStatusSuccess(resp.data.slice(0, 3)))
        dispatch(setServiceRequestLoader(false))
      })
      .catch(err => {
        dispatch(setServiceRequestLoader(false))
      })
  }
}

export const getPatientVisitDetailSuccess = (data,disableShowMore) => {
  return {
    type: DashboardDetail.get_patient_visit_detail_success,
    data,    
    disableShowMore
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
    return ServiceRequestGet(
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
    return Get(API.getEntityServiceProviderList + getUserInfo().serviceProviderId)
      .then(resp => {
        dispatch(getEntityServiceProviderListSuccess(resp.data))
      })
      .catch(err => {
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
    return Get(API.getEntityServiceProviderList + getUserInfo().serviceProviderId)
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

export function getServiceProviderVists (data,pageNumber = 1,flag = false) {
  return (dispatch, getState) => {
    dispatch(setServiceVisitLoader(true))
    return ServiceRequestGet(
      `${ API.getServiceProviderVisits}${getUserInfo().serviceProviderId}/${data}/${pageNumber}/${Pagination.pageSize}`
    )
      .then(resp => {
        let serviceVists =  flag ? getState().dashboardState.dashboardState.serviceVist :[];       
        let modifiedList = [...serviceVists,...resp.data];
        let disableShowMore  = resp.data.length !== Pagination.pageSize ? true : false;          
        dispatch(getPatientVisitDetailSuccess(modifiedList,disableShowMore))
        dispatch(setServiceVisitLoader(false))
      })
      .catch(err => {
        dispatch(getPatientVisitDetailSuccess([],true))
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
    return ServiceRequestGet(
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
export function updateEntityServiceVisit (data, pageNo) {
  return (dispatch, getState) => {
    dispatch(startLoading())
    return ServiceRequestPost(API.assignServiceVisit, data)
      .then(resp => {
        dispatch(getVisitServiceSchedule(data.serviceRequestId, pageNo, true))
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
    return ServiceRequestGet(
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
    return MessageURLGet(
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

    return Put(API.updateStandByMode + getUserInfo().serviceProviderId + '/' + data)
      .then(resp => {
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
    return MessageURLGet(
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

export function goToServiceVisitProcessing(data){
  let visitID = data.serviceRequestVisitId !==0 ? data.serviceRequestVisitId : data.servicePlanVisitId
  return (dispatch) => {
    switch (data.visitStatusId) {      
      case START_VISIT :       
        dispatch(getPerformTasksList(visitID, true))
        dispatch(formDirty());
        dispatch(formDirtyFeedback());
        dispatch(formDirtyPerformTask());
        break;
      case IN_PROGRESS :        
        dispatch(getPerformTasksList(visitID, true));
        dispatch(formDirty());
        dispatch(formDirtyFeedback());
        dispatch(formDirtyPerformTask());
        break;
      case PAYMENT_PENDING :
        dispatch(getServiceVisitId(visitID, true));
        dispatch(getSummaryDetails(visitID));
        dispatch(getSavedSignature(visitID));
        dispatch(formDirtySummaryDetails());
        dispatch(formDirtyFeedback());
        dispatch(formDirtyPerformTask());
        break;
      case VISIT_SUMMARY :
        dispatch(getVisitServiceHistoryByIdDetail(visitID))
        break;
      default:
    }
  }
}

export function goToAssessmentVisitProcessing(data){
  let visitID = data.serviceRequestVisitId !==0 ? data.serviceRequestVisitId : data.servicePlanVisitId
  return (dispatch) => {
    dispatch(getServiceRequestVisitDeatilsSuccess(data))
    switch (data.visitStatusId) { 
      case START_VISIT :       
        dispatch(dispatchToAssessmentProcessing(visitID))
      break;
      default:
     }
  }
}