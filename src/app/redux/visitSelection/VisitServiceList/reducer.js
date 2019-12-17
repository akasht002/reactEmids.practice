import { VisitServiceList } from './bridge';

const defaultState = {
    visitServiceList: [],
    serviceRequestCount: 0,
    status: 0,
    isLoading: false,
    pageNumber: 1
};

const VisitServiceListState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceList.getVisitServiceListSuccess:
            return {
                ...state,
                visitServiceList: action.data
            };
        case VisitServiceList.serviceRequestCount:
            return {
                ...state,
                serviceRequestCount: action.data
            };
        case VisitServiceList.formDirtyVisitList:
            return {
                ...state,
                visitServiceList: []
            };
        case VisitServiceList.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case VisitServiceList.endLoading:
            return {
                ...state,
                isLoading: false
            };
        case VisitServiceList.setServiceRequestStatus:
            return {
                ...state,
                status: action.data,
            };
        case VisitServiceList.setPageNumber:
            return {
                ...state,
                pageNumber: action.data
            };
        default:
            return state;
    }
}

export default VisitServiceListState;
