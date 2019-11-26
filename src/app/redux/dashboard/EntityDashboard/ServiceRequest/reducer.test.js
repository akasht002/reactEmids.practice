import reducer from './reducer'
import { VisitServiceRequestList } from './bridge'


describe('Careteam Dashboard - Service Request reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                visitServiceRequestCountList: [],
                visitServiceRequestTableList: [],
                serviceRequestStatusList: [],
                serviceType: [],
                scheduleType: [],
                requestDetails: [],
                approvalStatus: '',
                diagnosisCode: [],
                paginationCount: '',
                activeSubTab: 'All'
            }
        );
    });

    it("should return the getServiceRequestCountListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestCountListSuccess,
            data: data
        })).toEqual(
            {"visitServiceRequestCountList": {}}
        )
    });

    it("should return the getDiagnosisCodeSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getDiagnosisCodeSuccess,
            data: data
        })).toEqual(
            {"diagnosisCode": {}}
        )
    });

    it("should return the getServiceRequestTableListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestTableListSuccess,
            data: data
        })).toEqual(
            {"visitServiceRequestTableList": {}}
        )
    });

    it("should return the getServiceRequestStatusSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestStatusSuccess,
            updatedData: data
        })).toEqual(
            {"serviceRequestStatusList": {}}
        )
    });

    it("should return the clearRequestStatus state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.clearRequestStatus,
            data: data
        })).toEqual(
            {"serviceRequestStatusList": {}}
        )
    });

    it("should return the getScheduleTypeSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getScheduleTypeSuccess,
            data: data
        })).toEqual(
            {"scheduleType": {}}
        )
    });

    it("should return the clearScheduleType state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.clearScheduleType,
            data: data
        })).toEqual(
            {"scheduleType": {}}
        )
    });

    it("should return the getServiceRequestDetailsSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestDetailsSuccess,
            data: data
        })).toEqual(
            {"requestDetails": {}}
        )
    });

    it("should return the getServiceRequestApprovalStatus state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestApprovalStatus,
            data: data
        })).toEqual(
            {"approvalStatus": {}}
        )
    });

    it("should return the setPaginationRowCountSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            {"paginationCount": {}}
        )
    });

    it("should return the setActiveSubTab state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setActiveSubTab,
            data: data
        })).toEqual(
            {"activeSubTab": {}}
        )
    });
})