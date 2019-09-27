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
  activeSubTab: 'All',
  serviceTypeIds: [],
  filterApplied: false,
  serviceRequestStatus: [],
  scheduleTypes: 'both',
  isImpersinated: false,
  selectedOption: ''
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
        serviceRequestStatusList: action.data
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
    case VisitServiceRequestList.setServiceType:
    return {
        ...state,
        serviceTypeIds: action.data
    }
    case VisitServiceRequestList.setFilterApplied:
    return {
        ...state,
        filterApplied: action.data
    }
    case VisitServiceRequestList.setServiceRequestStatus:
    return {
        ...state,
        serviceRequestStatus: action.data
    } 
    case VisitServiceRequestList.setScheduleType:
    return {
        ...state,
        scheduleTypes: action.data
    }
    case VisitServiceRequestList.setImpersinated:
    return {
        ...state,
        isImpersinated: action.data
    }
    case VisitServiceRequestList.setServiceCategory:
    return {
        ...state,
        selectedOption: action.data
    }
    case VisitServiceRequestList.resetFilter:
    return {
        ...state,
        serviceTypeIds: [],
        serviceRequestStatus: [],
        scheduleTypes: 'both',
        selectedOption: ''
    } 
    default:
      return state
  }
}

export default VisitServiceRequestState
