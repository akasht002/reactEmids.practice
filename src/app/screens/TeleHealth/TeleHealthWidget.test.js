import React from 'react'
import Enzyme, { shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon'
import {TeleHealthWidget,mapDispatchToProps, mapStateToProps} from './TeleHealthWidget'

jest.mock('../../utils/userUtility', () => ({
  getPatientData: () => ({
    userType: 'I'
  }),
  getUserInfo:()=>({
    serviceProviderTypeId :23
  })
}))


Enzyme.configure({ adapter: new Adapter() })
let store
const mockStore = configureStore()
const dispatch = sinon.spy()
const defaultState = {
    userType : 0,
    isServiceVisitLoading: false,
    isServiceRequestLoading: false,
    isServiceProviderLoading: false,
    leaveVideoConference: jest.fn(),
    getAllParticipants: jest.fn(),
    addParticipantsToConference: jest.fn(),
    endConference: jest.fn(),
    getParticipantByConferenceId: jest.fn(),
    goToDashBoard:jest.fn(),
    setMenuClicked: jest.fn(),
    clearLinkedParticipants: jest.fn(),
    telehealthState: {
        participantsByConferenceId:76,
        linkedParticipants:[{}],
        initiator:'',
        contextId:'',
        token:''
    },
    authState:{
        userState: {
            menuClicked:true
        }
    },
    roomId:45,
    detachTracks:jest.fn(),
    track : { 
        attach:jest.fn() ,
        stop:jest.fn()
    },
    existingParticipantList: [{
        identity:23,
        userId:23
    }]
}

store = mockStore(defaultState)

describe('TeleHealthWidget ', function () {
  let shallowWrapper;
    beforeEach(() => {      
      shallowWrapper = shallow(
        <TeleHealthWidget  dispatch={dispatch} store={store} {...defaultState} />
    )
    })

    it('Check the TeleHealthWidget  Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('should test initial state', () => {
        const initialState = defaultState
        expect(mapStateToProps(initialState)).toBeDefined();
    }); 

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).leaveVideoConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAllParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).addParticipantsToConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).endConference();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getParticipantByConferenceId();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToDashBoard();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setMenuClicked();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearLinkedParticipants();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    }) 
   

    it('Check the componentWillUnmount function', () => {
      shallowWrapper.instance().componentWillUnmount()
   }); 
   
   it('Check the componentWillUnmount function', () => {
    shallowWrapper.instance().setState({
        previewTracks:[{
            stop : () => {}
        }],
        hasJoinedRoom:true,       
    })
   
    shallowWrapper.instance().componentWillUnmount()
   }); 
  
   it('Check the joinRoom  function', () => {
    shallowWrapper.instance().setState({
        previewTracks:true,
        hasJoinedRoom:true
    })
     shallowWrapper.instance().joinRoom()
   });

   it('Check the attachTracks  function', () => {
       let  data = [{
        attach:() => {},
        stop:() => {}
       }]
       let container = { appendChild:(data) => {} }
       shallowWrapper.instance().attachTracks(data,container)
   });

   it('Check the attachParticipantTracks function', () => {
    let  data = {
        tracks : {
            values : () => {}
        }
       }
     let container = { appendChild:(data) => {} }   
     shallowWrapper.instance().attachParticipantTracks(data,container)
   });

  

   it('Check the detachTracks function', () => {   
         shallowWrapper.instance().detachTracks([{}])
   });

   it('Check the detachParticipantTracks function', () => {   
        shallowWrapper.instance().detachParticipantTracks({tracks:{
            values:()=>{}
        }})
   });

   it('Check the leaveRoom  function', () => {  
     shallowWrapper.setProps({
        telehealthToken:true,
        initiator:true
       }) 
       shallowWrapper.instance().setState({
        activeRoom:true
       })
      shallowWrapper.instance().leaveRoom ([{}])
   });

   it('Check the leaveRoom  function', () => {  
    shallowWrapper.setProps({
        telehealthToken:true,
        initiator:false
        }) 
        shallowWrapper.instance().setState({
        activeRoom:true
        })
       shallowWrapper.instance().leaveRoom([{}])
    });

    it('Check the detachParticipantTracks function', () => {   
        shallowWrapper.instance().detachParticipantTracks({tracks:{
            values:()=>{}
        }})
    });

    it('Check the endConference function', () => {
        shallowWrapper.instance().setState({
            activeRoom:{
                disconnect:()=>{} 
            }
        })   
        shallowWrapper.instance().endConference([{}])
    });

    it('Check the roomJoined function', () => {        
        shallowWrapper.instance().roomJoined('')
    });

    it('Check the DisplayInviteParticipantsList function', () => {        
        shallowWrapper.instance().DisplayInviteParticipantsList('')
    });

    it('Check the closeInviteParticipants function', () => {        
        shallowWrapper.instance().closeInviteParticipants('')
    });

    it('Check the ToggleFullScreen  function', () => {        
        shallowWrapper.instance().ToggleFullScreen('')
    });

    it('Check the controlAudio  function', () => {   
        shallowWrapper.instance().setState({
            isHiddenVideo : true,           
        })  
        shallowWrapper.instance().controlAudio('')
    });

    it('Check the controlVideo  function', () => {        
        shallowWrapper.instance().controlVideo('')
    });

    it('Check the participantClick function', () => {    
        shallowWrapper.setProps({
            
        })    
        shallowWrapper.instance().participantClick(23)
    });

   

});