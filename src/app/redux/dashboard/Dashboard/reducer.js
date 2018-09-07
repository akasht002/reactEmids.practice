import { DashboardDetail } from './actions'

const defaultState = {
  conversationDetail: [],
  unreadCounts: [],
  serviceProvider: [],
  patientServiceRequest:[],
  serviceVist:[],
  serviceStatusLookUp:[],
  serviceVistCount:[],
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
        serviceVist: action.data
      }
      case DashboardDetail.get_service_request_success:
      return {
        ...state,
        serviceStatusLookUp: action.data
      }
      case DashboardDetail.get_service_visit_count:
      return{
        ...state,
        serviceVistCount:action.data
      }
    default:
      return state
  }
}

export default DashboardState
