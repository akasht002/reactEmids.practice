import reducer from './reducer'
import { WorkHistory } from './bridge'


describe('Skills - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                workhistoryList: [],
                addeworkhistorySuccess: false,
                workhistoyFieldDetails: {
                    designation: '',
                    company: '',
                    location: '',
                    fromDate: '',
                    toDate: '',
                    description: '',
                    isWorking: false,
                    workHistoryId: '',
                    currentlyWorking: false
                }
            }
        );
    });

    it("should return the getWorkhistorySuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: WorkHistory.getWorkhistorySuccess,
            data: data
        })).toEqual(
            {
                workhistoryList: data
            }
        )
    });

    it("should return the getWorkhistoryFieldDetails state", () => {
        let data = {}
        expect(reducer(data, {
            type: WorkHistory.getWorkhistoryFieldDetails,
            data: data
        })).toEqual(
            {
                workhistoyFieldDetails: data
            }
        )
    });

    it("should return the addWorkhistorySuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: WorkHistory.addWorkhistorySuccess,
            addeworkhistorySuccess: true,
            workhistoyFieldDetails: {
                designation: '',
                company: '',
                location: '',
                fromDate: '',
                toDate: '',
                description: '',
                isWorking: false,
                workHistoryId: '',
                currentlyWorking: false
            }
        })).toBeDefined();
    });
});