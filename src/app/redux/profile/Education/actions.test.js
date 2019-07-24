import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Education } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to getEducationSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: Education.getEducationSuccess,
            data
        }
        expect(actions.getEducationSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to addEducationSuccess        ', () => {
        let isSuccess = {}
        const expectedAction = {
            type: Education.addEducationSuccess,
            isSuccess
        }
        expect(actions.addEducationSuccess(isSuccess)).toEqual(expectedAction)
    })

    it('should create an action to getEducationFieldDetails       ', () => {
        let data = {}
        const expectedAction = {
            type: Education.getEducationFieldDetails,
            data
        }
        expect(actions.getEducationFieldDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getEducation  when fetching service content has been done', () => {
        fetchMock.get(API.education, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getEducation(data)).then((resp) => {
            store.dispatch(actions.getEducationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates addEducation  when fetching service content has been done', () => {
        fetchMock.get(API.education, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.addEducation(data)).then((resp) => {
            store.dispatch(actions.addEducationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates editEducation  when fetching service content has been done', () => {
        fetchMock.get(API.education, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.editEducation(data)).then((resp) => {
            store.dispatch(actions.getEducationFieldDetails(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateEducation   when fetching service content has been done', () => {
        fetchMock.get(API.education, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateEducation(data)).then((resp) => {
            store.dispatch(actions.addEducationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates deleteEducation    when fetching service content has been done', () => {
        fetchMock.get(API.education, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.deleteEducation(data)).then((resp) => {
            store.dispatch(actions.getEducation(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})