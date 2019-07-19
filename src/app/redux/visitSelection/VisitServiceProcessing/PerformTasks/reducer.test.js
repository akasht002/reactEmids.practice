import reducer from './reducer'
import { PerformTasks } from './bridge'


describe('PerformTasks - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                PerformTasksList: {},
                ServiceRequestVisitId: '',
                startedTime: '',
                SummaryDetails: '',
                visitStatus: '',
                isLoading: false
            }
        );
    });

    it("should return the getServiceRequestVisitId state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: PerformTasks.getServiceRequestVisitId,
            data: data
        })).toEqual(
            {
                ServiceRequestVisitId: data
            }
        )
    });

    it("should return the getSummaryDetailsSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: PerformTasks.getSummaryDetailsSuccess,
            data: data
        })).toEqual(
            {
                SummaryDetails: data
            }
        )
    });

    it("should return the saveStartedTime state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: PerformTasks.saveStartedTime,
            data: data
        })).toEqual(
            {
                startedTime: data
            }
        )
    });

    it("should return the formDirtyPerformTask state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: PerformTasks.formDirtyPerformTask,
            data: data
        })).toEqual(
            {
                PerformTasksList: data
            }
        )
    });

    it("should return the startLoading state",()=>{
        let  data = true
        expect(reducer(data, {
            type: PerformTasks.startLoading,
            data: data
        })).toEqual(
            {
                isLoading: data
            }
        )
    });

    it("should return the endLoading state",()=>{
        let  data = false
        expect(reducer(data, {
            type: PerformTasks.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: data
            }
        )
    });

    it("should return the getPerformTasksListSuccess state",()=>{
        let  data = {"PerformTasksList": {"visitStatus": "44"}}
        expect(reducer(data, {
            type: PerformTasks.getPerformTasksListSuccess,
            data: data
        })).toBeDefined()                       
    });

    it("should return the getVisitStatus state",()=>{
        let  data = {"PerformTasksList": {"visitStatus": "44"}}
        expect(reducer(data, {
            type: PerformTasks.getVisitStatus,
            data: data
        })).toBeDefined()                       
    });
})