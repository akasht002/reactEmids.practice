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
    participantsByConferenceId: []
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
                conferenceId: action.data.conferenceId
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
        default:
            return state;
    }
}

export default telehealthState;