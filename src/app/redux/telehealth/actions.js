import { API } from '../../services/api';
import { AsyncPutWithUrl, AsyncGet, AsyncPost, getUserInfo } from '../../services/http';
import { startLoading, endLoading } from '../loading/actions';
import { push } from '../navigation/actions';
import { Path } from '../../routes';
import { USERTYPES } from '../../constants/constants';

export const TeleHealth = {
    generateTokenSuccess: 'generate_token_success/telehealth',
    setLinkedParticipants: 'set_linked_participants/asyncMessage',
    setLinkedPatients: 'set_linked_patients/asyncMessage',
    clearLinkedParticipants: 'clear_linked_participants/asyncMessage',
    getRoomIdSuccess: 'getRoomIdSuccess/telehealth',
    getParticipantByConfernceIdSuccess: 'get_participant_by_confernceId_success/telehealth',
    getAllParticipantsSuccess: 'get_all_participants_success/telehealth',
    setRoomId : 'set_roomId/telehealth',
    clearRoom: 'clear_room/telehealth',
    invitaionCame: 'invitaion_came/telehealth',
    clearInvitaion: 'clear_invitaion/telehealth'
};

export const generateTokenSuccess = (data) => {
    return {
        type: TeleHealth.generateTokenSuccess,
        data
    }
};

export const clearRoom = () =>{
    return{
        type: TeleHealth.clearRoom
    }
};

export const invitaionCame = () => {
    return {
        type: TeleHealth.invitaionCame
    }
};

export const clearInvitaion = () => {
    return {
        type: TeleHealth.clearInvitaion
    }
};


export function generateToken() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const user = getState().profileState.PersonalDetailState.personalDetail
        AsyncGet(API.generateToken + user.firstName + ' ' + user.lastName).then((resp) => {
            if (resp && resp.data) {
                dispatch(generateTokenSuccess(resp.data));
            }
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
};

const getLinkedParticipantsByPatientsSuccess = data => {
    return {
        type: TeleHealth.setLinkedParticipants,
        data: data
    }
};

export function getLinkedParticipantsByPatients(data) {
    return (dispatch, getState) => {
        let searchText = data.searchText === "" ? null : data.searchText;
        let patients = getState().telehealthState.linkedPatients;
        let patient = patients.find((e) => {
            return e.userId === data.patientId
        });
        data.firstName = patient.firstName;
        data.lastName = patient.lastName;
        data.participantType = USERTYPES.PATIENT;
        data.image = patient.image;
        data.userId = data.userId;
        dispatch(startLoading());
        AsyncGet(API.getParticipantsByContext + data.conversationId +
            '/' + getUserInfo().serviceProviderId +
            '/' + data.patientId +
            '/S/' + searchText
        ).then((resp) => {
            dispatch(getLinkedParticipantsByPatientsSuccess(resp.data));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function createVideoConference(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const personalState = getState().profileState.PersonalDetailState.personalDetail
        let twilioData = {
            createdBy: userInfo.serviceProviderId,
            createdByType: 'S',
            createdByFirstName : personalState.firstName,
            createdByLastName  : personalState.lastName,
            participantList: [
                {
                    userId: userInfo.serviceProviderId,
                    participantType: 'S',
                    firstName: personalState.firstName,
                    lastName: personalState.lastName,
                    thumbNail: getState().profileState.PersonalDetailState.imageData.thumbnailImage
                },
                ...data
            ]
        };
        dispatch(startLoading());
        AsyncPost(API.createRoomId, twilioData).then((resp) => {
            dispatch(getRoomIdSuccess(resp.data));
            dispatch(push(Path.teleHealth));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

const getRoomIdSuccess = data => {
    return {
        type: TeleHealth.getRoomIdSuccess,
        data: data
    }
};

const setRoomId = data =>{
    return{
        type: TeleHealth.setRoomId,
        data
    }
};

const getLinkedPatientsSuccess = data => {
    return {
        type: TeleHealth.setLinkedPatients,
        data: data
    }
};


export function joinVideoConference() {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const roomNumber = getState().telehealthState.roomId;
        dispatch(startLoading());
        AsyncPutWithUrl(API.joinVideoConference 
            + userInfo.serviceProviderId + '/S/'
            + roomNumber).then((resp) => {
            dispatch(clearInvitaion())
            dispatch(push(Path.teleHealth));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function leaveVideoConference(checkRoute) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        let state = getState();
        dispatch(startLoading());
        AsyncPutWithUrl(API.leaveVideoConference 
            + userInfo.serviceProviderId + '/S/'
            + state.telehealthState.roomId).then((resp) => {
                if (!checkRoute) {
                    dispatch(push(Path.dashboard))
                }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(push(Path.dashboard))
            dispatch(endLoading());
        })
    }
};


export function GetParticipantByConferenceId() {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        let state = getState();
        dispatch(startLoading());
        AsyncGet(API.getParticipantByConferenceId
            + userInfo.serviceProviderId + '/S/'
            + state.telehealthState.roomId).then((resp) => {
                var data = resp.data && resp.data.filter((participant) => {
                    return userInfo.serviceProviderId !== participant.userId;
                }).map((part) => {
                    return {
                        ...part,
                        status: 'Invited'
                    }
                })
                dispatch(onGetParticipantByConfernceIdSuccess(data));
                dispatch(endLoading());
            }).catch((err) => {
                dispatch(endLoading());
            })
    }
};

export function GetAllParticipants(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        let state = getState();
        let searchText = data.searchText ? data.searchText : null;
        let roomId = state.telehealthState.roomId ? state.telehealthState.roomId : 0;
        let contextId = data.contextId ? data.contextId : userInfo.serviceProviderId;
        dispatch(startLoading());
        AsyncGet(API.getAllParticipants
            + userInfo.serviceProviderId + '/S/'
            + contextId + '/'
            + roomId + '/'
            + searchText).then((resp) => {
                dispatch(onGetAllParticipantsSuccess(resp.data));
                dispatch(endLoading());
            }).catch((err) => {
                dispatch(endLoading());
            })
    };
};

export function endConference() {
    return (dispatch, getState) => {
        let state = getState().telehealthState;
        let token = {
            authToken: state.token
        }
        dispatch(startLoading());
        AsyncPost(API.endConference + state.roomId, token).then((resp) => {
            dispatch(push(Path.dashboard));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getLinkedPatients() {
    return (dispatch) => {
          dispatch(startLoading());
          AsyncGet(API.getContext +  getUserInfo().serviceProviderId).then((resp) => {
              dispatch(getLinkedPatientsSuccess(resp.data));
              dispatch(endLoading());
          }).catch((err) => {
              dispatch(endLoading());
          })
      }
  };

export function clearLinkedParticipants() {
    return (dispatch, getState) => {
        dispatch(onClearLinkedParticipants());
    }
};

const onClearLinkedParticipants = () => {
    return {
        type: TeleHealth.clearLinkedParticipants
    }
};

const onGetParticipantByConfernceIdSuccess = (data) => {
    return {
        type: TeleHealth.getParticipantByConfernceIdSuccess,
        data
    }
};

const onGetAllParticipantsSuccess = (data) => {
    return {
        type: TeleHealth.getAllParticipantsSuccess,
        data
    }
};

export function AddParticipantsToVideoConference(data) {
    return (dispatch, getState) => {
        let state = getState();
        let twilioData = {
            roomNumber: state.telehealthState.roomId,
            conferenceId: state.telehealthState.conferenceId,
            participants: data
        };
        dispatch(startLoading());
        AsyncPost(API.addParticipants, twilioData).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function checkTeleHealth(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const teleHealthState = getState().telehealthState;
        const userId = userInfo.serviceProviderId;
        if (data.messageType === 'Invited') {
            if (data.userId !== userId) {
                data.participantList && data.participantList.map((participant) => {
                    if (participant.participantType === 'S' && userId === participant.userId) {
                        dispatch(setRoomId(data.roomID));
                        dispatch(invitaionCame());
                    }
                })
            }
            if (teleHealthState.roomId === data.roomID) {
                let participants = [
                    ...data.participantList,
                    ...teleHealthState.participantsByConferenceId
                ];
                dispatch(onGetParticipantByConfernceIdSuccess(participants));
            }
        } else if (data.messageType === 'Joined') {
            if (teleHealthState.roomId === data.roomID && data.userId !== userId) {
                let participants = teleHealthState.participantsByConferenceId.map((participant) => {
                    if (participant.userType === data.participantList[0].userType &&
                        participant.userId === data.participantList[0].userId) {
                            return {
                                ...participant,
                                status: 'Joined'
                            }
                    } else {
                        return participant;
                    }
                });
                dispatch(onGetParticipantByConfernceIdSuccess(participants));
            }
        }
    }
}