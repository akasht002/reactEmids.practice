import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ModalTemplate  } from './Modal'


Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = { }

store = mockStore(defaultState)

describe('ModalTemplate', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <ModalTemplate dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the ModalTemplate Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
});