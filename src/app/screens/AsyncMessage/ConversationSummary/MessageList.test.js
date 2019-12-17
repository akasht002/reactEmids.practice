import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { MessageList } from './MessageList'
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
   
}

describe('MessageList', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <MessageList dispatch={dispatch} store={store} {...defaultState} />
      )
      })
      
  
      it('Check the MessageList Details body', () => {
          expect(shallowWrapper).toBeDefined()
      });

    it('Check the componentWillReceiveProps function', () => {
        shallowWrapper.instance().componentWillReceiveProps({})
    });

    it('Check the newConversation function', () => {
        shallowWrapper.instance().newConversation  ()
    });

    it('Check the participantsContent function', () => {
        shallowWrapper.instance().participantsContent([{}])
    });

    it('Check the participantsContent function', () => {
        shallowWrapper.instance().participantsContent([{},{}])
    });

    it('Check the participantsContent function', () => {
        shallowWrapper.instance().participantsContent([{},{},{}])
    });

    it('Check the participantsContent function', () => {
        shallowWrapper.instance().participantsContent([])
    });

    it('Check the getPartcipitantHeader function', () => {
        shallowWrapper.instance().getPartcipitantHeader([{}])
    });

    it('Check the getPartcipitantHeader function', () => {
        shallowWrapper.instance().getPartcipitantHeader([{},{}])
    });

    it('Check the getPartcipitantHeader function', () => {
        shallowWrapper.instance().getPartcipitantHeader([])
    });

   

});