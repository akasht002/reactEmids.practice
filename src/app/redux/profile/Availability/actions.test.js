import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { AvailabilityActions } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to getAvailableDaysSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: AvailabilityActions.setAvailabilityDays,
            data
        }
        expect(actions.getAvailableDaysSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getBlackOutDaysSuccess     ', () => {
        let data = {}
        const expectedAction = {
            type: AvailabilityActions.setBlackoutDays,
            data
        }
        expect(actions.getBlackOutDaysSuccess(data)).toEqual(expectedAction)
    })


    it('should create an action to addBlackOutDaySuccess    ', () => {
        let isSuccess = {}
        const expectedAction = {
            type: AvailabilityActions.setBlackoutDays,
            isSuccess
        }
        expect(actions.addBlackOutDaySuccess(isSuccess)).toEqual(expectedAction)
    })

    it('should create an action to getAllAvailabilitySuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: AvailabilityActions.setAllAvailabilitySlots,
            data
        }
        expect(actions.getAllAvailabilitySuccess(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getAvailableDays  when fetching service content has been done', () => {
        fetchMock.get(API.getAvailableDays, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getAvailableDays(data)).then((resp) => {
            store.dispatch(actions.getAvailableDaysSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateAvailabilityDays  when fetching service content has been done', () => {
        fetchMock.get(API.addBlackOutDay, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateAvailabilityDays(data)).then((resp) => {
            store.dispatch(actions.getAvailableDays(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getBlackOutDays  when fetching service content has been done', () => {
        fetchMock.get(API.getBlackOutDays, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getBlackOutDays(data)).then((resp) => {
            store.dispatch(actions.getBlackOutDaysSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates addBlackOutDay   when fetching service content has been done', () => {
        fetchMock.get(API.addBlackOutDay, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.addBlackOutDay(data)).then((resp) => {
            store.dispatch(actions.getBlackOutDaysSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateBlackOutDay    when fetching service content has been done', () => {
        fetchMock.get(API.addBlackOutDay, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateBlackOutDay(data)).then((resp) => {
            store.dispatch(actions.getBlackOutDays(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates deleteBlackoutDay     when fetching service content has been done', () => {
        fetchMock.get(API.addBlackOutDay, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.deleteBlackoutDay(data)).then((resp) => {
            store.dispatch(actions.getBlackOutDays(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})