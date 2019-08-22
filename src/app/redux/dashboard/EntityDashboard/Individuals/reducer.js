import {
    IndividualsList
} from './bridge';
import moment from 'moment'

const defaultState = {
    individualsCountList: [],
    individualsList: [],
    individualsVisitList: [],
    attributedProviders: [],
    contracts: [],
    cohorts: [],
    paginationCount: 0,
    states: [],
    activeTab: '1',
    isLoaded: false,
    activeSubTab: 'All',
    individualsFeedbackList: [],
    isLoadingFeedbackList: false,
    savedPaginationNumber: 1,
    fromDate: moment().subtract(3, 'months'),
    toDate: moment().toDate()
};

const individualsListState = (state = defaultState, action) => {
    switch (action.type) {

        case IndividualsList.getIndividualsCountListSuccess:
            return {
                ...state,
                individualsCountList: action.data,   
            };

        case IndividualsList.getIndividualsListSuccess:
            return {
                ...state,
                individualsList: action.data
            };
        case IndividualsList.getIndividualsVisitListSuccess:
            return {
                ...state,
                individualsList: action.data
            };
        case IndividualsList.getAttributedProvidersSuccess:
            return {
                ...state,
                attributedProviders: action.data
            };
        case IndividualsList.getAllCohorts:
            return {
                ...state,
                cohorts: action.data
            };
        case IndividualsList.getAllContractsSuccess:
            return {
                ...state,
                contracts: action.data
            }
        case IndividualsList.resetFilter:
            return {
                ...state,
                contracts: action.contracts,
                cohorts: action.cohorts,
                attributedProviders: action.attributedProviders
            }
        case IndividualsList.setPaginationRowCountSuccess:
            return {
                ...state,
                paginationCount: action.data
            }
        case IndividualsList.getStatesSuccess:
            return {
                ...state,
                states: action.data
            };
        case IndividualsList.setActiveTab:
            return {
                ...state,
                activeTab: action.data
            };
        case IndividualsList.isLoading:
            return {
                ...state,
                isLoaded: action.data
            };
        case IndividualsList.clearState:
            return {
                ...state,
                individualsCountList: [],
                individualsList: [],
                individualsVisitList: [],
                attributedProviders: [],
                contracts: [],
                cohorts: [],
                paginationCount: 0,
                states: [],
                isLoaded: false
            };
        case IndividualsList.setActiveSubTab:
            return {
                ...state,
                activeSubTab: action.data
            };

        case IndividualsList.getIndividualsFeedbackListSuccess:
            return {
                ...state,
                individualsFeedbackList: action.data
            };

        case IndividualsList.startLoadingFeedbackList:
            return {
                ...state,
                isLoadingFeedbackList: true
            };
        case IndividualsList.endLoadingFeedbackList:
            return {
                ...state,
                isLoadingFeedbackList: false
            };
        case IndividualsList.savePaginationNumber:
            return {
                ...state,
                savedPaginationNumber: action.data
            }; 
        case IndividualsList.setFromDate:
        return {
            ...state,
            fromDate: action.data
        }; 
        case IndividualsList.setToDate:
        return {
            ...state,
            toDate: action.data
        };        
        default:
            return state;
    }
}

export default individualsListState;
