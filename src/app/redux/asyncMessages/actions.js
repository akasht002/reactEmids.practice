import { push } from '../navigation/actions';
import { API } from '../../services/api';
import { Path } from '../../routes';
import {
    getUserInfo,
    AsyncGet,
    AsyncPost,
    AsyncPut,
    AsyncPutWithUrl
} from '../../services/http';
import { USERTYPES } from '../../constants/constants';
import { startLoading, endLoading } from '../loading/actions';


export const AsyncMessageActions = {
    setConversationSummary: 'set_conversation_summary/asyncMessage',
    loadingStart: 'loading_start/asyncMessage',
    loadingEnd: 'loading_end/asyncMessage',
    setconversation: 'set_conversation/asyncMessage',
    setNewConversationId: 'set_new_conversation/asyncMessage',
    setCurrentOpenConversation: 'set_current_open_conversation/asyncMessage',
    setUnreadCountDetails: 'set_unread_count/asyncMessage',
    setLinkedPatients: 'set_linked_patients/asyncMessage',
    setLinkedParticipants: 'set_linked_participants/asyncMessage',
    pushConversation: 'push_conversation/asyncMessage/asyncMessage',
    clearLinkedParticipants: 'clear_linked_participants/asyncMessage',
    pushConversationSummary: 'push_conversation_summary/asyncMessage',
    pushUnreadCount: 'push_unread_count/asyncMessage',
    setConversationImage: 'set_conversation_image/asyncMessage',
    clearConversationImageUrl: 'clear_conversation_image_url/asyncMessage',
    setCanCreateConversation: 'set_canCreate_conversation/asyncMessage',
    clearCurrentOpenConversation: 'clear_current_open_conversation/asyncMessage',
    setConversationCount: 'set_conversation_count'
};

export const setConversationSummary = (data) => {
    return {
        type: AsyncMessageActions.setConversationSummary,
        data
    }
};

export const pushConversation = (data) => {
    return {
        type: AsyncMessageActions.pushConversation,
        data
    }
};

export const pushConversationSummary = (data) => {
    return {
        type: AsyncMessageActions.pushConversationSummary,
        data
    }
};

export const pushUnreadCount = (data) => {
    return {
        type: AsyncMessageActions.pushUnreadCount,
        data
    }
};

export function onFetchConversationSummary(pageNumber) {
    return (dispatch) => {
        let pageNum = pageNumber ? pageNumber : 1;
        let pageSize = 20;
        dispatch(startLoading());
        let USER_ID = getUserInfo().serviceProviderId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getConversationSummary 
            + USER_ID + '/'
            + USER_TYPE + '/'
            + pageNum + '/'
            + pageSize)
            .then(resp => {
                dispatch(setConversationSummary(resp.data));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};


export function onFetchConversation(id) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let state = getState();
        let conversationId = id ? id : state.asyncMessageState.currentConversation.conversationId;
        let pageNumber = 1;
        let pageSize = 500;
        let USER_ID = getUserInfo().serviceProviderId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getConversation 
            + conversationId + '/' 
            + USER_ID + '/' 
            + USER_TYPE + '/'
            + pageNumber + '/'
            + pageSize)
            .then(resp => {
                dispatch(setConversationData(resp.data));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function onCreateNewConversation(data) {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncPost(API.createNewConversation, data)
            .then(resp => {
                dispatch(setNewConversationSuccess(resp.data.conversationId));
                dispatch(setCurrentOpenConversation(resp.data));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function onSaveTitle(data) {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncPut(API.saveTitle, data)
            .then(resp => {
                dispatch(onFetchConversation(resp.data.conversationId));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function goToConversation(data, userId) {
    return (dispatch, getState) => {
        dispatch(setCurrentOpenConversation(data));
        dispatch(push(Path.conversation + data.conversationId));
    }
};

export function setNewConversationSuccess(id) {
    return (dispatch, getState) => {
        dispatch(setCurrentOpenConversation(id));
        dispatch(push(Path.conversation + id));
    }
};

export const setCurrentOpenConversation = (data) => {
    return {
        type: AsyncMessageActions.setCurrentOpenConversation,
        data
    }
};

export const setConversationData = (data) => {
    return {
        type: AsyncMessageActions.setconversation,
        data
    }
};


export const setNewConversationId = id => {
    return {
        type: AsyncMessageActions.setNewConversationId,
        id
    }
};

export function onSendNewMessage(data) {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncPost(API.sendMessage, data)
            .then(resp => {
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function onAddParticipant(data) {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncPost(API.addParticipant, data)
            .then(resp => {
                dispatch(onFetchConversation(resp.data.conversationId));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function onRemoveParticipant(data) {
    return (dispatch) => {
        dispatch(startLoading());
        AsyncPut(API.removeParticipant, data)
            .then(resp => {
                dispatch(onFetchConversation(resp.data.conversationId));
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export function getUnreadMessageCounts() {
    return (dispatch) => {
        dispatch(startLoading())
        let USER_ID = getUserInfo().serviceProviderId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getUnreadCount + USER_ID + '/' + USER_TYPE)
            .then(resp => {
                dispatch(onUnreadCountSuccess(resp.data))
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};


export function updateReadStatus(data) {
    return (dispatch) => {
        dispatch(startLoading())
        let USER_ID = getUserInfo().serviceProviderId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncPutWithUrl(API.updateReadStatus + USER_ID + '/' + data.conversationId
            + '/' + USER_TYPE)
            .then(resp => {
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export const onUnreadCountSuccess = data => {
    return {
        type: AsyncMessageActions.setUnreadCountDetails,
        data: data
    }
};

export function goToConversationSummary() {
    return (dispatch, getState) => {
        dispatch(push(Path.messageSummary));
    };
};

export function leaveConversation(data) {
    return (dispatch) => {
        dispatch(startLoading())
        let USER_ID = getUserInfo().serviceProviderId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncPutWithUrl(API.leaveConversation 
            + USER_ID + '/' 
            + data.conversationId + '/'
            + USER_TYPE)
            .then(resp => {
                dispatch(onFetchConversation(resp.data));
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

const getLinkedPatientsSuccess = data => {
    return {
        type: AsyncMessageActions.setLinkedPatients,
        data: data
    }
};


export function getLinkedParticipantsByPatients(data) {
    return (dispatch) => {
        dispatch(startLoading())
        let serchText = data.searchText === "" ? null : data.searchText;
        AsyncGet(API.getParticipantsByContext + data.conversationId +
            '/' + data.userId +
            '/' + data.patientId +
            '/' + data.participantType +
            '/' + serchText)
            .then(resp => {
                dispatch(getLinkedParticipantsByPatientsSuccess(resp.data));
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

const getLinkedParticipantsByPatientsSuccess = data => {
    return {
        type: AsyncMessageActions.setLinkedParticipants,
        data: data
    }
};

export function getDashboardMessageCount(userData) {
    return (dispatch) => {
        dispatch(startLoading())
        AsyncGet(API.getDashboardMessageCount + userData.userId + '/' + userData.userType)
            .then(resp => {
                dispatch(getDashboardCountSuccess(resp.data));
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

const getDashboardCountSuccess = data => {
    return {
        type: AsyncMessageActions.setDashboardMessageCount,
        data: data
    }
};


export function clearLinkedParticipants() {
    return (dispatch, getState) => {
        dispatch(onClearLinkedParticipants());
    }
};

const onClearLinkedParticipants = () => {
    return {
        type: AsyncMessageActions.clearLinkedParticipants
    }
};



export function getConversationImageWithImageId(messageId) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        AsyncGet(API.getConversationImage + messageId).then(resp => {
            dispatch(endLoading());
            dispatch(onGetConversationImageWithImageIdSuccess(resp.data));
        }).catch(err => {
            dispatch(endLoading());
        })
    }
};

const onGetConversationImageWithImageIdSuccess = (data) => {
    return {
        type: AsyncMessageActions.setConversationImage,
        data
    }
};



export function clearConversationImageUrl() {
    return (dispatch, getState) => {
        dispatch(onClearConversationImageUrl());
    }
};

const onClearConversationImageUrl = () => {
    return {
        type: AsyncMessageActions.clearConversationImageUrl
    }
};



export function CanServiceProviderCreateMessage() {
    return (dispatch, getState) => {
        let USER_ID = getUserInfo().serviceProviderId;
        dispatch(startLoading());
        AsyncGet(API.canCreateMessage + USER_ID).then(resp => {
            dispatch(CanServiceProviderCreateMessageSuccess(resp.data))
            dispatch(endLoading());
        }).catch(err => {
            dispatch(endLoading());
        })
    }
};

const CanServiceProviderCreateMessageSuccess = (data) =>{
    return{
        type: AsyncMessageActions.setCanCreateConversation,
        data
    }
};


export function getLinkedPatients() {
        return (dispatch) => {
        dispatch(startLoading())
        let USER_ID = getUserInfo().serviceProviderId;
        AsyncGet(API.getContext + USER_ID)
            .then(resp => {
                dispatch(getLinkedPatientsSuccess(resp.data));
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};


export function ClearCurrentOpenConversation() {
    return (dispatch, getState) => {
        dispatch(onClearCurrentOpenConversation());
    }
};

const onClearCurrentOpenConversation = () => {
    return {
        type: AsyncMessageActions.clearCurrentOpenConversation
    }
};

export function getConversationCount() {
    return (dispatch) => {
    dispatch(startLoading())
    let USER_ID = getUserInfo().serviceProviderId;
    let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
    AsyncGet(API.getConverstionCountByUserId 
        + USER_ID + '/'
        + USER_TYPE)
        .then(resp => {
            dispatch(getConversationCountSuccess(resp.data));
            dispatch(endLoading())
        })
        .catch(err => {
            dispatch(endLoading())
        })
}
};

const getConversationCountSuccess = (data) =>{
    return{
        type: AsyncMessageActions.setConversationCount,
        data
    }
}