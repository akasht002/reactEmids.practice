import * as actions from './actions';
import { API } from '../../../services/api';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { USER } from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/userUtility', () => ({
    getUserData: () => ({
        userData: {
            impersinatedData: {},
            userInfo: {}
        }
    }),
    getUserInfo: () => ({
        userType: 'G'
    }),
    getUserState: () => ({
        individualList: []
    })
}))

describe('actions', () => {

    it('should create an action to setUserSuccess ', () => {
        let userData = {}
        expect(actions.setUserSuccess()).toBeDefined();
    })

    it('should create an action to deleteUser ', () => {
        const expectedAction = {
            type: USER.deleteUser
        }
        expect(actions.deleteUserSuccess()).toEqual(expectedAction)
    })

    it('should create an action to setUserRoles  ', () => {
        const expectedAction = {
            type: USER.setUserRoles 
        }
        expect(actions.setUserRoles ()).toEqual(expectedAction)
    })

    it('should create an action to clearData ', () => {
        const expectedAction = {
            type: USER.clearData
        }
        expect(actions.clearData()).toEqual(expectedAction)
    })

    it('should create an action to setIsFormDirty  ', () => {
        const data = {}
        const expectedAction = {
            type: USER.setIsFormDirty,
            data: data
        }
        expect(actions.setIsFormDirty(data)).toEqual(expectedAction)
    })

    it('should create an action to setMenuClicked  ', () => {
        const data = {}
        const expectedAction = {
            type: USER.menuClicked,
            data: data
        }
        expect(actions.setMenuClicked(data)).toEqual(expectedAction)
    })

});


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates onLogout when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.deleteUserSuccess())
    })

    it('creates onSetUserSuccess fn', () => {
        const store = mockStore({
            oidc: {
                user: {
                    profile: { stub: "" }
                }
            }
        })
        return store.dispatch(actions.onSetUserSuccess())
    });

    it('creates getUserRoles fn', () => {
        fetchMock.get(API.getUserRoles, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        let patientId = 321

        const store = mockStore({
            oidc: { user: 3 }
        })

        return store.dispatch(actions.getUserRoles(patientId)).then((response) => {
            store.dispatch(actions.updateUserData(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {

        })
    });

    it('creates checkUserData  fn', () => {
        const store = mockStore({
            authState: {
                userState: {
                    individualList: [],
                    userData: { access_token: "token" }
                }
            },
            oidc: {
                user: {
                    profile: { stub: "" }
                }
            }
        })
        return store.dispatch(actions.checkUserData())
    });

    it('creates getUserInactiveTimeout fn', () => {
        fetchMock.get(API.getUserRoles, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        let patientId = "321"

        const store = mockStore({
            oidc: { user: 3 }
        })

        return store.dispatch(actions.getUserInactiveTimeout(patientId)).then((response) => {
            store.dispatch(actions.updateUserData(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {

        })
    });

});