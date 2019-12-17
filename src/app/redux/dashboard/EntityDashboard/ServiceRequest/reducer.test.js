import reducer from './reducer'
import { VisitServiceRequestList } from './bridge'


describe('Careteam Dashboard - Service Request reducer test case', () => {
    it("should return the initial state", () => {
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

    it("should return the getServiceRequestCountListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestCountListSuccess,
            data: data
        })).toEqual(
            { "visitServiceRequestCountList": {} }
        )
    });

    it("should return the getDiagnosisCodeSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getDiagnosisCodeSuccess,
            data: data
        })).toEqual(
            { "diagnosisCode": {} }
        )
    });

    it("should return the getServiceRequestTableListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestTableListSuccess,
            data: data
        })).toEqual(
            { "visitServiceRequestTableList": {} }
        )
    });

    it("should return the getServiceRequestStatusSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestStatusSuccess,
            updatedData: data
        })).toEqual(
            { "serviceRequestStatusList": {} }
        )
    });

    it("should return the clearRequestStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.clearRequestStatus,
            data: data
        })).toEqual(
            { "serviceRequestStatusList": {} }
        )
    });

    it("should return the getScheduleTypeSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getScheduleTypeSuccess,
            data: data
        })).toEqual(
            { "scheduleType": {} }
        )
    });

    it("should return the clearScheduleType state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.clearScheduleType,
            data: data
        })).toEqual(
            { "scheduleType": {} }
        )
    });

    it("should return the getServiceRequestDetailsSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestDetailsSuccess,
            data: data
        })).toEqual(
            { "requestDetails": {} }
        )
    });

    it("should return the getServiceRequestApprovalStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.getServiceRequestApprovalStatus,
            data: data
        })).toEqual(
            { "approvalStatus": {} }
        )
    });

    it("should return the setPaginationRowCountSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setPaginationRowCountSuccess,
            data: data
        })).toEqual(
            { "paginationCount": {} }
        )
    });

    it("should return the setActiveSubTab state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setActiveSubTab,
            data: data
        })).toEqual(
            { "activeSubTab": {} }
        )
    });

    it("should return the setServiceType state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setServiceType,
            data: data
        })).toEqual(
            { "serviceTypeIds": {} }
        )
    });

    it("should return the setFilterApplied state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setFilterApplied,
            data: data
        })).toEqual(
            { "filterApplied": {} }
        )
    });


    it("should return the setServiceRequestStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setServiceRequestStatus,
            data: data
        })).toEqual(
            { "serviceRequestStatus": {} }
        )
    });

    it("should return the setScheduleType state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setScheduleType,
            data: data
        })).toEqual(
            { "scheduleTypes": {} }
        )
    });

    it("should return the setImpersinated state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setImpersinated,
            data: data
        })).toEqual(
            { "isImpersinated": {} }
        )
    });


    it("should return the setServiceCategory state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.setServiceCategory,
            data: data
        })).toEqual(
            { "selectedOption": {} }
        )
    });

    it("should return the setServiceCategory state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceRequestList.resetFilter,
            data: data
        })).toEqual(
            {
                'serviceTypeIds': [],
                'serviceRequestStatus': [],
                'scheduleTypes': 'both',
                'selectedOption': ''
            }
        )
    });
})