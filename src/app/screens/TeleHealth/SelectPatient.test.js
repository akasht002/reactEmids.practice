import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { SelectPatient } from './SelectPatient'
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    patients :[{}]
 }

store = mockStore(defaultState)

describe('SelectPatient', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <SelectPatient dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the SelectPatient Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
   
});