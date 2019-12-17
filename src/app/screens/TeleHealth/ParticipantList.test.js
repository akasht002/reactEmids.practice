import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ParticipantsList } from './ParticipantList'
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    participantList :[{}],
    selectedParticipants:[{}],
    searchText:'test'
 }

store = mockStore(defaultState)

describe('ParticipantsList', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <ParticipantsList dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the ParticipantsContainer Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
    

   it('Check the participants function', () => {
      shallowWrapper.instance().participants()
   });

   
});