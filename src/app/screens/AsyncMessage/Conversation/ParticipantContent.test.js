import React from 'react'
import Enzyme, { shallow, configure, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import { ParticipantContent,mapDispatchToProps, mapStateToProps } from './ParticipantContent'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
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
    onCilckRemoveParticipant:jest.fn()
}


describe("ParticipantContent", function () {
    let shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        shallowWrapper = shallow(
            <ParticipantContent dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Conversation component contains MessageCardWidget', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).addParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).removeParticipant();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getLinkedParticipantsByPatients();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setParticipantProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceProviderId();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setESP();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToESPProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined(); 
    })

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the onCheckParticipant function', () => {
        shallowWrapper.instance().onCheckParticipant({
            userId:12,firstName:'',lastName:'',participantType:'',participantId:34},{target:{value:23,checked:true}})
    });

    it('Check the onCheckParticipant function', () => {
        shallowWrapper.instance().onCheckParticipant({
            userId:12,firstName:'',lastName:'',participantType:'',participantId:34},{target:{value:23,checked:false}})
    });

    it('Check the toggleAddParticipantsView function', () => {
        shallowWrapper.instance().setState({
            addParticipantView:true
        })
        shallowWrapper.instance().toggleAddParticipantsView()
    });

    it('Check the toggleAddParticipantsView function', () => {
        shallowWrapper.instance().setState({
            addParticipantView:true,
            selectedParticipantsList:[{}]
        })
        shallowWrapper.instance().toggleAddParticipantsView()
    });

    it('Check the toggleAddParticipantsView function', () => {
        shallowWrapper.instance().setState({
            addParticipantView:false,
            selectedParticipantsList:[{}]
        })
        shallowWrapper.instance().toggleAddParticipantsView()
    });

    it('Check the gotoParticipantView function', () => {
        shallowWrapper.instance().gotoParticipantView()
    });

    it('Check the closeProfileOptions function', () => {
        shallowWrapper.instance().closeProfileOptions()
    });

    it('Check the openProfileOptions function', () => {
        shallowWrapper.instance().openProfileOptions({target:{id:23}})
    });

    it('Check the openProfileOptions function', () => {
        shallowWrapper.instance().setState({
            popupVisible:false,
            selectedParticipselectedProfile: ''
        })
        shallowWrapper.instance().openProfileOptions({target:{id:23}})
    });

    it('Check the openProfileOptions function', () => {
        shallowWrapper.instance().setState({
            popupVisible:true,
            selectedParticipselectedProfile: 'xdf',
            selectedProfile :34
        })
        shallowWrapper.instance().openProfileOptions({target:{id:23}})
    });

    it('Check the handleOutsideClick function', () => {        
        shallowWrapper.instance().handleOutsideClick({target:{id:23}})
    });

    it('Check the onSearchTextChange function', () => {        
        shallowWrapper.instance().onSearchTextChange({target:{id:23}})
    });

    it('Check the onAddParticipants function', () => {        
        shallowWrapper.instance().onAddParticipants()
    });

    it('Check the onClickRemoveParticipant function', () => {        
        shallowWrapper.instance().onClickRemoveParticipant({},{})
    });

    it('Check the onConfirmRemoveParticipant function', () => {        
        shallowWrapper.instance().onConfirmRemoveParticipant()
    });
});