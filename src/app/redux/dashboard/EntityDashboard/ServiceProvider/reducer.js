import { VisitServiceProviderList } from './bridge';
const defaultState = {
    visitServiceProviderCountList: [],
    visitServiceProviderTableList: [],
    paginationCount: '',
    activeSubTab: 'All',
    geologicalPosition: [],
    feedbackServiceVisits: [],
    isLoadingFeedbackList: false,
    savedPaginationNumber: 1
};

const VisitServiceProviderState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceProviderList.getVisitsServiceProviderCountListSuccess:
            return {
                ...state,
                visitServiceProviderCountList: action.data
            };

        case VisitServiceProviderList.getVisitsServiceProviderTableListSuccess:
            return {
                ...state,
                visitServiceProviderTableList: action.data
            };

        case VisitServiceProviderList.setPaginationRowCountSuccess:
            return {
                ...state,
                paginationCount: action.data
            }
        case VisitServiceProviderList.setActiveSubTab:
            return {
                ...state,
                activeSubTab: action.data
            };
        case VisitServiceProviderList.getGeologicalPositionSuccess:
            return {
                ...state,
                geologicalPosition: action.data
            }
        case VisitServiceProviderList.getFeedbackAlertDetailsSuccess:
            return {
                ...state,
                feedbackServiceVisits: action.data
            }
        case VisitServiceProviderList.startFeedbackAlertLoading:
            return {
                ...state,
                isLoadingFeedbackList: true
            };
        case VisitServiceProviderList.endFeedbackAlertLoading:
            return {
                ...state,
                isLoadingFeedbackList: false
            };
        case VisitServiceProviderList.savePaginationNumber:
            return {
                ...state,
                savedPaginationNumber: action.data
            };    
        default:
            return state;
    }
}

export default VisitServiceProviderState;
