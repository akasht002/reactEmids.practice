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
    dashboardMessageCount: 0,
    conversationImageUrl: '',
    canCreateConversation: false,
    conversationCount: 20,
    openedAsyncPage: null,
    removeParticipantConcurrencyExist: false,
    activePageNumber: 1,
    isLoading: false,
    callbackInterval: 9000,
    conversationId: 0
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
                    participantList: action.data.participantList,
                    title: action.data.title,
                    isActive: action.data.isActive,
                    canEdit: action.data.canEdit,
                },
                currentConversation: {
                    ...state.currentConversation,
                    title: action.data.title,
                    isActive: action.data.isActive,
                    canEdit: action.data.canEdit,
                }
            };
        case AsyncMessageActions.pushUnreadConversation:
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        ...action.data
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
        case AsyncMessageActions.setopenedAsyncPage: {
            return {
                ...state,
                openedAsyncPage: action.data
            }
        }
        case AsyncMessageActions.pushConversationMessage:
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    messages: [
                        ...state.conversation.messages,
                        action.data
                    ],
                    participantList: action.data.participantList,
                }
            };
        case AsyncMessageActions.setRemoveParticipantConcurrency:
            return {
                ...state,
                removeParticipantConcurrencyExist: action.data
            }
        case AsyncMessageActions.clearConversation:
            return {
                ...state,
                conversation: {},
                currentConversation: {}
            }
        case AsyncMessageActions.setActivePageNumber:
            return {
                ...state,
                activePageNumber: action.data
            }
        case AsyncMessageActions.updateTitle:
            return {
                ...state,
                conversation: {
                    ...state.conversation,
                    title: action.data
                },
                currentConversation: {
                    ...state.currentConversation,
                    title: action.data
                }
            }
        case AsyncMessageActions.loadingStart:
            return {
                ...state,
                isLoading: true
            }
        case AsyncMessageActions.loadingEnd:
            return {
                ...state,
                isLoading: false
            }
        case AsyncMessageActions.msgCallbackInterval:
            return {
                ...state,
                callbackInterval: action.data
            }
        case AsyncMessageActions.setConversationId:
            return {
                ...state,
                conversationId: action.data
            }
        default:
            return state;
    }
};

export default asyncMessageState;