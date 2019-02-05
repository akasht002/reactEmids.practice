import { API } from '../../services/api';
import { AsyncPutWithUrl, AsyncGet, AsyncPost, getUserInfo, AsyncPut } from '../../services/http';
import { startLoading, endLoading } from '../loading/actions';
import { push } from '../navigation/actions';
import { Path } from '../../routes';
import { USERTYPES } from '../../constants/constants';
import { setMenuClicked } from '../auth/user/actions';
import { onLogout } from '../auth/logout/actions';

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
    clearInvitaion: 'clear_invitaion/telehealth',
    setInitiator: 'setInitiator/telehealth',
    saveContextData: 'saveContextData/telehealth',
    setInvitedRoomId: 'setInvitedRoomId/telehealth',
    clearExistingRoom: 'clearExistingRoom/telehealth',
    newRequestCame: 'NewRequestCame/telehealth',
    clearInitiator: 'clearInitiator/telehealth',
    createDataStore: 'createDataStore/telehealth'
};

export const setInvitedRoomId = data =>{
    return{
        type: TeleHealth.setInvitedRoomId,
        data
    }
};

export const newRequestCame = data =>{
    return{
        type: TeleHealth.newRequestCame,
        data
    }
};

export const clearInitiator = () =>{
    return{
        type: TeleHealth.clearInitiator
    }
};

export const clearExistingRoom = () => {
    return {
        type: TeleHealth.clearExistingRoom
    }
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

export const setInitiator = (data) => {
    return {
        type: TeleHealth.setInitiator,
        data
    }
};

export const clearInvitaion = () => {
    return {
        type: TeleHealth.clearInvitaion
    }
};

export const createDataStore = data => {
    return {
        type: TeleHealth.createDataStore,
        data
    }
};


export function generateToken() {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncGet(API.generateToken + getUserInfo().coreoHomeUserId).then((resp) => {
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

export const saveContextData = data => {
    return {
        type: TeleHealth.saveContextData,
        data: data
    }
};

export function getLinkedParticipantsByPatients(data) {
    return (dispatch, getState) => {
        let searchText = data ? data : null;
        AsyncGet(API.getParticipantsByContext +
            '/0/' + getUserInfo().coreoHomeUserId +
            '/' + getState().telehealthState.contextId +
            '/S/' + searchText
        ).then((resp) => {
            dispatch(getLinkedParticipantsByPatientsSuccess(resp.data));
        }).catch((err) => {
        })
    }
};

export function createVideoConference(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const personalState = getState().profileState.PersonalDetailState.personalDetail
        let twilioData = {
            createdBy: userInfo.coreoHomeUserId,
            createdByType: USERTYPES.SERVICE_PROVIDER,
            createdByFirstName : personalState.firstName,
            createdByLastName  : personalState.lastName,
            context: getState().telehealthState.contextId,
            participantList: [
                {
                    userId: userInfo.coreoHomeUserId,
                    participantType: USERTYPES.SERVICE_PROVIDER,
                    firstName: personalState.firstName,
                    lastName: personalState.lastName,
                    thumbNail: getState().profileState.PersonalDetailState.imageData.thumbnailImage,
                    participantId: userInfo.serviceProviderId
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
        const telehealthState = getState().telehealthState;
        if (telehealthState.token) {
            dispatch(clearExistingRoom())
            dispatch(newRequestCame(true))
        } else {
            dispatch(acceptVideoConference())
        }
    }
};

export function acceptVideoConference() {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const roomNumber = getState().telehealthState.roomId;
        const telehealthState = getState().telehealthState;
        dispatch(startLoading());
        AsyncPutWithUrl(API.joinVideoConference 
            + userInfo.coreoHomeUserId + '/S/'
            + roomNumber).then((resp) => {
            dispatch(clearInvitaion())
            if (telehealthState.isNewRequestCame) {
                dispatch(newRequestCame(false))
                dispatch(clearInitiator())
                dispatch(generateToken())
            } else {
                dispatch(push(Path.teleHealth));
            }
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
            + userInfo.coreoHomeUserId + '/S/'
            + state.telehealthState.roomId).then((resp) => {
                if (state.telehealthState.isNewRequestCame) {
                    dispatch(setRoomId(state.telehealthState.invitedRoomId))
                    dispatch(acceptVideoConference())
                } else if (state.authState.userState.menuClicked) {
                    if (state.authState.userState.menuClicked === 'logout') {
                        dispatch(onLogout())
                    } else {
                        dispatch(push(state.authState.userState.menuClicked))
                    }
                    dispatch(setMenuClicked(null))
                } else if (!checkRoute) {
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
        AsyncGet(API.getParticipantByConferenceId
            + userInfo.coreoHomeUserId + '/S/'
            + state.telehealthState.roomId).then((resp) => {
                var data = resp.data && resp.data.filter((participant) => {
                    return userInfo.coreoHomeUserId !== participant.userId;
                }).map((participant) => {
                    return {
                        ...participant,
                        status: participant.status ? participant.status : 'Invited'
                    }
                });
                dispatch(onGetParticipantByConfernceIdSuccess(data));
            }).catch((err) => {
            })
    }
};

export function GetAllParticipants(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        let state = getState();
        let searchText = data ? data : null;
        let roomId = state.telehealthState.roomId ? state.telehealthState.roomId : 0;
        let contextId = state.telehealthState.contextId ? state.telehealthState.contextId : 0;
        AsyncGet(API.getAllParticipants
            + userInfo.coreoHomeUserId + '/S/'
            + contextId + '/'
            + roomId + '/'
            + searchText).then((resp) => {
                dispatch(onGetAllParticipantsSuccess(resp.data));
            }).catch((err) => {
            })
    };
};

export function endConference() {
    return (dispatch, getState) => {
        let telehealthState = getState().telehealthState;
        let state = getState();
        dispatch(startLoading());
        AsyncPost(API.endConference + telehealthState.roomId).then((resp) => {
            if (state.telehealthState.isNewRequestCame) {
                dispatch(setRoomId(state.telehealthState.invitedRoomId))
                dispatch(acceptVideoConference())
            } else if (state.authState.userState.menuClicked) {
                if (state.authState.userState.menuClicked === 'logout') {
                    dispatch(onLogout())
                } else {
                    dispatch(push(state.authState.userState.menuClicked))
                }
                dispatch(setMenuClicked(null))
            } else {
                dispatch(push(Path.dashboard))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function rejectConference() {
    return (dispatch, getState) => {
          let state = getState();
          let userInfo = getUserInfo();
          let data = {
            participantId: userInfo.serviceProviderId,
            participantType: USERTYPES.SERVICE_PROVIDER,
            roomNumber: state.telehealthState.roomId,
            userId: userInfo.coreoHomeUserId
          };
          dispatch(startLoading());
          AsyncPut(API.rejectConference, data).then((resp) => {
              dispatch(clearInvitaion());
              if (state.telehealthState.token) {
                dispatch(setInvitedRoomId(0))
              } else {
                dispatch(clearRoom())
              }
              dispatch(endLoading());
          }).catch((err) => {
              dispatch(endLoading());
          })
      }
};

export function getLinkedPatients() {
    return (dispatch) => {
          dispatch(startLoading());
          AsyncGet(API.getContext +  getUserInfo().coreoHomeUserId).then((resp) => {
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
        const personalState = getState().profileState.PersonalDetailState.personalDetail
        let state = getState();
        let twilioData = {
            createdByFirstName: personalState.firstName,
            createdByLastName: personalState.lastName,
            roomNumber: state.telehealthState.roomId,
            conferenceId: state.telehealthState.conferenceId,
            participants: data
        };
        AsyncPost(API.addParticipants, twilioData).then((resp) => {
        }).catch(() => {
        })
    }
};

export function checkTeleHealth(data) {
    return (dispatch, getState) => {
        const userInfo = getUserInfo();
        const teleHealthState = getState().telehealthState;
        if (userInfo) {
            const userId = userInfo.coreoHomeUserId;
            if (data.messageType === 'Invited') {
                if (data.userId !== userId) {
                    data.participantList && data.participantList.map((participant) => {
                        if (participant.participantType === USERTYPES.SERVICE_PROVIDER && userId === participant.userId) {
                            if (teleHealthState.token) {
                                dispatch(setInvitedRoomId(data.roomID))
                            } else {
                                dispatch(setRoomId(data.roomID));
                            }
                            dispatch(setInitiator({
                                userFirstName: data.userFirstName,
                                userLastName: data.userLastName
                            }))
                            dispatch(invitaionCame());
                        }
                        return '';
                    })
                }
                if (teleHealthState.roomId === data.roomID) {
                    let modifiedParticipants = []
                    data.participantList && data.participantList.map((participant) => {
                        let participantFound = false;
                        teleHealthState.participantsByConferenceId.map((confParticipant) => {
                            if (confParticipant.participantType === participant.participantType &&
                                confParticipant.userId === participant.userId) {
                                    participantFound = true;
                            }
                            return '';
                        })
                        if (!participantFound) {
                            modifiedParticipants.push({
                                ...participant,
                                status: 'Invited'
                            })
                        }
                        return ''
                    });
                    let participants = [
                        ...modifiedParticipants,
                        ...teleHealthState.participantsByConferenceId
                    ];
                    dispatch(onGetParticipantByConfernceIdSuccess(participants));
                }
            } else if (data.messageType === 'Joined' || data.messageType === 'Left' || data.messageType === 'Rejected') {
                if (teleHealthState.roomId === data.roomID && data.userId !== userId) {
                    let participants = teleHealthState.participantsByConferenceId.map((participant) => {
                        if (participant.userType === data.participantList[0].userType &&
                            participant.userId === data.participantList[0].userId) {
                                return {
                                    ...participant,
                                    status: data.messageType
                                }
                        } else {
                            return participant;
                        }
                    });
                    dispatch(onGetParticipantByConfernceIdSuccess(participants));
                }
            }  else if (data.messageType === 'Ended') {
                if (teleHealthState.roomId === data.roomID) {
                    dispatch(clearInvitaion())
                    if (teleHealthState.token) {
                        dispatch(leaveVideoConference())
                    }
                }
            }
        }
    }
}