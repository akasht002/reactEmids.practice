import { TeleHealth } from './bridge'


const defaultState = {
    token: null,
    roomId: '',
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
    createData: null
};

const telehealthState = (state = defaultState, action) => {
    switch (action.type) {
        case TeleHealth.generateTokenSuccess:
            return {
                ...state,
                token: action.data
            };
        case TeleHealth.setLinkedParticipants:
            return {
                ...state,
                linkedParticipants: action.data
            };
        case TeleHealth.setLinkedPatients:
            return {
                ...state,
                linkedPatients: action.data
            };
        case TeleHealth.clearLinkedParticipants:
            return {
                ...state,
                linkedParticipants: []
            };
        case TeleHealth.getRoomIdSuccess:
            return {
                ...state,
                roomId: action.data.roomNumber,
                conferenceId: action.data.videoConferenceId,
                initiator: true
            };
        case TeleHealth.getParticipantByConfernceIdSuccess:
            return {
                ...state,
                participantsByConferenceId: action.data
            };
        case TeleHealth.getAllParticipantsSuccess:
            return {
                ...state,
                linkedParticipants: action.data
            };
        case TeleHealth.setRoomId:
            return {
                ...state,
                roomId: action.data,
                invitedRoomId: 0
            };
        case TeleHealth.clearRoom:
            return defaultState;
        case TeleHealth.invitaionCame:
            return {
                ...state,
                isInvitationCame: true
            };
        case TeleHealth.clearInvitaion:
            return {
                ...state,
                isInvitationCame: false
            };
        case TeleHealth.setInitiator:
            return {
                ...state,
                initiatorFirstName: action.data.userFirstName,
                initiatorLastName: action.data.userLastName
            };
        case TeleHealth.saveContextData:
            return {
                ...state,
                contextId: action.data
            }
        case TeleHealth.setInvitedRoomId:
            return {
                ...state,
                invitedRoomId: action.data
            }
        case TeleHealth.clearExistingRoom:
            return {
                ...state,
                token: null,
                linkedParticipants: [],
                linkedPatients: [],
                conferenceId: 0,
                allParticipants: [],
                participantsByConferenceId: [],
                isInvitationCame: false,
                initiatorFirstName: '',
                initiatorLastName: '',
                contextId: 0
            }
        case TeleHealth.newRequestCame: 
            return {
                ...state,
                isNewRequestCame: action.data
            }
        case TeleHealth.clearInitiator: 
            return {
                ...state,
                initiator: false
            }
        case TeleHealth.createDataStore:
            return {
                ...state,
                createData: action.data
            }
        default:
            return state;
    }
}

export default telehealthState;