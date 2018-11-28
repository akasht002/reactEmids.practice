import {
    TeleHealth
} from './actions'

const defaultState = {
    token: null,
    roomId: '',
    linkedParticipants: [],
    linkedPatients: [],
    conferenceId: '',
    allParticipants: [],
    participantsByConferenceId: [],
    initiator: false,
    isInvitationCame: false,
    initiatorFirstName: '',
    initiatorLastName: '',
    contextId: 0,
    invitedRoomId: ''
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
        default:
            return state;
    }
}

export default telehealthState;