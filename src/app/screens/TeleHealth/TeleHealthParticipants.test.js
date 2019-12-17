import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { TeleHealthParticipants } from './TeleHealthParticipants'

jest.mock('../../utils/userUtility', () => ({
    getState: () => ({
        profileState : {
            PersonalDetailState:{
                imageData:{
                    image: 'I'
                }
            }
        }
    })
  }))
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    participantList :[{}]
 }

store = mockStore(defaultState)

describe('TeleHealthParticipants', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <TeleHealthParticipants dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the TeleHealthParticipants Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('Check the getParticipants', () => {
        shallowWrapper.instance().getParticipants()
    });
   
});