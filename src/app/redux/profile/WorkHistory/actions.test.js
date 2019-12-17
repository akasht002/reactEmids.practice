import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { WorkHistory } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId:23
    })
}))

describe('Skills actions', () => {
    it('should create an action to getWorkhistorySuccess', () => {
        let data = {}
        const expectedAction = {
            type: WorkHistory.getWorkhistorySuccess,
            data
        }
        expect(actions.getWorkhistorySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to addWorkhistorySuccess', () => {
        let data = {}
        const expectedAction = {
            type: WorkHistory.addWorkhistorySuccess,
            data
        }
        expect(actions.addWorkhistorySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getWorkhistoryFieldDetails', () => {
        let data = {}
        const expectedAction = {
            type: WorkHistory.getWorkhistoryFieldDetails,
            data
        }
        expect(actions.getWorkhistoryFieldDetails(data)).toEqual(expectedAction)
    })
});

describe('Skills async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('call addWorkHistory fn', () => {
        fetchMock.post(API.WorkHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.addWorkHistory({})).then((response) => {
            store.dispatch(actions.getWorkHistory())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getWorkHistory fn', () => {
        fetchMock.get(API.WorkHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({
            profileState : { PersonalDetailState : { serviceProviderId :23 }
        }
        })

        return store.dispatch(actions.getWorkHistory({})).then((response) => {
            store.dispatch(actions.getWorkhistorySuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call editWorkHistory fn', () => {
        fetchMock.get(API.WorkHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.editWorkHistory({})).then((response) => {
            store.dispatch(actions.getWorkHistory())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call updateWorkHistory fn', () => {
        fetchMock.get(API.WorkHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.updateWorkHistory({})).then((response) => {
            store.dispatch(actions.getWorkHistory())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call deleteWorkHistory fn', () => {
        fetchMock.delete(API.WorkHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.deleteWorkHistory({})).then((response) => {
            store.dispatch(actions.getWorkHistory())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});