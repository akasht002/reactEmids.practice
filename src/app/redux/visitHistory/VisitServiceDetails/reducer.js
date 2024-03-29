import {
    vistServiceHistoryDetails
} from './bridge';

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
    historyListCount: '',
    VisitFeedback: [],
    PatientForServiceproviders: [],
    isLoading: false,
    assessmentQuestionsList: [],
    userFeedbackInfo: {}
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
        case vistServiceHistoryDetails.getVisitFeedBack:
            return {
                ...state,
                VisitFeedback: action.data
            };
        case vistServiceHistoryDetails.formDirty:
            return {
                ...state,
                VisitFeedback: []
            };
        case vistServiceHistoryDetails.getAllPatientForServiceProviders:
            return {
                ...state,
                PatientForServiceproviders: action.data
            };
        case vistServiceHistoryDetails.visitHistoryLoading:
            return {
                ...state,
                isLoading: action.data
            };
        case vistServiceHistoryDetails.getAssessmentQuestionsListSuccess:
            return {
                ...state,
                assessmentQuestionsList: action.data
            };
        case vistServiceHistoryDetails.getUserFeedbackInfoSuccess:
            return {
                ...state,
                userFeedbackInfo: action.data
            };   
        default:
            return state;
    }
}

export default vistServiceHistoryState;