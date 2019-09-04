import { VisitServiceRequestList } from './bridge'

const defaultState = {
  visitServiceRequestCountList: [],
  visitServiceRequestTableList: [],
  serviceRequestStatusList: [],
  serviceType: [],
  scheduleType: [],
  requestDetails: [],
  approvalStatus: '',
  diagnosisCode: [],
  paginationCount: '',
  activeSubTab: 'All'
}

const VisitServiceRequestState = (state = defaultState, action) => {
  switch (action.type) {
    case VisitServiceRequestList.getServiceRequestCountListSuccess:
      return {
        ...state,
        visitServiceRequestCountList: action.data
      }
    case VisitServiceRequestList.getDiagnosisCodeSuccess:
      return {
        ...state,
        diagnosisCode: action.data
      }

    case VisitServiceRequestList.getServiceRequestTableListSuccess:
      return {
        ...state,
        visitServiceRequestTableList: action.data
      }
    case VisitServiceRequestList.getServiceRequestStatusSuccess:
      return {
        ...state,
        serviceRequestStatusList: action.updatedData
      }
    case VisitServiceRequestList.clearRequestStatus:
      return {
        ...state,
        serviceRequestStatusList: action.data
      }
    case VisitServiceRequestList.getScheduleTypeSuccess:
      return {
        ...state,
        scheduleType: action.updatedData
      }
    case VisitServiceRequestList.clearScheduleType:
      return {
        ...state,
        scheduleType: action.data
      }
    case VisitServiceRequestList.getServiceRequestDetailsSuccess:
      return {
        ...state,
        requestDetails: action.data
      }
    case VisitServiceRequestList.getServiceRequestApprovalStatus:
      return {
        ...state,
        approvalStatus: action.data
      }

      case VisitServiceRequestList.setPaginationRowCountSuccess:
      return {
          ...state,
          paginationCount: action.data
      }
    case VisitServiceRequestList.setActiveSubTab:
      return {
          ...state,
          activeSubTab: action.data
      }; 
    default:
      return state
  }
}

export default VisitServiceRequestState
