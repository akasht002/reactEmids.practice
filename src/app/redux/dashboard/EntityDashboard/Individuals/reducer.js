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
    paginationCount: 0,
    states: [],
    activeTab: '1',
    isLoaded: false,
    activeSubTab: 'All',
    individualsFeedbackList: [],
    isLoadingFeedbackList: false,
    savedPaginationNumber: 1,
    fromDate: moment().subtract(3, 'months'),
    toDate: moment().toDate(),
    activeStatus: 'All',
    clincalCondition: [],
    genderType: [],
    genderId: 0,
    filterApplied: false,
    memberContractId: 0,
    ageRange: {
       minimumAge: 0,
       maximumAge: 120
    },
    clinicalConditions: [],
    isImpersinated: false
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
        case IndividualsList.resetContracts:
        return {
            ...state,
            contracts: action.contracts
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
                genderId: 0
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
        case IndividualsList.setActiveStatusForAllTab:
            return {
                ...state,
                activeStatus: action.data
            };
        case IndividualsList.getClinicalConditionSuccess:
            return {
                ...state,
                clincalCondition: action.data
            } 
        case IndividualsList.getGenderSuccess:
            return {
                ...state,
                genderType: action.data
            }
        case IndividualsList.clearClinicalCondition:
            return {
                ...state,
                clincalCondition: action.data
            }    
        case IndividualsList.clearGenderType:
            return {
                ...state,
                genderType: action.data
            } 
        case IndividualsList.setGenderId:
        return {
            ...state,
            genderId: action.data
        }   
        case IndividualsList.setFilterApplied:
        return {
            ...state,
            filterApplied: action.data
        }
        case IndividualsList.setMemberContractId:
        return {
            ...state,
            memberContractId: action.data
        }  
        case IndividualsList.setAgeRange:
        return {
            ...state,
            ageRange: action.data
        }
        case IndividualsList.setClinicalConditions:
        return {
            ...state,
            clinicalConditions: action.data
        }                       
        case IndividualsList.setImpersinated:
        return {
            ...state,
            isImpersinated: action.data
        }     
        case IndividualsList.resetFilter:
        return {
            ...state,
            genderId: 0,
            clinicalConditions: [],
            memberContractId: 0,
            ageRange: {
               minimumAge: 0,
               maximumAge: 120
            }
        }                   
        default:
            return state;
    }
}

export default individualsListState;
