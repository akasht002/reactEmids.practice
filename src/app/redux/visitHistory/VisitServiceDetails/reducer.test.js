import VistServiceHistoryDetails from './reducer'
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
 

describe('vistServiceHistoryDetails reducer test case', () => {
    it("should return the initial state", () => {
        expect(VistServiceHistoryDetails(undefined, {})).toEqual(
            
                {
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
                }
            
        );
    });

    it('should create an action to getVisitServiceHistoryListSuccess', () => {
        let data = {}
        const expectedAction = {
            VisitServiceHistory:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getVisitServiceHistoryListSuccess,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceHistoryDetailsSuccess', () => {
        let data = {}
        const expectedAction = {
            VisitServiceHistory:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to updateVisitHistoryFilter', () => {
        let data = {}
        const expectedAction = {
            selectedFilterState:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.updateVisitHistoryFilter,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestId', () => {
        let data = {}
        const expectedAction = {
            ServiceRequestId:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getServiceRequestId,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getServiceCategorySuccess', () => {
        let data = {}
        const expectedAction = {
            serviceCategories:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getServiceCategorySuccess,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to getSubmittedResponse', () => {
        let data = {}
        const expectedAction = {
            submittedResponse:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getSubmittedResponse,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getAllServiceProviders', () => {
        let data = {}
        const expectedAction = {
            serviceProviders:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getAllServiceProviders,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getVisitServiceHistoryByIdDetailSuccess', () => {
        let data = {}
        const expectedAction = {
            VisitServiceDetails:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to clearServiceTypes', () => {
        let data = {}
        const expectedAction = {
            typeList: []
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.clearServiceTypes,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to clearServiceProviders', () => {
        let data = {}
        const expectedAction = {
            serviceProviders:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.clearServiceProviders,
            data
        })).toEqual(expectedAction)
    })



    it('should create an action to getServiceTypeSuccess', () => {
        let data = {}
        const expectedAction = {
            typeList:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getServiceTypeSuccess,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getHistoryListCountSuccess', () => {
        let data = {}
        const expectedAction = {
            historyListCount:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getHistoryListCountSuccess,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getVisitFeedBack', () => {
        let data = {}
        const expectedAction = {
            VisitFeedback:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getVisitFeedBack,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to formDirty', () => {
        let data = {}
        const expectedAction = {
            VisitFeedback: []
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.formDirty,
            data
        })).toEqual(expectedAction)
    })


    it('should create an action to getAllPatientForServiceProviders', () => {
        let data = {}
        const expectedAction = {
            PatientForServiceproviders:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.getAllPatientForServiceProviders,
            data
        })).toEqual(expectedAction)
    })

    it('should create an action to visitHistoryLoading', () => {
        let data = {}
        const expectedAction = {
            isLoading:data
        }
        expect(VistServiceHistoryDetails(data, {
            type: vistServiceHistoryDetails.visitHistoryLoading,
            data
        })).toEqual(expectedAction)
    })
});