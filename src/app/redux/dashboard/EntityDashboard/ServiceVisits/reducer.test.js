import reducer from './reducer'
import { VisitServiceList } from './bridge';


describe('Entity Dashboard - Service Provider reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                visitServiceRequestCountList: [],
                "feedbackServiceVisits": [],
                visitServiceRequestTableList: [],
                paginationCount: '',
                activeSubTab: 'TotalInTheNetwork',
                geologicalPosition: [],
                "isLoadingFeedbackList": false
            }
        );
    });

    it("should return the getVisitsCountListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.getVisitsCountListSuccess,
            data: data
        })).toEqual(
            { "visitServiceRequestCountList": {} }
        )
    });

    it("should return the getVisitsTableListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.getVisitsTableListSuccess,
            data: data
        })).toEqual(
            { "visitServiceRequestTableList": {} }
        )
    });

    it("should return the setPaginationRowCountSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            { "paginationCount": {} }
        )
    });

    it("should return the setActiveSubTab state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setActiveSubTab,
            data: data
        })).toEqual(
            { "activeSubTab": {} }
        )
    });

    it("should return the getServiceRequestVisitStatusSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.getServiceRequestVisitStatusSuccess,
            data: data
        })).toEqual(
            { "serviceVisitStatusList": {} }
        )
    });

    it("should return the clearRequestStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.clearRequestStatus,
            data: data
        })).toEqual(
            { "serviceVisitStatusList": {} }
        )
    });

    it("should return the setServiceType state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setServiceType,
            data: data
        })).toEqual(
            { "serviceTypeIds": {} }
        )
    });

    it("should return the setServiceRequestStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setServiceRequestStatus,
            data: data
        })).toEqual(
            { "serviceRequestStatus": {} }
        )
    });

    it("should return the setImpersinated state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setImpersinated,
            data: data
        })).toEqual(
            { "isImpersinated": {} }
        )
    });

    it("should return the setServiceCategory state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setServiceCategory,
            data: data
        })).toEqual(
            { "selectedOption": {} }
        )
    });

    it("should return the setFilterApplied state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setFilterApplied,
            data: data
        })).toEqual(
            { "filterApplied": {} }
        )
    });

    it("should return the resetFilter state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.resetFilter,
            data: data
        })).toEqual(
            {
                serviceTypeIds: [],
                serviceRequestStatus: [],
                selectedOption: ''
            }
        )
    });
});