import { DashboardDetail } from './actions'

const defaultState = {
  conversationDetail: [],
  unreadCounts: [],
  serviceProvider: [],
  patientServiceRequest:[],
  serviceVist:[],
  serviceStatusLookUp:[],
}

const DashboardState = (state = defaultState, action) => {
  switch (action.type) {
    case DashboardDetail.GET_CONVERSATION_DETAIL_SUCCESS:
      return {
        ...state,
        conversationDetail: action.data
      }
    case DashboardDetail.SET_UNREAD_CONVERSATION_COUNT_DETAILS:
      return {
        ...state,
        unreadCounts: action.data
      }
    case DashboardDetail.GET_SERVICE_PROVIDER_DETAIL_SUCCESS:
      return {
        ...state,
        serviceProvider: action.data
      }
      case DashboardDetail.GET_PATIENT_SERVICE_REQUEST_DETAIL_SUCCESS:
      return {
        ...state,
        patientServiceRequest: action.data
      }
      case DashboardDetail.GET_PATIENT_VISIT_DETAIL_SUCCESS:
      return {
        ...state,
        serviceVist: action.data
      }
      case DashboardDetail.GET_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        serviceStatusLookUp: action.data
      }
    default:
      return state
  }
}

export default DashboardState
