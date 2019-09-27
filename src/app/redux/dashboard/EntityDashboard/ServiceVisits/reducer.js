import { VisitServiceList } from './bridge'

const defaultState = {
    visitServiceCountList: [],
    visitServiceTableList: [],
    serviceVisitStatusList: [],
    serviceType: [],
    paginationCount: 0,
    activeSubTab: 'All',
    filterApplied: false,
    serviceTypeIds: [],
    serviceRequestStatus: [],
    isImpersinated: false,
    selectedOption: ''
};

const VisitServiceCountListState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceList.getVisitsCountListSuccess:
            return {
                ...state,
                visitServiceCountList: action.data
            };

        case VisitServiceList.getVisitsTableListSuccess:
            return {
                ...state,
                visitServiceTableList: action.data
            };
            case VisitServiceList.getServiceRequestVisitStatusSuccess:
            return {
                ...state,
                serviceVisitStatusList: action.updatedData
            };
            case VisitServiceList.clearRequestStatus:
            return {
                ...state,
                serviceVisitStatusList: action.data,
            };
            case VisitServiceList.setPaginationRowCountSuccess:
            return {
                ...state,
                paginationCount: action.data
            }
        case VisitServiceList.setActiveSubTab:
            return {
                ...state,
                activeSubTab: action.data
            };
        case VisitServiceList.setServiceType:
        return {
            ...state,
            serviceTypeIds: action.data
        }
        case VisitServiceList.setFilterApplied:
        return {
            ...state,
            filterApplied: action.data
        }
        case VisitServiceList.setServiceRequestStatus:
        return {
            ...state,
            serviceRequestStatus: action.data
        } 
        case VisitServiceList.setImpersinated:
        return {
            ...state,
            isImpersinated: action.data
        }
        case VisitServiceList.setServiceCategory:
        return {
            ...state,
            selectedOption: action.data
        }
        case VisitServiceList.resetFilter:
        return {
            ...state,
            serviceTypeIds: [],
            serviceRequestStatus: [],
            selectedOption: ''
        } 
        default:
            return state;
    }
}

export default VisitServiceCountListState;
