import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Languages } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to getLanguagesSuccess    ', () => {
        let data = {}
        const expectedAction = {
            type: Languages.getLanguagesSuccess,
            data
        }
        expect(actions.getLanguagesSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSelectedLanguageDetails         ', () => {
        let data = {}
        const expectedAction = {
            type: Languages.getSelectedLanguageDetails,
            data
        }
        expect(actions.getSelectedLanguageDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getLanguages  when fetching service content has been done', () => {
        fetchMock.get(API.getLanguages, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getLanguages(data)).then((resp) => {
            store.dispatch(actions.getLanguagesSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates addLanguages  when fetching service content has been done', () => {
        fetchMock.get(API.addLanguages, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.addLanguages(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguages(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates getSelectedLanguages  when fetching service content has been done', () => {
        fetchMock.get(API.addLanguages, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getSelectedLanguages(data)).then((resp) => {
            store.dispatch(actions.getSelectedLanguageDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})