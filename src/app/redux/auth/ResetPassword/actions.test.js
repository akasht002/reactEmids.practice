import * as actions from './actions';
import { API } from '../../../services/api';
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {ResetPassword} from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
    it('should create an action to formDirty', () => {
      const expectedAction = {
        type: ResetPassword.formDirty
      }
      expect(actions.formDirty()).toEqual(expectedAction)
    })

    it('should create an action to resetPasswordSuccess ', () => {
        let data = {}
        const expectedAction = {
          type: ResetPassword.resetPasswordSuccess,
          data
        }
        expect(actions.resetPasswordSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to resetPasswordError ', () => {
        let data = {}
        const expectedAction = {
          type: ResetPassword.resetPasswordError,
          data
        }
        expect(actions.resetPasswordError(data)).toEqual(expectedAction)
    })

    it('should create an action to getEmailIdSuccess  ', () => {
        let data = {}
        const expectedAction = {
          type: ResetPassword.getEmailIdSuccess,
          data
        }
        expect(actions.getEmailIdSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getEmailIdError  ', () => {
        let data = {}
        const expectedAction = {
          type: ResetPassword.getEmailIdError,
          data
        }
        expect(actions.getEmailIdError(data)).toEqual(expectedAction)
    })
});


describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates getEmailId when fetching service content has been done', () => {
        fetchMock.getOnce(API.getEmailIdByUserId, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' },
          response:{data:{}}
        })
  
        const store = mockStore({ data: '' })
        let data = {};
    
        return store.dispatch(actions.getEmailId(data)).then((response) => {
          store.dispatch(actions.getEmailIdSuccess(response.data))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.getEmailIdError([]))
        }) 
    })

    it('creates resetPassword when fetching service content has been done', () => {
        fetchMock.getOnce(API.resetPassword, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' },
          response:{data:{}}
        })
  
        const store = mockStore({ authState:{resetPasswordState :{emailId:'test@test.com'}} })
        let data = {password:'pass',userId:2,token:"zdfsdfsdfsdf"};
    
        return store.dispatch(actions.resetPassword(data)).then((response) => {
          store.dispatch(actions.resetPasswordSuccess(response.data))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.resetPasswordError([]))
        })      
  
      })
});