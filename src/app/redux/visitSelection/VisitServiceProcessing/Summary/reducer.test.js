import reducer from './reducer'
import { SummaryDetails } from './bridge'


describe('PerformTasks - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                SummaryDetails: {},
                CalculationsData: {},
                actualTimeDiff: '',
                signature: '',
                VisitServiceElibilityStatus: '',
                isLoading: false,
            }
        );
    });

    it("should return the getSummaryDetailsSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.getSummaryDetailsSuccess,
            data: data
        })).toEqual(
            {
                SummaryDetails: data
            }
        )
    });

    it("should return the getCalculationsData state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.getCalculationsData,
            data: data
        })).toEqual(
            {
                CalculationsData: data
            }
        )
    });

    it("should return the startLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.startLoading,
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
            type: SummaryDetails.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: false
            }
        )
    });

    it("should return the saveOriginalTimeDiff state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.saveOriginalTimeDiff,
            data: data
        })).toEqual(
            {
                originalTimeDiff: data,
                actualTimeDiff: data,
                hourlyRate: data,
                taxPaid: data
            }
        )
    });

    it("should return the saveActualTimeDiff state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.saveActualTimeDiff,
            data: data
        })).toEqual(
            {
                actualTimeDiff: data
            }
        )
    });

    it("should return the getSavedSignatureSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.getSavedSignatureSuccess,
            data: data
        })).toEqual(
            {
                signature: data
            }
        )
    });

    it("should return the formDirtySummaryDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.formDirtySummaryDetails,
            data: data
        })).toEqual(
            {
                SummaryDetails: {},
                CalculationsData: {},
                signature: ''
            }
        )
    });

    it("should return the getVisitServiceEligibityStatusSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: SummaryDetails.getVisitServiceEligibityStatusSuccess,
            data: data
        })).toEqual(
            {
                VisitServiceElibilityStatus: data
            }
        )
    });
});