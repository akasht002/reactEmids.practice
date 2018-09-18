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
    conversationImageUrl: ''
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
                        action.data
                    ]
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
        default:
            return state;
    }
};

export default asyncMessageState;