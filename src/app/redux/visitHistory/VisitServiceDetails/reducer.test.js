import reducer from './reducer'
import { vistServiceHistoryDetails } from './bridge'


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
    isLoading: false
};
 

describe('Skills - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                defaultState
            }
        );
    });

    it('should create an action to getSkillsSuccess', () => {
        let data = {}
        const expectedAction = {
            type: vistServiceHistoryDetails.getSkillsSuccess,
            data
        }
        expect(reducer(data, {
            type: vistServiceHistoryDetails.getParticipantByConferenceIdSuccess,
            data: data
        })).toEqual(expectedAction)
    })
});