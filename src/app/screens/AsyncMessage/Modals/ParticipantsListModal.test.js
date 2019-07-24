import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ParticipantsListModal  } from './ParticipantsListModal'


Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = { }

store = mockStore(defaultState)

describe('ParticipantsListModal', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <ParticipantsListModal dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the ParticipantsListModal Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
});