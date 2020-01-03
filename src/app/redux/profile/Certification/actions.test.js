import { API } from '../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Certification } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
    })
}))

describe('actions', () => {
    it('should create an action to getCertificationSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: Certification.getCertificationSuccess,
            data
        }
        expect(actions.getCertificationSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to addCertificationSuccess       ', () => {
        let isSuccess = {}
        const expectedAction = {
            type: Certification.addCertificationSuccess,
            isSuccess
        }
        expect(actions.addCertificationSuccess(isSuccess)).toEqual(expectedAction)
    })

    it('should create an action to getCertificationFieldDetails      ', () => {
        let data = {}
        const expectedAction = {
            type: Certification.getCertificationFieldDetails,
            data
        }
        expect(actions.getCertificationFieldDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getCertification  when fetching service content has been done', () => {
        fetchMock.get(API.certification, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getCertification(data)).then((resp) => {
            store.dispatch(actions.getCertificationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates addCertification  when fetching service content has been done', () => {
        fetchMock.get(API.certification, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.addCertification(data)).then((resp) => {
            store.dispatch(actions.addCertificationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates editCertification  when fetching service content has been done', () => {
        fetchMock.get(API.certification, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.editCertification(data)).then((resp) => {
            store.dispatch(actions.addCertificationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates updateCertification   when fetching service content has been done', () => {
        fetchMock.get(API.certification, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateCertification(data)).then((resp) => {
            store.dispatch(actions.addCertificationSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

    it('creates deleteCertification    when fetching service content has been done', () => {
        fetchMock.get(API.certification, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.deleteCertification(data)).then((resp) => {
            store.dispatch(actions.getCertification(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})