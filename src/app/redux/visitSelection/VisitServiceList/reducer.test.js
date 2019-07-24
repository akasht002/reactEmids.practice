import reducer from './reducer'
import { VisitServiceList } from './bridge'


describe('VisitServiceList  reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                visitServiceList: [],
                serviceRequestCount: 0,
                status: 0,
                isLoading: false
            }
        );
    });

    it("should return the getVisitServiceListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.getVisitServiceListSuccess,
            data: data
        })).toEqual(
            {
                visitServiceList: data
            }
        )
    });

    it("should return the serviceRequestCount state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.serviceRequestCount,
            data: data
        })).toEqual(
            {
                serviceRequestCount: data
            }
        )
    });

    it("should return the formDirtyVisitList state", () => {
        let data = []
        expect(reducer(data, {
            type: VisitServiceList.formDirtyVisitList,
            data: data
        })).toEqual(
            {
                visitServiceList: []
            }
        )
    });

    it("should return the endLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.startLoading,
            data: data
        })).toEqual(
            {
                isLoading: true
            }
        )
    });

    it("should return the endLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: false
            }
        )
    });

    it("should return the setServiceRequestStatus state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceList.setServiceRequestStatus,
            data: data
        })).toEqual(
            {
                status: data
            }
        )
    });
});