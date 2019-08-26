import {
    VisitServiceList
} from './actions'

const defaultState = {
    visitServiceCountList: [],
    visitServiceTableList: [],
    serviceVisitStatusList: [],
    serviceType: [],
    paginationCount: '',
    activeSubTab: 'All'
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
        default:
            return state;
    }
}

export default VisitServiceCountListState;
