import reducer from './reducer'
import { VisitServiceList } from './bridge';


describe('Entity Dashboard - Service Provider reducer test case',()=>{
    it("should return the initial state",()=>{
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

    it("should return the getVisitsCountListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceList.getVisitsCountListSuccess,
            data: data
        })).toEqual(
            {"visitServiceRequestCountList": {}}
        )
    });

    it("should return the getVisitsTableListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceList.getVisitsTableListSuccess,
            data: data
        })).toEqual(
            {"visitServiceRequestTableList": {}}
        )
    });

    it("should return the setPaginationRowCountSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            {"paginationCount": {}}
        )
    });

    it("should return the setActiveSubTab state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceList.setActiveSubTab,
            data: data
        })).toEqual(
            {"activeSubTab": {}}
        )
    });
});