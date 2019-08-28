import reducer from './reducer';
import individualsListState from './reducer'
import { IndividualsList } from './bridge';

describe('Individuals reducer', () => {

    it('should return the initial state', () => {
        expect(individualsListState(undefined, {})).toEqual(
            {
                individualsCountList: [],
                individualsList: [],
                individualsVisitList: [],
                attributedProviders: [],
                contracts: [],
                cohorts: [],
                paginationCount: '',
                states: [],
                activeTab: '1',
                isLoaded: false,
                activeSubTab: 'All',
                individualsFeedbackList: [],
                isLoadingFeedbackList: false,
                savedPaginationNumber: 1
            }
        )
    })

    it('should handle getIndividualsCountListSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getIndividualsCountListSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "individualsCountList": ["data"]
            }
        )
    })

    it('should handle getIndividualsListSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getIndividualsListSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "individualsList": ["data"]
            }
        )
    })

    it('should handle getIndividualsVisitListSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getIndividualsVisitListSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "individualsList": ["data"]
            }
        )
    })

    it('should handle getAttributedProvidersSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getAttributedProvidersSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "attributedProviders": ["data"]
            }
        )
    })

    it('should handle getAllCohorts', () => {
        expect(
            reducer([], {
                type: IndividualsList.getAllCohorts,
                data: ["data"]
            })
        ).toEqual(
            {
                "cohorts": ["data"]
            }
        )
    })

    it('should handle getAllContractsSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getAllContractsSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "contracts": ["data"]
            }
        )
    })

    it('should handle resetFilter', () => {
        expect(
            reducer([], {
                type: IndividualsList.resetFilter,
                contracts: [],
                cohorts: [],
                attributedProviders: [],
            })
        ).toEqual(
            {
                contracts: [],
                cohorts: [],
                attributedProviders: [],
            }
        )
    })

    it('should handle setPaginationRowCountSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.setPaginationRowCountSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "paginationCount": ["data"]
            }
        )
    })

    it('should handle getStatesSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getStatesSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "states": ["data"]
            }
        )
    })

    it('should handle setActiveTab', () => {
        expect(
            reducer([], {
                type: IndividualsList.setActiveTab,
                data: ["data"]
            })
        ).toEqual(
            {
                activeTab: ["data"]
            }
        )
    })

    it('should handle isLoading', () => {
        expect(
            reducer([], {
                type: IndividualsList.isLoading,
                data: true
            })
        ).toEqual(
            {
                "isLoaded": true
            }
        )
    })

    it('should handle setActiveSubTab', () => {
        expect(
            reducer([], {
                type: IndividualsList.setActiveSubTab,
                data: ["data"]
            })
        ).toEqual(
            {
                "activeSubTab": ["data"]
            }
        )
    })

    it('should handle getIndividualsFeedbackListSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getIndividualsFeedbackListSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                "individualsFeedbackList": ["data"]
            }
        )
    })

    it('should handle startLoadingFeedbackList', () => {
        expect(
            reducer([], {
                type: IndividualsList.startLoadingFeedbackList,
                data: true
            })
        ).toEqual(
            {
                "isLoadingFeedbackList": true
            }
        )
    })

    it('should handle endLoadingFeedbackList', () => {
        expect(
            reducer([], {
                type: IndividualsList.endLoadingFeedbackList,
                data: false
            })
        ).toEqual(
            {
                "isLoadingFeedbackList": false
            }
        )
    })

})