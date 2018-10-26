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
    typeList: [],
    historyListCount: ''
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
                VisitServiceHistory: action.data
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
        case vistServiceHistoryDetails.getServiceCategorySuccess:
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
        case vistServiceHistoryDetails.clearServiceTypes:
            return {
                ...state,
                typeList: []
            };
        case vistServiceHistoryDetails.clearServiceProviders:
            return {
                ...state,
                serviceProviders: action.data
            }
        case vistServiceHistoryDetails.getServiceTypeSuccess:
            return {
                ...state,
                typeList: action.data
            }
        case vistServiceHistoryDetails.getHistoryListCountSuccess:
            return {
                ...state,
                historyListCount: action.data
            }
        default:
            return state;
    }
}

export default vistServiceHistoryState;