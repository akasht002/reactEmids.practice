import { DashboardDetail } from './bridge'

const defaultState = {
  conversationDetail: [],
  unreadCounts: [],
  serviceProvider: [],
  patientServiceRequest: null,
  serviceVist: [],
  serviceStatusLookUp: [],
  serviceVistCount: [],
  serviceProviderList: [],
  serviceVisitDate: null,
  isConversationLoading: false,
  isServiceRequestLoading: false,
  isServiceVisitLoading:false,
  disableShowMore: false,
}

const DashboardState = (state = defaultState, action) => {
  switch (action.type) {
    case DashboardDetail.get_conversation_detail_success:
      return {
        ...state,
        conversationDetail: action.data
      }
    case DashboardDetail.set_unread_conversation_count_detail:
      return {
        ...state,
        unreadCounts: action.data
      }
    case DashboardDetail.get_service_provider_detail_success:
      return {
        ...state,
        serviceProvider: action.data
      }
    case DashboardDetail.get_patient_service_request_detail_success:
      return {
        ...state,
        patientServiceRequest: action.data
      }
    case DashboardDetail.get_patient_visit_detail_success:
      return {
        ...state,
        serviceVist: action.data,        
        disableShowMore: action.disableShowMore
      }
    case DashboardDetail.get_service_request_success:
      return {
        ...state,
        serviceStatusLookUp: action.data
      }
    case DashboardDetail.get_service_visit_count:
      return {
        ...state,
        serviceVistCount: action.data
      }
    case DashboardDetail.get_entity_service_provider_list:
      return {
        ...state,
        serviceProviderList: action.data
      }
    case DashboardDetail.setServiceVisitDate:
      return {
        ...state,
        serviceVisitDate: action.data
      }
    case DashboardDetail.setConversationLoader:
      return {
        ...state,
        isConversationLoading: action.data
      }
    case DashboardDetail.setServiceRequestLoader:
      return {
        ...state,
        isServiceRequestLoading: action.data
      }
    case DashboardDetail.setServiceVisitLoader:
      return {
        ...state,
        isServiceVisitLoading: action.data
      }
    default:
      return state
  }
}

export default DashboardState
