import reducer from './reducer'
import { TeleHealth } from './bridge'


describe('TeleHealth - languages reducer test case',()=>{
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            {
                token: null,
                roomId: 0,
                linkedParticipants: [],
                linkedPatients: [],
                conferenceId: 0,
                allParticipants: [],
                participantsByConferenceId: [],
                initiator: false,
                isInvitationCame: false,
                initiatorFirstName: '',
                initiatorLastName: '',
                contextId: 0,
                invitedRoomId: 0,
                isNewRequestCame: false,
                createData: null,
                isLoading: false
            }
        );
    });

    it("should return the generateTokenSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.generateTokenSuccess,
            data: data
        })).toBeDefined()
    });

    it("should return the setLinkedParticipants state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setLinkedParticipants,
            data: data
        })).toBeDefined()
    });

    it("should return the setLinkedPatients state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setLinkedPatients,
            data: data
        })).toEqual(
            { linkedPatients: data   }
        )
    });

    it("should return the clearLinkedParticipants state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.clearLinkedParticipants,
            data: data
        })).toEqual(
            { linkedParticipants: [] }
        )
    });

    it("should return the getRoomIdSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.getRoomIdSuccess,
            data: data
        })).toBeDefined()
    });


    it("should return the getParticipantByConferenceIdSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.getParticipantByConferenceIdSuccess,
            data: data
        })).toEqual(
            { participantsByConferenceId: data }
        )
    });


    it("should return the getAllParticipantsSuccess state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.getAllParticipantsSuccess,
            data: data
        })).toEqual(
            { linkedParticipants: data }
        )
    });

    it("should return the setRoomId state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setRoomId,
            data: data
        })).toBeDefined()
    });

    it("should return the clearRoom state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.clearRoom,
            data: data
        })).toBeDefined()
    });

    it("should return the invitaionCame state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.invitaionCame,
            data: data
        })).toEqual(
            { isInvitationCame: true }
        )
    });
    it("should return the clearInvitaion state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.clearInvitaion,
            data: data
        })).toEqual(
            { isInvitationCame: false }
        )
    });
    
    it("should return the setInitiator state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setInitiator,
            data: data
        })).toBeDefined()
    });

    it("should return the setContext state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setContext,
            data: data
        })).toEqual(
            { contextId: data }
        )
    });


    it("should return the setInvitedRoomId state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.setInvitedRoomId,
            data: data
        })).toEqual(
            { invitedRoomId: data }
        )
    });


    it("should return the clearExistingRoom state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.clearExistingRoom,
            data: data
        })).toBeDefined()
    });

    it("should return the newRequestCame state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.newRequestCame,
            data: data
        })).toEqual(
            { isNewRequestCame: data }
        )
    });

    it("should return the clearInitiator state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.clearInitiator,
            data: data
        })).toEqual(
            { initiator: false }
        )
    });

    it("should return the createDataStore state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.createDataStore,
            data: data
        })).toEqual(
            { createData: data }
        )
    });

    it("should return the teleHealthLoading state",()=>{
        let  data = {}
        expect(reducer(data, {
            type: TeleHealth.teleHealthLoading,
            data: data
        })).toEqual(
            { isLoading: data }
        )
    });
    
})