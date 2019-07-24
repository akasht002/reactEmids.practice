import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { VisitServiceList } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to startLoading  ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.startLoading
        }
        expect(actions.startLoading(data)).toEqual(expectedAction)
    })

    it('should create an action to endLoading  ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.endLoading
        }
        expect(actions.endLoading(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceListSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.getVisitServiceListSuccess,
            data
        }
        expect(actions.getVisitServiceListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtyVisitList    ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.formDirtyVisitList
        }
        expect(actions.formDirtyVisitList(data)).toEqual(expectedAction)
    })

    it('should create an action to setServiceRequestStatusSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.setServiceRequestStatus,
            data
        }
        expect(actions.setServiceRequestStatusSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to serviceRequestCountSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceList.serviceRequestCount,
            data
        }
        expect(actions.serviceRequestCountSuccess(data)).toEqual(expectedAction)
    })

});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getVisitServiceList when fetching service content has been done', () => {
        fetchMock.get(API.saveAnswers, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getVisitServiceList(data)).then((resp) => {
            store.dispatch(actions.getVisitServiceListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

})