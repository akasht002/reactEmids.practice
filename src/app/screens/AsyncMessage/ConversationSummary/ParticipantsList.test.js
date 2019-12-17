import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { ParticipantsList ,mapDispatchToProps, mapStateToProps} from './ParticipantsList'
import sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    authState: {
        userState:{
            userData:{
                userInfo:{
                    loggedInUser : {
                        coreoHomeUserId:45
                    }
                }
            }
        }
    },
    loggedInUser : {
        coreoHomeUserId:45
    },
    asyncMessageState:{ 
        linkedPatients:'',
        openedAsyncPage:{}
    },
    participantList:[{}],
    conversationId :23,
    selectedParticipants:[{}],
    existingParticipants :[{userId:32,thumbNail: ''}],
    onRef:jest.fn(),
    getLinkedParticipantsList: jest.fn(),
}

describe('ParticipantsList ', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <ParticipantsList  dispatch={dispatch} store={store} {...defaultState} />
      )
      })

      it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
     }); 


    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getLinkedParticipantsList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })

  
    it('Check the ParticipantsContainer Details body', () => {
          expect(shallowWrapper).toBeDefined()
    });

    

});