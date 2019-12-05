import { VisitServiceProviderList } from './bridge';
const defaultState = {
    visitServiceProviderCountList: [],
    visitServiceProviderTableList: [],
    paginationCount: '',
    activeSubTab: 'All',
    geologicalPosition: [],
    feedbackServiceVisits: [],
    isLoadingFeedbackList: false,
    savedPaginationNumber: 1,
    isServiceProviderFeedbackTab: false,
    genderId: 0,
    maxExperience: 50,
    minExperience: 0,
    rating: 0,
    isImpersinated: false,
    filterApplied: false,
    feedBackCount: 0
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
        case VisitServiceProviderList.setServiceProviderFeedbackTab:
        return {
            ...state,
            isServiceProviderFeedbackTab: action.data
        }; 
        case VisitServiceProviderList.setGenderId:
        return {
            ...state,
            genderId: action.data
        }       
        case VisitServiceProviderList.setExperience:
        return {
            ...state,
            minExperience: action.data.minExperience,
            maxExperience: action.data.maxExperience
        } 
        case VisitServiceProviderList.setRating:
        return {
            ...state,
            rating: action.data
        }      
        case VisitServiceProviderList.resetFilter:
        return {
            ...state,
            genderId: 0,
            rating: 0,
            minExperience: 0,
            maxExperience: 50
        }   
        case VisitServiceProviderList.setImpersinated:
        return {
            ...state,
            isImpersinated: action.data
        }
        case VisitServiceProviderList.setFilterApplied:
        return {
            ...state,
            filterApplied: action.data
        }
        case VisitServiceProviderList.setFeedbackCount:
        return {
            ...state,
            feedBackCount: action.data
        }; 
        default:
            return state;
    }
}

export default VisitServiceProviderState;
