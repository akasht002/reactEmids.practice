import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { LOGIN } from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Login actions', () => {
    it('should create an action to loginStart ', () => {
      const expectedAction = {
        type: LOGIN.start
      }
      expect(actions.loginStart()).toEqual(expectedAction)
    })

    it('should create an action to loginEnd', () => {
        const expectedAction = {
          type: LOGIN.end
        }
        expect(actions.loginEnd()).toEqual(expectedAction)
    })

    it('should create an action to loginFail', () => {
        const expectedAction = {
          type: LOGIN.failed    
        }
        expect(actions.loginFail()).toEqual(expectedAction)
    })

});

describe('Login actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })


    it('check onLoginFail fn', () => {  
        const store = mockStore({
            userData: {user:{}},
            loading: false,
            error: {
                message: '',
                code: ''
            },
        })
        return store.dispatch(actions.onLoginFail())
      })

      it('check onLogin fn', () => {  
        const store = mockStore({
            userData: {user:{}},
            loading: false,
            error: {
                message: '',
                code: ''
            },
        })
        return store.dispatch(actions.onLogin())
      })

    it('check onLoginSuccess fn', () => {  
        const store = mockStore({
            userData: {user:{}},
            loading: false,
            error: {
                message: '',
                code: ''
            },
        })
        let data = {user:{}}
        return store.dispatch(actions.onLoginSuccess(data))
      })
});
