import reducer from './reducer'
import { QuestionsList } from './bridge'


describe('PerformTasks - languages reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                QuestionsList: {},
                isLoading: false
            }
        );
    });

    it("should return the getQuestionsListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: QuestionsList.getQuestionsListSuccess,
            data: data
        })).toEqual(
            {
                QuestionsList: data
            }
        )
    });

    it("should return the formDirtyFeedback state", () => {
        let data = {}
        expect(reducer(data, {
            type: QuestionsList.formDirtyFeedback,
            data: data
        })).toEqual(
            {
                QuestionsList: data
            }
        )
    });

    it("should return the startLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: QuestionsList.startLoading,
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
            type: QuestionsList.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: false
            }
        )
    });
});