import {
    AsyncMessageActions
} from './actions'

const defaultState = {
    conversationSummary: [],
    conversation: {},
    newConversationId: null,
    currentConversation: {},
    unreadCounts: [],
    linkedPatients: [],
    linkedParticipants: [],
    dashboardMessageCount: null,
    conversationImageUrl: '',
    canCreateConversation: false,
    conversationCount: 20,
    openedAsyncPage : null
};

const asyncMessageState = (state = defaultState, action) => {
    switch (action.type) {
        case AsyncMessageActions.setConversationSummary:
            return {
                ...state,
                conversationSummary: action.data
            };
        case AsyncMessageActions.setconversation:
            return {
                ...state,
                conversation: action.data
            };
        case AsyncMessageActions.setNewConversationId:
            return {
                ...state,
                newConversationId: action.id
            };
        case AsyncMessageActions.setCurrentOpenConversation:
            return {
                ...state,
                currentConversation: action.data
            };
        case AsyncMessageActions.clearCurrentOpenConversation:
            return {
                ...state,
                currentConversation: {}
            };
        case AsyncMessageActions.pushUnreadCount:
            return {
                ...state,
                unreadCounts: action.data
            };
        case AsyncMessageActions.pushConversationSummary:
            return {
                ...state,
                conversationSummary: action.data
            };
        case AsyncMessageActions.pushConversation:
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        action.data.messages[0]
                    ],
                    participantList:  action.data.participantList,
                    title: action.data.title
                },
                currentConversation:{
                    ...state.currentConversation,
                    title: action.data.title
                }
            };
        case AsyncMessageActions.setUnreadCountDetails:
            return {
                ...state,
                unreadCounts: action.data
            };
        case AsyncMessageActions.setLinkedPatients:
            return {
                ...state,
                linkedPatients: action.data
            };
        case AsyncMessageActions.setLinkedParticipants:
            return {
                ...state,
                linkedParticipants: action.data
            };
        case AsyncMessageActions.setDashboardMessageCount:
            return {
                ...state,
                dashboardMessageCount: action.data
            };
        case AsyncMessageActions.clearLinkedParticipants:
            return {
                ...state,
                linkedParticipants: []
            };
        case AsyncMessageActions.setConversationImage:
            return {
                ...state,
                conversationImageUrl: action.data
            };
        case AsyncMessageActions.clearConversationImageUrl:
            return {
                ...state,
                conversationImageUrl: ''
            };
        case AsyncMessageActions.setCanCreateConversation:
            return {
                ...state,
                canCreateConversation: action.data
            };
        case AsyncMessageActions.setConversationCount:
            return {
                ...state,
                conversationCount: action.data
            };
        case AsyncMessageActions.setopenedAsyncPage:{
            return{
                ...state,
                openedAsyncPage: action.data
            }
        }
        default:
            return state;
    }
};

export default asyncMessageState;