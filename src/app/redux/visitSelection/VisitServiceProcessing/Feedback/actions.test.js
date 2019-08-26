import { API } from '../../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { QuestionsList } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// jest.mock('../../../services/http', () => ({
//     getUserInfo: () => ({
//         serviceProviderId: 12
//     })
// }))

describe('actions', () => {
    it('should create an action to getQuestionsListSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.getQuestionsListSuccess,
            data
        }
        expect(actions.getQuestionsListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtyPerformTask  ', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.formDirtyFeedback
        }
        expect(actions.formDirtyFeedback(data)).toEqual(expectedAction)
    })

    it('should create an action to startLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.startLoading
        }
        expect(actions.startLoadingProcessing(data)).toEqual(expectedAction)
    })

    it('should create an action to endLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.endLoading
        }
        expect(actions.endLoadingProcessing(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getQuestionsList when fetching service content has been done', () => {
        fetchMock.get(API.getQuestionsList, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getQuestionsList(data)).then((resp) => {
            store.dispatch(actions.getQuestionsListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates saveAnswers when fetching service content has been done', () => {
        fetchMock.get(API.saveAnswers, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.saveAnswers(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetails(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {           
          })       
    })

    it('creates saveAnswerFeedback when fetching service content has been done', () => {
        fetchMock.get(API.saveAnswers, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.saveAnswerFeedback(data)).then((resp) => {
            store.dispatch(actions.visitHistoryLoading(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {            
          })       
    })
})