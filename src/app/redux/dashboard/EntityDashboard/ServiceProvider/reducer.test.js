import reducer from './reducer'
import { VisitServiceProviderList } from './bridge';


describe('Careteam Dashboard - Service Provider reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                visitServiceProviderCountList: [],
                "feedbackServiceVisits": [],
                visitServiceProviderTableList: [],
                paginationCount: '',
                activeSubTab: 'TotalInTheNetwork',
                geologicalPosition: [],
                "isLoadingFeedbackList": false
            }
        );
    });

    it("should return the getVisitsServiceProviderCountListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getVisitsServiceProviderCountListSuccess,
            data: data
        })).toEqual(
            {"visitServiceProviderCountList": {}}
        )
    });

    it("should return the getVisitsServiceProviderTableListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getVisitsServiceProviderTableListSuccess,
            data: data
        })).toEqual(
            {"visitServiceProviderTableList": {}}
        )
    });

    it("should return the setPaginationRowCountSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            {"paginationCount": {}}
        )
    });

    it("should return the setActiveSubTab state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.setActiveSubTab,
            data: data
        })).toEqual(
            {"activeSubTab": {}}
        )
    });

    it("should return the getGeologicalPositionSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getGeologicalPositionSuccess,
            data: data
        })).toEqual(
            {"geologicalPosition": {}}
        )
    });

    it("should return the getFeedbackAlertDetailsSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.getFeedbackAlertDetailsSuccess,
            data: data
        })).toEqual(
            {"feedbackServiceVisits": {}}
        )
    });

    it("should return the startFeedbackAlertLoading state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.startFeedbackAlertLoading,
            data: data
        })).toEqual(
            {"isLoadingFeedbackList": true}
        )
    });

    it("should return the endFeedbackAlertLoading state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceProviderList.endFeedbackAlertLoading,
            data: data
        })).toEqual(
            {"isLoadingFeedbackList": false}
        )
    });
});