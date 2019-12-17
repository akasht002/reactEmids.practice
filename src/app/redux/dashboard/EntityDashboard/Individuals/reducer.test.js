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

    it('should handle resetContracts', () => {
        expect(
            reducer([], {
                type: IndividualsList.resetContracts,
                data: ["data"]
            })
        ).toEqual(
            {
                contracts: ["data"]
            }
        )
    })

    it('should handle clearState', () => {
        expect(
            reducer([], {
                type: IndividualsList.clearState,
                data: ["data"]
            })
        ).toEqual(
            {
                genderId: ["data"]
            }
        )
    })

    it('should handle savePaginationNumber', () => {
        expect(
            reducer([], {
                type: IndividualsList.savePaginationNumber,
                data: ["data"]
            })
        ).toEqual(
            {
                savedPaginationNumber: ["data"]
            }
        )
    })

    it('should handle setFromDate', () => {
        expect(
            reducer([], {
                type: IndividualsList.setFromDate,
                data: ["data"]
            })
        ).toEqual(
            {
                fromDate: ["data"]
            }
        )
    })

    it('should handle setToDate', () => {
        expect(
            reducer([], {
                type: IndividualsList.setToDate,
                data: ["data"]
            })
        ).toEqual(
            {
                toDate: ["data"]
            }
        )
    })

    it('should handle setActiveStatusForAllTab', () => {
        expect(
            reducer([], {
                type: IndividualsList.setActiveStatusForAllTab,
                data: ["data"]
            })
        ).toEqual(
            {
                activeStatus: ["data"]
            }
        )
    })

    it('should handle getClinicalConditionSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getClinicalConditionSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                clincalCondition: ["data"]
            }
        )
    })

    it('should handle getGenderSuccess', () => {
        expect(
            reducer([], {
                type: IndividualsList.getGenderSuccess,
                data: ["data"]
            })
        ).toEqual(
            {
                genderType: ["data"]
            }
        )
    })

    it('should handle clearClinicalCondition', () => {
        expect(
            reducer([], {
                type: IndividualsList.clearClinicalCondition,
                data: ["data"]
            })
        ).toEqual(
            {
                clincalCondition: ["data"]
            }
        )
    })

    it('should handle clearGenderType', () => {
        expect(
            reducer([], {
                type: IndividualsList.clearGenderType,
                data: ["data"]
            })
        ).toEqual(
            {
                genderType: ["data"]
            }
        )
    })

    it('should handle setGenderId', () => {
        expect(
            reducer([], {
                type: IndividualsList.setGenderId,
                data: ["data"]
            })
        ).toEqual(
            {
                genderId: ["data"]
            }
        )
    })

    it('should handle setFilterApplied', () => {
        expect(
            reducer([], {
                type: IndividualsList.setFilterApplied,
                data: ["data"]
            })
        ).toEqual(
            {
                filterApplied: ["data"]
            }
        )
    })

    it('should handle setMemberContractId', () => {
        expect(
            reducer([], {
                type: IndividualsList.setMemberContractId,
                data: ["data"]
            })
        ).toEqual(
            {
                memberContractId: ["data"]
            }
        )
    })

    it('should handle setAgeRange', () => {
        expect(
            reducer([], {
                type: IndividualsList.setAgeRange,
                data: ["data"]
            })
        ).toEqual(
            {
                ageRange: ["data"]
            }
        )
    })

    
    it('should handle setClinicalConditions', () => {
        expect(
            reducer([], {
                type: IndividualsList.setClinicalConditions,
                data: ["data"]
            })
        ).toEqual(
            {
                clinicalConditions: ["data"]
            }
        )
    })

    it('should handle setImpersinated', () => {
        expect(
            reducer([], {
                type: IndividualsList.setImpersinated,
                data: ["data"]
            })
        ).toEqual(
            {
                isImpersinated: ["data"]
            }
        )
    })

})