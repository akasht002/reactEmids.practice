import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import {ForgetPassword} from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('ForgetPassword actions', () => {
    it('should create an action to formDirty', () => {
      const expectedAction = {
        type: ForgetPassword.formDirty
      }
      expect(actions.formDirty()).toEqual(expectedAction)
    })

    it('should create an action to sendResetPasswordLinkSuccess', () => {
        const data = {}
        const emailId = 'test@mailinator.com'
        const expectedAction = {
          type: ForgetPassword.sendResetPasswordLinkSuccess,
          data,
          emailId
        }
        expect(actions.sendResetPasswordLinkSuccess(data,emailId)).toEqual(expectedAction)
    })

    it('should create an action to sendResetPasswordLinkError', () => {
        const expectedAction = {
          type: ForgetPassword.sendResetPasswordLinkError
        }
        expect(actions.sendResetPasswordLinkError()).toEqual(expectedAction)
    })
});

describe('ForgetPassword actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates sendResetPasswordLink when fetching service content has been done', () => {
      fetchMock.getOnce( API.SendResetPasswordLink, {
        body: { data: [] },
        headers: { 'content-type': 'application/json' },
        response: {data:{}}
      })

      const store = mockStore({ data: '' })
      let data = {emailId : "test@mailinator.com"}
  
      return store.dispatch(actions.sendResetPasswordLink(data)).then((response) => {
        store.dispatch(actions.sendResetPasswordLinkSuccess(response.data,data.emailId))
        expect(store.getActions()).toBeDefined()
      }).catch(err => {
        store.dispatch(actions.sendResetPasswordLinkError())
      })      

    })

});  