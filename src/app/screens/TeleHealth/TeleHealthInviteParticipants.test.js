import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { TeleHealthInviteParticipants } from './TeleHealthInviteParticipants'
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    participantList :[{}],
    selectedParticipants:[{}],
    searchText:'test',
    clearLinkedParticipants:jest.fn(),
    ToggleAddParticipantsListView:jest.fn(),
    getAllParticipants:jest.fn(),
    addParticipantsToConference:jest.fn(),
 }

store = mockStore(defaultState)

describe('TeleHealthInviteParticipants', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <TeleHealthInviteParticipants dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the ParticipantsContainer Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
    

   it('Check the onClearParticipantContainer function', () => {
      shallowWrapper.instance().onClearParticipantContainer()
   });

   it('Check the onCheckParticipant function', () => {
        shallowWrapper.instance().setState({
            selectedParticipants:[]
        })
        shallowWrapper.instance().onCheckParticipant({},{target:{checked:true}})
    });
    it('Check the onCheckParticipant function', () => {
        shallowWrapper.instance().setState({
            selectedParticipants:[]
        })
        shallowWrapper.instance().onCheckParticipant({},{target:{checked:false}})
    });

    it('Check the onSearchTextChange  function', () => {
        shallowWrapper.instance().onSearchTextChange({target:{value:true}})
    });

    it('Check the AddParticipantsToConference  function', () => {
        shallowWrapper.instance().AddParticipantsToConference()
    });

   
});