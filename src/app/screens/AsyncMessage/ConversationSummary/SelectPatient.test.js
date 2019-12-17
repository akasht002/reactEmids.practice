import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { SelectPatient } from './SelectPatient'
import sinon from 'sinon'

jest.mock('../../../utils/userUtility', () => ({
    getPatientData: () => ({
      userType: 'I'
    }),
    getUserInfo:()=>({
      serviceProviderTypeId :23
    }),
    isEntityServiceProvider:()=>({})
  }))

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    patients : [{}]
}

describe('SelectPatient', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <SelectPatient dispatch={dispatch} store={store} {...defaultState} />
      )
      })
      
  
      it('Check the MessageList Details body', () => {
          expect(shallowWrapper).toBeDefined()
      });

   

});