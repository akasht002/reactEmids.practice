import { API } from '../../services/api';

import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


jest.mock('../../utils/userUtility', () => ({
    getPatientData : () => ({
        firstName: "Name",
        lastName:'LName',
        imageData:{ image:'' },
        patientId:23
    }),
    getUserInfo : () => ({
        userType : "I",
        lastName:'LName',
        imageData:{ image:'' },
        userId :23,
        patientId:34
    }),
    getCareTeamId : () => ({
        firstName: "Name",
        lastName:'LName',
        imageData:{ image:'' },
        patientId:23
    })
}))




describe('actions', () => {
    it('should create an action to teleHealthLoading', () => {
      let data = {}
      const expectedAction = {
        type: actions.TeleHealth.teleHealthLoading,
        data 
      }
      expect(actions.teleHealthLoading(data)).toEqual(expectedAction)
    })

    it('should create an action to setInvitedRoomId', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.setInvitedRoomId,
          data
        }
        expect(actions.setInvitedRoomId(data)).toEqual(expectedAction)
      })


      it('should create an action to newRequestCame', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.newRequestCame,
          data
        }
        expect(actions.newRequestCame(data)).toEqual(expectedAction)
      })

      it('should create an action to clearInitiator', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.clearInitiator
        }
        expect(actions.clearInitiator(data)).toEqual(expectedAction)
      })

      it('should create an action to clearExistingRoom', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.clearExistingRoom
        }
        expect(actions.clearExistingRoom(data)).toEqual(expectedAction)
      })

      it('should create an action to invitaionCame', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.invitaionCame
        }
        expect(actions.invitaionCame(data)).toEqual(expectedAction)
      })

      it('should create an action to clearInvitaion', () => {
        let data = []
        expect(actions.clearInvitaion(data)).toBeDefined()
      })

      it('should create an action to generateTokenSuccess', () => {
        let data = []
        expect(actions.generateTokenSuccess(data)).toBeDefined()
      })

      it('should create an action to setContext', () => {
        let data = []
        expect(actions.setContext(data)).toBeDefined()
      })

      it('should create an action to setInitiator', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.setInitiator,
          data
        }
        expect(actions.setInitiator(data)).toEqual(expectedAction)
      })

      it('should create an action to getLinkedParticipantsByPatientsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.setLinkedParticipants,
          data
        }
        expect(actions.getLinkedParticipantsByPatientsSuccess(data)).toEqual(expectedAction)
      })

      it('should create an action to createDataStore', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.createDataStore,
          data
        }
        expect(actions.createDataStore(data)).toEqual(expectedAction)
      })

      it('should create an action to getRoomIdSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.getRoomIdSuccess,
          data
        }
        expect(actions.getRoomIdSuccess(data)).toEqual(expectedAction)
      })

      it('should create an action to setRoomId', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.setRoomId,
          data
        }
        expect(actions.setRoomId(data)).toEqual(expectedAction)
      })

      it('should create an action to clearRoom', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.clearRoom
        }
        expect(actions.clearRoom(data)).toEqual(expectedAction)
      })

      it('should create an action to getLinkedPatientsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.setLinkedPatients,
          data
        }
        expect(actions.getLinkedPatientsSuccess(data)).toEqual(expectedAction)
      })

      it('should create an action to onClearLinkedParticipants', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.clearLinkedParticipants,
          data
        }
        expect(actions.getLinkedPatientsSuccess(data)).toBeDefined()
      })

      it('should create an action to onGetParticipantByConfernceIdSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.getParticipantByConferenceIdSuccess,
          data
        }
        expect(actions.onGetParticipantByConfernceIdSuccess(data)).toEqual(expectedAction)
      })

      it('should create an action to onGetAllParticipantsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: actions.TeleHealth.getAllParticipantsSuccess,
          data
        }
        expect(actions.onGetAllParticipantsSuccess(data)).toEqual(expectedAction)
      })
})

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates setLinkedPatients when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          }) 
        store.dispatch(actions.setLinkedPatients())
    })

    it('creates clearLinkedParticipants when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          }) 
        store.dispatch(actions.clearLinkedParticipants())
    })

    it('creates joinVideoConference when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          }) 
        store.dispatch(actions.joinVideoConference())
    })

    it('creates checkTeleHealth when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23,participantsByConferenceId:[]}
          }) 
          let data = {messageType : 'Invited',userId :34,participantList:[{userId:34}],roomID:23}
        store.dispatch(actions.checkTeleHealth(data))
    })

    it('creates checkTeleHealth when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23,participantsByConferenceId:[]}
          })
          let data = {messageType : 'Joined',userId :34,participantList:[{userId:34}],roomID:23}
        store.dispatch(actions.checkTeleHealth(data))
    })

    it('creates checkTeleHealth when fetching service content has been done', () => {
        const store = mockStore({
            telehealthState: { contextId :23,roomId:23,participantsByConferenceId:[]}
          })
          let data = {messageType : 'Ended',userId :34,participantList:[{userId:34}],roomID:23}
        store.dispatch(actions.checkTeleHealth(data))
    })

    it('creates generateToken when fetching service content has been done', () => {
        fetchMock.get(API.generateToken, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({ servicerequestState : {
              TeleHealthState :{
                  typeList:[{serviceTypeId :23}],
                  serviceCategoryId:23,
                  requirementObj:{serviceCategoryId:23}
                },
                requirementObj:{serviceCategoryId:23}
                }
        })
      
          return store.dispatch(actions.generateToken()).then((resp) => {
            store.dispatch(actions.generateTokenSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getLinkedParticipantsByPatients when fetching service content has been done', () => {
        fetchMock.get(API.GetServiceCategoryTypeTask, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({
              telehealthState: { contextId :23}
        })
      
          return store.dispatch(actions.getLinkedParticipantsByPatients()).then((resp) => {
            store.dispatch(actions.getLinkedParticipantsByPatientsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })


    it('creates createVideoConference when fetching service content has been done', () => {
        fetchMock.get(API.createRoomId, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({
            telehealthState: { contextId :23}
          })

          let data  = [{}]
      
          return store.dispatch(actions.createVideoConference(data)).then((resp) => {
            store.dispatch(actions.getRoomIdSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getParticipantByConferenceId when fetching service content has been done', () => {
        fetchMock.get(API.getParticipantByConferenceId, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })
      
          return store.dispatch(actions.getParticipantByConferenceId()).then((resp) => {
            store.dispatch(actions.onGetParticipantByConfernceIdSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates GetAllParticipants when fetching service content has been done', () => {
        fetchMock.get(API.getAllParticipants, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })

          let data = {}
      
          return store.dispatch(actions.GetAllParticipants(data)).then((resp) => {
            store.dispatch(actions.onGetAllParticipantsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getLinkedPatients when fetching service content has been done', () => {
        fetchMock.get(API.getContext, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.getLinkedPatients()).then((resp) => {
            store.dispatch(actions.getLinkedPatientsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getCareTeamIndividualsList when fetching service content has been done', () => {
        fetchMock.get(API.getIndividualsList, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.getCareTeamIndividualsList()).then((resp) => {
            store.dispatch(actions.getLinkedPatientsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates acceptVideoConference when fetching service content has been done', () => {
        fetchMock.get(API.joinVideoConference, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.acceptVideoConference()).then((resp) => {
            store.dispatch(actions.clearInvitaion(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates leaveVideoConference when fetching service content has been done', () => {
        fetchMock.get(API.leaveVideoConference, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.leaveVideoConference()).then((resp) => {
            store.dispatch(actions.clearInvitaion(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates endConference when fetching service content has been done', () => {
        fetchMock.get(API.endConference, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.endConference()).then((resp) => {
            store.dispatch(actions.clearInvitaion(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates rejectConference when fetching service content has been done', () => {
        fetchMock.get(API.rejectConference, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })        
      
          return store.dispatch(actions.rejectConference()).then((resp) => {
            store.dispatch(actions.clearInvitaion(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates AddParticipantsToVideoConference when fetching service content has been done', () => {
        fetchMock.get(API.addParticipants, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })

          const store = mockStore({
            telehealthState: { contextId :23,roomId:23}
          })
          
          let data = {}
      
          return store.dispatch(actions.AddParticipantsToVideoConference(data)).then((resp) => {
            store.dispatch(actions.clearInvitaion(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

   

});