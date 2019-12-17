import reducer from './reducer'
import { VisitServiceProviderList } from './bridge';


describe('Careteam Dashboard - Service Provider reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                visitServiceProviderCountList: [],
                "feedbackServiceVisits": [],
                visitServiceProviderTableList: [],
                paginationCount: '',
                activeSubTab: 'TotalInTheNetwork',
                geologicalPosition: [],
                "isLoadingFeedbackList": false,
                savedPaginationNumber: 1
            }
        );
    });

    it("should return the getVisitsServiceProviderCountListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getVisitsServiceProviderCountListSuccess,
            data: data
        })).toEqual(
            { "visitServiceProviderCountList": {} }
        )
    });

    it("should return the getVisitsServiceProviderTableListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getVisitsServiceProviderTableListSuccess,
            data: data
        })).toEqual(
            { "visitServiceProviderTableList": {} }
        )
    });

    it("should return the setPaginationRowCountSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            { "paginationCount": {} }
        )
    });

    it("should return the setActiveSubTab state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setActiveSubTab,
            data: data
        })).toEqual(
            { "activeSubTab": {} }
        )
    });

    it("should return the getGeologicalPositionSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getGeologicalPositionSuccess,
            data: data
        })).toEqual(
            { "geologicalPosition": {} }
        )
    });

    it("should return the getFeedbackAlertDetailsSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getFeedbackAlertDetailsSuccess,
            data: data
        })).toEqual(
            { "feedbackServiceVisits": {} }
        )
    });

    it("should return the startFeedbackAlertLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.startFeedbackAlertLoading,
            data: data
        })).toEqual(
            { "isLoadingFeedbackList": true }
        )
    });

    it("should return the endFeedbackAlertLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.endFeedbackAlertLoading,
            data: data
        })).toEqual(
            { "isLoadingFeedbackList": false }
        )
    });

    it("should return the savePaginationNumber state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.savePaginationNumber,
            data: data
        })).toEqual(
            { "savedPaginationNumber": data }
        )
    });

    it("should return the setServiceProviderFeedbackTab state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setServiceProviderFeedbackTab,
            data: data
        })).toEqual(
            { "isServiceProviderFeedbackTab": data }
        )
    });

    it("should return the setGenderId state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setGenderId,
            data: data
        })).toEqual(
            { "genderId": data }
        )
    });

    it("should return the setExperience state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setExperience,
            data: data
        })).toEqual(
            {
                "minExperience": {},
                "maxExperience": {}
            }
        )
    });

    it("should return the resetFilter state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.resetFilter,
            data: data
        })).toEqual(
            {
                genderId: 0,
                rating: 0,
                minExperience: 0,
                maxExperience: 50
            }
        )
    });

    it("should return the setImpersinated state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setImpersinated,
            data: data
        })).toEqual(
            { "isImpersinated": data }
        )
    });

    it("should return the setFilterApplied state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setFilterApplied,
            data: data
        })).toEqual(
            { "filterApplied": data }
        )
    });

    it("should return the setRating state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setRating,
            data: data
        })).toEqual(
            { "rating": data }
        )
    });
});