import reducer from './reducer'
import { QuestionsList } from './bridge'


describe('QuestionsList  reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                questionsList: {},
                requestDetails:{},
                isLoading: false,
                startedTime: '',
                planDetails: {},
                taskPercentage: 0
            }
        );
    });

    it("should return the getQuestionsListSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.getQuestionsListSuccess,
            data: data
        })).toEqual(
            {
                questionsList: data
            }
        )
    });

    it("should return the saveStartedTime state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.saveStartedTime,
            data: data
        })).toEqual(
            {
                startedTime: data
            }
        )
    });

    it("should return the formDirtyFeedback state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.formDirtyFeedback,
            data: data
        })).toEqual(
            {
                questionsList: data
            }
        )
    });   

    it("should return the startLoading state",()=>{
        let  data = true
        expect(reducer(data, {
            type: QuestionsList.startLoading,
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
            type: QuestionsList.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: data
            }
        )
    });

    it("should return the saveTaskPercentage state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.saveTaskPercentage,
            data: data
        })).toBeDefined()                       
    });

    it("should return the setServiceVisitPlanDetail state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.setServiceVisitPlanDetail,
            data: data
        })).toBeDefined()                       
    });

    it("should return the getServiceRequestVisitDetialsSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: QuestionsList.getServiceRequestVisitDetialsSuccess,
            data: data
        })).toBeDefined()                       
    });
})