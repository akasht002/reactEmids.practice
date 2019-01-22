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
import { USERTYPES, Pagination } from '../../constants/constants';
import { startLoading, endLoading } from '../loading/actions';
import {invokeSignalr} from '../../utils/signalrUtility';

let interval = null;

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
    setConversationCount: 'set_conversation_count/asyncMessage',
    setopenedAsyncPage: 'set_opened_async_page/asynMessage',
    pushConversationMessage: 'push_conversation_asyncMessage/asyncMessage',
    setRemoveParticipantConcurrency: 'setRemoveParticipantConcurrency/asyncMessage',
    clearConversation: 'clearConversation/asyncMessage',
    setDashboardMessageCount: 'setDashboardMessageCount/asyncMessage',
    setActivePageNumber: 'setActivePageNumber/asyncMessage',
    updateTitle: 'updateTitle/asyncMessage',
    pushUnreadConversation: 'pushUnreadConversation/asyncMessage',
    msgCallbackInterval: 'msgCallbackInterval/asyncMessage'
};

export const msgCallbackInterval = (data) => {
    return {
        type: AsyncMessageActions.msgCallbackInterval,
        data
    }
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


export const pushUnreadConversation = (data) => {
    return {
        type: AsyncMessageActions.pushUnreadConversation,
        data
    }
};

export const convLoadingStart = () => {
    return {
        type: AsyncMessageActions.loadingStart
    }
};

export const convLoadingEnd = () => {
    return {
        type: AsyncMessageActions.loadingEnd
    }
};

export function setActivePageNumber(data) {
    return {
        type: AsyncMessageActions.setActivePageNumber,
        data
    }
};

export const pushConversationMessage = (data) => {
    return {
        type: AsyncMessageActions.pushConversationMessage,
        data
    }
};

export function getConversationSummaryItemSignalR(conversationId){
    return (dispatch, getState) => {
        let state = getState();
        dispatch(getDashboardMessageCount());
        if(state.asyncMessageState.openedAsyncPage === 'conversationSummary'){
            let userId = getUserInfo().coreoHomeUserId;
            let userType = USERTYPES.SERVICE_PROVIDER;
            AsyncGet(API.getConversationSummary 
                + conversationId + '/'
                + userId + '/' 
                + userType
            )
            .then(resp => {
                dispatch(getConversationSummaryItemSignalRSuceess(resp.data));
            })
            .catch(err => {
            })
        }
    };
};

const getConversationSummaryItemSignalRSuceess = (data) => {
    return(dispatch, getState) => {
        let state = getState();
        let conversationSummaryData = [...state.asyncMessageState.conversationSummary];
        const index = conversationSummaryData.indexOf(
            conversationSummaryData.filter(el => el.conversationId === data.conversationId)[0]
        );
        if(index !== -1){
            conversationSummaryData.splice(index, 1);
        }
        conversationSummaryData = [data, ...conversationSummaryData];
        dispatch(setConversationSummary(conversationSummaryData));
        dispatch(getUnreadMessageCounts());
    };
};


export function getConversationItemSignalR(conversationId, messageId){
    return (dispatch, getState) => {
        let state = getState();
        if(state.asyncMessageState.openedAsyncPage === 'conversation' 
        && state.asyncMessageState.currentConversation.conversationId === conversationId){
            let userId = getUserInfo().coreoHomeUserId;
            let userType = USERTYPES.SERVICE_PROVIDER;
            let data = {conversationId: conversationId};
            AsyncGet(API.getConversationMessage 
                + messageId + '/'
                + conversationId + '/'
                + userId + '/' 
                + userType
            )
            .then(resp => {
                dispatch(verifyIsConversationMessageExist(resp.data));
                dispatch(updateReadStatus(data));
            })
            .catch(err => {
            })
        };
    }
};

export function getUnreadConversationByUserId(conversationId){
    return (dispatch, getState) => {
        let state = getState();
        if(state.asyncMessageState.openedAsyncPage === 'conversation' 
        && state.asyncMessageState.currentConversation.conversationId === conversationId){
            let userId = getUserInfo().coreoHomeUserId;
            let userType = USERTYPES.SERVICE_PROVIDER;
            let data = {conversationId: conversationId};
            AsyncGet(API.getUnreadConversationsByUserId
                + conversationId + '/'
                + userId + '/' 
                + userType
            )
            .then(resp => {
                dispatch(verifyIsConversationMessagesExist(resp.data));
                dispatch(updateReadStatus(data));
            })
            .catch(err => {
            })
        };
    }
};

const verifyIsConversationMessagesExist = (data) => {
    return(dispatch, getState) => {
        let state = getState();
        let conversationMessageData = [...state.asyncMessageState.conversation.messages];
        let unreadMessages = [];
        data.map((message) => {
            let msgFound = false;
            conversationMessageData.map((msg) => {
                if (message.conversationMessageId === msg.conversationMessageId) {
                    msgFound = true;
                }
                return msg;
            });
            if (!msgFound) {
                unreadMessages.push(message)
            }
            return message;
        });
        if(unreadMessages.length > 0){
            dispatch(pushUnreadConversation(unreadMessages));
        }
    };
};

export const pushUnreadCount = (data) => {
    return {
        type: AsyncMessageActions.pushUnreadCount,
        data
    }
};

export const openedAsyncPage = (data) =>{
    return{
        type: AsyncMessageActions.setopenedAsyncPage,
        data
    };
};

export function onFetchConversationSummary(pageNumber) {
    return (dispatch) => {
        dispatch(convLoadingStart());
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getConversationSummary 
            + USER_ID + '/'
            + USER_TYPE + '/'
            + pageNumber + '/'
            + Pagination.pageSize)
            .then(resp => {
                dispatch(setConversationSummary(resp.data));
                dispatch(convLoadingEnd());
            })
            .catch(err => {
                dispatch(convLoadingEnd());
            })
    }
};


export function onFetchConversation(id) {
    return (dispatch, getState) => {
        dispatch(convLoadingStart());
        let state = getState();
        let conversationId = id ? id : state.asyncMessageState.currentConversation.conversationId;
        let context = state.asyncMessageState.currentConversation.context
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getConversation 
            + conversationId + '/' 
            + USER_ID + '/' 
            + USER_TYPE + '/all/' + context
            )
            .then(resp => {
                dispatch(setConversationData(resp.data));
                dispatch(setCurrentOpenConversation(resp.data));
                dispatch(convLoadingEnd());
            })
            .catch(err => {
                dispatch(convLoadingEnd())
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
                dispatch(endLoading());
                dispatch(updateTitle(data.title));
                dispatch(verifyIsConversationMessageExistSendMessage(resp.data));
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};


export const updateTitle = (data) =>{
    return  {
        type: AsyncMessageActions.updateTitle,
        data
    }
};

export function goToConversation(data) {
    return (dispatch) => {
        dispatch(setCurrentOpenConversation(data));
        dispatch(push(Path.conversation));
    }
};

export function setNewConversationSuccess(id) {
    return (dispatch) => {
        dispatch(setCurrentOpenConversation(id));
        dispatch(push(Path.conversation));
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
        AsyncPost(API.sendMessage, data)
            .then(resp => {
                let list = resp.data.result.participantList.map((participant) => {
                    return {
                        userId: participant.userId,
                        participantType: participant.participantType,
                        participantId: participant.participantId
                    }
                });
                const model = {
                    participantList: list,
                    conversationId: resp.data.result.conversationId,
                    conversationMessageId: resp.data.result.conversationMessageId
                }
                invokeSignalr('UpdateChat', model)
                dispatch(verifyIsConversationMessageExistSendMessage(resp.data.result));
            })
            .catch(err => {
                console.log(err)
            })
    }
};

const verifyIsConversationMessageExistSendMessage = (data) => {
    return(dispatch, getState) => {
        let state = getState();
        let conversationMessageData = [...state.asyncMessageState.conversation.messages];
        const index = conversationMessageData.indexOf(
            conversationMessageData.filter(el => el.conversationMessageId === data.conversationMessageId)[0]
        );
        if(index === -1){
            dispatch(pushConversationMessage(data));
        }
    };
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
                dispatch(endLoading());
                if(err.response && err.response.status === 400){
                    dispatch(setRemoveParticipantConcurrency(true));
                }
            })
    }
};

export function getUnreadMessageCounts() {
    return (dispatch) => {
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getUnreadCount + USER_ID + '/' + USER_TYPE)
            .then(resp => {
                dispatch(onUnreadCountSuccess(resp.data))
            })
            .catch(err => {
            })
    }
};


export function updateReadStatus(data) {
    return (dispatch) => {
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncPutWithUrl(API.updateReadStatus + USER_ID + '/' + data.conversationId
            + '/' + USER_TYPE)
            .then(resp => {
                dispatch(getDashboardMessageCount());            
            })
            .catch(err => {
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
        let conversatinId = getState().asyncMessageState.currentConversation.conversationId;
        dispatch(removeFromGroup(conversatinId));
        dispatch(clearConversation());
        dispatch(push(Path.messageSummary));
    };
};

export function checkLatestMessages(conversationId){
    return (dispatch, getState) => {
        let state = getState();
        if(state.asyncMessageState.currentConversation.conversationId && state.asyncMessageState.openedAsyncPage === 'conversation' 
        && state.asyncMessageState.currentConversation.conversationId === conversationId){
            let messages = state.asyncMessageState.conversation && state.asyncMessageState.conversation.messages;
            let messageId = messages && messages.length > 0 && messages[messages.length - 1].conversationMessageId;
            let lastMessageId = messageId ? messageId : 0
            let USER_ID = getUserInfo().coreoHomeUserId;
            let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
            let data = {conversationId: conversationId};
            AsyncGet(API.getLatestMessages 
                + conversationId + '/'
                + lastMessageId + '/'
                + USER_ID + '/'
                + USER_TYPE
            ).then(resp => {
                dispatch(verifyIsConversationMessagesExist(resp.data.messages));
                dispatch(updateReadStatus(data));
            }).catch(err => { 
                console.log(err)
            })
        }
    }
};

export function joinGroup(conversationId){
    return (dispatch) => {
        if (conversationId) {
            invokeSignalr('JoinRoom', conversationId)
            dispatch(getLatestMessages(conversationId));
        }
    }
};

export function getLatestMessages(conversationId){
    return (dispatch, getState) => {
        let state = getState();
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            dispatch(checkLatestMessages(conversationId));
        }, state.asyncMessageState.callbackInterval);
    }
}

export function checkConversationExist(conversationId){
    return (dispatch, getState) => {
        let state = getState();
        state && state.asyncMessageState && state.asyncMessageState.conversationSummary && 
        state.asyncMessageState.conversationSummary.map((data) => {
            if (data.conversationId === conversationId) {
                dispatch(getConversationSummaryItemSignalR(conversationId))
            }
            return data;
        });
    }
}

export function removeFromGroup(conversationId){
    return () => {
        if (interval) {
            clearInterval(interval);
        }
        if (conversationId) {
            invokeSignalr('LeaveRoom', conversationId)
        }
    }
};

export const clearConversation = () => {
    return {
        type: AsyncMessageActions.clearConversation,
    }
};

export function leaveConversation(data) {
    return (dispatch) => {
        dispatch(startLoading())
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncPutWithUrl(API.leaveConversation 
            + USER_ID + '/' 
            + data.conversationId + '/'
            + USER_TYPE)
            .then(resp => {
                dispatch(onFetchConversation(resp.data.conversationId));
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
    return (dispatch, getState) => {
        let serchText = data.searchText === "" ? null : data.searchText;
        let patients = getState().asyncMessageState.linkedPatients;
        let patient = patients.find((e) => {
            return e.userId === data.patientId
        });
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        data.firstName = patient.firstName;
        data.lastName = patient.lastName;
        data.participantType = USERTYPES.PATIENT;
        data.thumbNail = patient.thumbNail;
        data.userId = data.patientId;
        AsyncGet(API.getParticipantsByContext 
                + data.conversationId +
            '/' + USER_ID +
            '/' + data.patientId +
            '/' + USER_TYPE +
            '/' + serchText)
            .then(resp => {
                dispatch(getLinkedParticipantsByPatientsSuccess(resp.data));
            })
            .catch(err => {
               console.log(err)
            })
    }
};


export function getLinkedParticipantsList(data) {
    return (dispatch) => {
        dispatch(startLoading())
        let serchText = data.searchText === "" ? null : data.searchText;
        let USER_ID = getUserInfo().coreoHomeUserId;
        let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
        AsyncGet(API.getParticipantsByContext 
                + data.conversationId +
            '/' + USER_ID +
            '/' + data.patientId +
            '/' + USER_TYPE +
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

export function getDashboardMessageCount() {
    return (dispatch) => {
        let USER_ID = getUserInfo().coreoHomeUserId;
        AsyncGet(API.getDashboardMessageCount + USER_ID + '/' + USERTYPES.SERVICE_PROVIDER)
            .then(resp => {
                dispatch(getDashboardCountSuccess(resp.data));
            })
            .catch(err => {
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
    return (dispatch) => {
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
    return (dispatch) => {
        dispatch(onClearConversationImageUrl());
    }
};

const onClearConversationImageUrl = () => {
    return {
        type: AsyncMessageActions.clearConversationImageUrl
    }
};



export function CanServiceProviderCreateMessage() {
    return (dispatch) => {
        let USER_ID = getUserInfo().coreoHomeUserId;
        AsyncGet(API.canCreateMessage + USER_ID).then(resp => {
            dispatch(CanServiceProviderCreateMessageSuccess(resp.data))
        }).catch(err => {
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
        let USER_ID = getUserInfo().coreoHomeUserId;
        AsyncGet(API.getContext + USER_ID)
            .then(resp => {
                dispatch(getLinkedPatientsSuccess(resp.data));
            })
            .catch(err => {
            })
    }
};


export function ClearCurrentOpenConversation() {
    return (dispatch) => {
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
    let USER_ID = getUserInfo().coreoHomeUserId;
    let USER_TYPE = USERTYPES.SERVICE_PROVIDER;
    AsyncGet(API.getConverstionCountByUserId 
        + USER_ID + '/'
        + USER_TYPE)
        .then(resp => {
            dispatch(getConversationCountSuccess(resp.data));
        })
        .catch(err => {
        })
}
};

const getConversationCountSuccess = (data) =>{
    return{
        type: AsyncMessageActions.setConversationCount,
        data
    }
};

const verifyIsConversationMessageExist = (data) => {
    return(dispatch, getState) => {
        let state = getState();
        let conversationMessageData = [...state.asyncMessageState.conversation.messages];
        const index = conversationMessageData.indexOf(
            conversationMessageData.filter(el => el.conversationMessageId === data.messages[0].conversationMessageId)[0]
        );
        if(index === -1){
            dispatch(pushConversation(data));
        }
    };
};

export function setRemoveParticipantConcurrency (data){
    return {
        type: AsyncMessageActions.setRemoveParticipantConcurrency,
        data
    }
 };

 export function getMessageFallBackInterval(){
    return (dispatch) => {
        AsyncGet(API.getMessageFallBackInterval)
            .then(resp => {
                resp.data && resp.data.length > 0 && dispatch(msgCallbackInterval(parseInt(resp.data[0].value, 10)))
            })
            .catch(err => {
            })
    }
};