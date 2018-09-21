import {
    vistServiceHistoryDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceHistory: [],
    selectedFilterState: {
        selectedFilterKey: null,
        selectedServiceCategories: {},
        seletedDateRange: {
            fromDate: null,
            toDate: null
        },
        selectedServiceProviderIds: {},
    },
    serviceCategories: null,
    submittedResponse: null,
    serviceProviders: null,    
    ServiceRequestId: '',
};

const vistServiceHistoryState = (state = defaultState, action) => {
    switch (action.type) {
        case vistServiceHistoryDetails.getVisitServiceHistoryListSuccess:
            return {
                ...state,
                VisitServiceHistory: action.data
            };
        case vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };
            case vistServiceHistoryDetails.updateVisitHistoryFilter:
            return {
                ...state,
                selectedFilterState: action.data
            }
            case vistServiceHistoryDetails.getServiceRequestId:
            return {
                ...state,
                ServiceRequestId: action.data
            };
        case vistServiceHistoryDetails.getServiceCategoriesSuccess:
            return {
                ...state,
                serviceCategories: action.data
            }
        case vistServiceHistoryDetails.getSubmittedResponse:
            return {
                ...state,
                submittedResponse: action.data
            }
        case vistServiceHistoryDetails.getAllServiceProviders:
            return {
                ...state,
                serviceProviders: action.data
            }
            case vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };
        default:
            return state;
    }
}

export default vistServiceHistoryState;
