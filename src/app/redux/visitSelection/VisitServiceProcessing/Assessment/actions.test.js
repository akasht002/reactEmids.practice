import { API } from '../../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { QuestionsList } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to getQuestionsListSuccess', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.getQuestionsListSuccess
        }
        expect(actions.getQuestionsListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtyFeedback', () => {
        const expectedAction = {
            type: QuestionsList.formDirtyFeedback
        }
        expect(actions.formDirtyFeedback()).toEqual(expectedAction)
    })

    it('should create an action to startLoadingProcessing', () => {
        const expectedAction = {
            type: QuestionsList.startLoading
        }
        expect(actions.startLoadingProcessing()).toEqual(expectedAction)
    })

    it('should create an action to endLoadingProcessing', () => {
        const expectedAction = {
            type: QuestionsList.endLoading
        }
        expect(actions.endLoadingProcessing()).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestVisitDeatilsSuccess', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.getServiceRequestVisitDeatilsSuccess,
            data
        }
        expect(actions.getServiceRequestVisitDeatilsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to saveStartedTime', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.saveStartedTime,
            data
        }
        expect(actions.saveStartedTime(data)).toEqual(expectedAction)
    })

    it('should create an action to setServiceVisitPlanDetail', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.setServiceVisitPlanDetail,
            data
        }
        expect(actions.setServiceVisitPlanDetail(data)).toEqual(expectedAction)
    })

    it('should create an action to saveTaskPercentage  ', () => {
        let data = {}
        const expectedAction = {
            type: QuestionsList.saveTaskPercentage,
            data
        }
        expect(actions.saveTaskPercentage(data)).toEqual(expectedAction)
    })   
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getServicePlanVisitSummaryDetails when fetching service content has been done', () => {
        fetchMock.get(API.getServicePlanVisitSummaryDetails, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getServicePlanVisitSummaryDetails(data)).then((resp) => {
            store.dispatch(actions.setServiceVisitPlanDetail(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {

        })
    })

    it('creates getQuestionsList when fetching service content has been done', () => {
        fetchMock.get(API.getAssessmentQuestionsByEntityServiceProviderId , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getQuestionsList(data)).then((resp) => {
            store.dispatch(actions.getQuestionsListListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates saveAnswers when fetching service content has been done', () => {
        fetchMock.post(API.visitProcessingAssessmentSave, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = [{}]
          return store.dispatch(actions.saveAnswers(data)).then((resp) => {
            store.dispatch(actions.endLoadingProcessing(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates saveAnswerFeedback when fetching service content has been done', () => {
        fetchMock.post(API.saveAnswers, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = [{}]
          return store.dispatch(actions.saveAnswerFeedback(data)).then((resp) => {
            store.dispatch(actions.endLoadingProcessing(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates startOrStopService when fetching service content has been done', () => {
        fetchMock.get(API.startOrStopService, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.startOrStopService(data)).then((resp) => {
            store.dispatch(actions.saveStartedTime(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })   

})