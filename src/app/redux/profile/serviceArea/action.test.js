import { API } from '../../../services/api';

import * as actions from './action';
import { ServiceArea } from './bridge'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {

  it('should create an action to getServiceAreaSuccess ', () => {
    let data = {}
    const expectedAction = {
      type: ServiceArea.getServiceAreaSuccess,
      data
    }
    expect(actions.getServiceAreaSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to clearPOSErrorMessage ', () => {
    let data = {}
    const expectedAction = {
      type: ServiceArea.clearPOSErrorMessage
    }
    expect(actions.clearPOSErrorMessage(data)).toEqual(expectedAction)
  })

  it('should create an action to getServiceAreaFieldDetails', () => {
      let data = {}
      const expectedAction = {
        type: ServiceArea.getServiceAreaFieldDetails,
        data
      }
      expect(actions.getServiceAreaFieldDetails(data)).toEqual(expectedAction)
    })

    it('should create an action to addServiceAreaSuccess ', () => {
      let data = false
      const expectedAction = {
        type: ServiceArea.addServiceAreaSuccess,
        data,
      }
      expect(actions.addServiceAreaSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to setPointOfServiceErrorMessage  ', () => {
      let data = {}
      const expectedAction = {
        type: ServiceArea.setPointOfServiceErrorMessage,
        data
      }
      expect(actions.setPointOfServiceErrorMessage(data)).toEqual(expectedAction)
    })
})


describe('ServiceArea async actions', () => {
  afterEach(() => {
      fetchMock.restore()
  })

  it('call getServiceArea fn', () => {
      fetchMock.post(API.getServiceArea, {
          body: { data: {} },
          headers: { 'content-type': 'application/json' },
          response: { data: {} }
      })

      const store = mockStore({ data: '', setPasswordState: '' })

      return store.dispatch(actions.getServiceArea({})).then((response) => {
          store.dispatch(actions.getWorkHistory())
          expect(store.getActions()).toBeDefined()
      }).catch(err => {
      })
  });

  
});