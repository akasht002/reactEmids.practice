import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import {ParticipantsContainer,mapDispatchToProps, mapStateToProps} from './ParticipantsContainer'
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
    asyncMessageState:{ linkedPatients:''},
    existingParticipants :[{userId:32,thumbNail: ''}],
    onRef:jest.fn(),
    addParticipants: jest.fn(),
    removeParticipant: jest.fn(),
    getLinkedParticipantsByPatients: jest.fn(),
    setParticipantProfile: jest.fn(),
    goToPatientProfile: jest.fn(),
    goToProfile: jest.fn(),
    setServiceProviderId: jest.fn(),
    setESP:jest.fn(),
    goToESPProfile:jest.fn(),
    setDisplayGreyedOut:jest.fn(),
    isDirty:jest.fn(),
    onCilckRemoveParticipant:jest.fn(),
    getLinkedPatients:jest.fn(),
    createNewConversation:jest.fn(),
    clearLinkedParticipants:jest.fn()
}

describe('ParticipantsContainer', function () {
    let shallowWrapper;
      beforeEach(() => {      
        shallowWrapper = shallow(
          <ParticipantsContainer dispatch={dispatch} store={store} {...defaultState} />
      )
      })

      it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
     }); 


      it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).createNewConversation();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getLinkedPatients();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getLinkedParticipantsByPatients();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearLinkedParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })

  
      it('Check the ParticipantsContainer Details body', () => {
          expect(shallowWrapper).toBeDefined()
      });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the onClearParticipantContainer  function', () => {
        shallowWrapper.instance().onClearParticipantContainer ()
    });

    it('Check the onCheckParticipant function', () => {
        shallowWrapper.instance().onCheckParticipant({},{target:{checked:true}})
    });

    it('Check the onCreateConversation  function', () => {
        shallowWrapper.instance().onCreateConversation()
    });

    it('Check the onTitleChange function', () => {
        shallowWrapper.instance().onTitleChange({target:{value:true}})
    });

    it('Check the onSearchTextChange function', () => {
        shallowWrapper.instance().onSearchTextChange({target:{value:true}})
    });

    it('Check the onSelectPatient function', () => {
        shallowWrapper.instance().onSelectPatient(23)
    });

    it('Check the onClearSelectedParticipants function', () => {
        shallowWrapper.instance().onClearSelectedParticipants()
    });



});