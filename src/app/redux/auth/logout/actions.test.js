import * as actions from './actions';
import {API} from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {LOGOUT} from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        userId: 1,
        patientId:123,
        userType:"type"
    }),
    getPatientData: () => ({
        userType : 'G'
    })
}))


describe('Logout actions', () => {
    it('should create an action to logoutStart ', () => {
      const expectedAction = {
        type: LOGOUT.start
      }
      expect(actions.logoutStart()).toEqual(expectedAction)
    })

    it('should create an action to logoutEnd', () => {
        const expectedAction = {
          type: LOGOUT.end
        }
        expect(actions.logoutEnd()).toEqual(expectedAction)
    })

    it('should create an action to logout fail', () => {
        const expectedAction = {
          type: LOGOUT.failed
        }
        expect(actions.logoutFail()).toEqual(expectedAction)
    })

    it('should create an action to logout Success', () => {
        let userData =  {}
        const expectedAction = { "type": LOGOUT.success, "userData": {}}
        expect(actions.logoutSuccess(userData)).toEqual(expectedAction)
      })
})


describe('Logout async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('check logout fn', () => {  
        const store = mockStore({
            userData: {user:{}},
            loading: false,
            error: {
                message: '',
                code: ''
            },
        })
        return store.dispatch(actions.onLogout())
    })

    it('check onClear fn', () => {  
        const store = mockStore({
            userData: {user:{}},
            loading: false,
            error: {
                message: '',
                code: ''
            },
        })
        return store.dispatch(actions.onClear())
    })

});