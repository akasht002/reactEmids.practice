import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ParticipantsContainer,mapDispatchToProps, mapStateToProps} from './ParticipantContainer'

jest.mock('../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
  }))
  
jest.mock('./ParticipantList', () => ({
    ParticipantList: 'mockParticipantList'
}))
  
Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    telehealthState : { 
        linkedPatients :[{}],
        linkedParticipants:[{}],        
        contextId:12
    },
    getAllParticipants: jest.fn(),
    clearLinkedParticipants:  jest.fn(),
    createVideoConference: jest.fn(),
    getLinkedPatients:  jest.fn(),
    saveContextData: jest.fn(),
    onRef:jest.fn(),
    onSetDisplayParticipantModal:jest.fn()
 }

store = mockStore(defaultState)

describe('ParticipantsContainer', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <ParticipantsContainer dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the ParticipantsContainer Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });
    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getAllParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearLinkedParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createVideoConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getLinkedPatients();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveContextData();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the onClearParticipantContainer  function', () => {
      shallowWrapper.instance().onClearParticipantContainer()
   });

   it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the onCreateConversation  function', () => {
        shallowWrapper.instance().onCreateConversation()
    });

    it('Check the onCheckParticipant function', () => {
        shallowWrapper.setState({
            selectedParticipants:[]
        })
        shallowWrapper.instance().onCheckParticipant({},{target:{checked:true}})
    });

    it('Check the onCheckParticipant function', () => {
        shallowWrapper.setState({
            selectedParticipants:[]
        })
        shallowWrapper.instance().onCheckParticipant({},{target:{checked:false}})
    });

    it('Check the onSearchTextChange function', () => {
        shallowWrapper.setState({
            selectedParticipants:{userId:34}
        })
        shallowWrapper.instance().onSearchTextChange({target:{value:false}})
    });

    it('Check the onSelectPatient function', () => {
        shallowWrapper.instance().onSelectPatient(null)
    });

    it('Check the onSelectPatient function', () => {
        shallowWrapper.instance().onSelectPatient('Test')
    });
});