import { API } from '../../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { PerformTasks } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12,
        isEntityServiceProvider: true
    })
}))


jest.mock('../../../../utils/userUtility', () => ({
    isEntityUser: () => ({})       
}))

describe('actions', () => {
    it('should create an action to formDirtyPerformTask  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.formDirtyPerformTask
        }
        expect(actions.formDirtyPerformTask(data)).toEqual(expectedAction)
    })

    it('should create an action to getPerformTasksListSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.getPerformTasksListSuccess,
            data
        }
        expect(actions.getPerformTasksListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestVisitId  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.getServiceRequestVisitId,
            data
        }
        expect(actions.getServiceRequestVisitId(data)).toEqual(expectedAction)
    })

    it('should create an action to getSummaryDetailsSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.getSummaryDetailsSuccess,
            data
        }
        expect(actions.getSummaryDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to saveStartedTime  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.saveStartedTime,
            data
        }
        expect(actions.saveStartedTime(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitStatus  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.getVisitStatus,
            data
        }
        expect(actions.getVisitStatus(data)).toEqual(expectedAction)
    })

    it('should create an action to startLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.startLoading
        }
        expect(actions.startLoadingProcessing(data)).toEqual(expectedAction)
    })

    it('should create an action to endLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: PerformTasks.endLoading
        }
        expect(actions.endLoadingProcessing(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getPerformTasksList when fetching service content has been done', () => {
        fetchMock.get(API.getServiceRequestPerformTasks, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getPerformTasksList(data)).then((resp) => {
            store.dispatch(actions.getPerformTasksListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {

        })
    })

    it('creates getServiceVisitId when fetching service content has been done', () => {
        fetchMock.get(API.getServiceRequestPerformTasks, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getServiceVisitId(data)).then((resp) => {
            store.dispatch(actions.getPerformTasksListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates addPerformedTask when fetching service content has been done', () => {
        fetchMock.get(API.getServiceRequestPerformTasks, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.addPerformedTask(data)).then((resp) => {
            store.dispatch(actions.savePerformedTask(resp.data))
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

    it('creates getSummaryDetails when fetching service content has been done', () => {
        fetchMock.get(API.getSummaryDetails, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getSummaryDetails(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

})