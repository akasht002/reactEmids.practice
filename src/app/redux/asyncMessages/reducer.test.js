import reducer from './reducer';
import { AsyncMessageActions } from './bridge'

describe('asyncMessages reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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

            }
        )
    })

    it('should handle the set_conversation_summary/asyncMessage', () => {
        expect(reducer([], {
            type: 'set_conversation_summary/asyncMessage',
            data:["data"]
        })).toEqual(
            { conversationSummary: ["data"] }
        )
    })

    it('should handle the set_conversation/asyncMessage', () => {
        expect(reducer([], {
            type: 'set_conversation/asyncMessage',
            data:["data"]
        })).toEqual(
            { conversation: ["data"] }
        )
    })

    it('should handle the set_new_conversation/asyncMessage', () => {
        expect(reducer([], {
            type: 'set_new_conversation/asyncMessage',
            id:["data"]
        })).toEqual(
            { newConversationId: ["data"] }
        )
    })

    it('should handle the set_current_open_conversation/asyncMessage', () => {
        expect(reducer([], {
            type: 'set_current_open_conversation/asyncMessage',
            data:["data"]
        })).toEqual(
            { currentConversation: ["data"] }
        )
    })

    it('should handle the clear_current_open_conversation/asyncMessage', () => {
        expect(reducer([], {
            type: 'clear_current_open_conversation/asyncMessage',
            data:["data"]
        })).toEqual(
            { currentConversation: {} }
        )
    })

    it('should handle the push_unread_count/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'push_unread_count/asyncMessage',
            data:data
        })).toEqual(
            { unreadCounts: data }
        )
    })

    it('should handle the push_conversation_summary/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'push_conversation_summary/asyncMessage',
            data:data
        })).toEqual(
            { conversationSummary: data }
        )
    })

    it('should handle the push_conversation/asyncMessage/asyncMessage', () => {
        const data = {
            conversation:{messages:[]},
            messages:[],
            participantLists:[],
            title:'',
            isActice:true,
            canEdit:true
        }
        expect(reducer({
            conversationSummary: [],
            conversation: {messages:[]},
            newConversationId: null,
            currentConversation: {},
            unreadCounts: [],
            linkedPatients: [],
            linkedParticipants: [],
            dashboardMessageCount: 0,
            conversationImageUrl: '',
            conversationCount: 10,
            openedAsyncPage: null,
            removeParticipantConcurrencyExist: false,
            isEmptyParticipantDataLoaded: false,
            activePageNumber: 1,
            isLoading: false,
            callbackInterval: 9000,
            conversationId: 0
        }, {
            type: 'push_conversation/asyncMessage/asyncMessage',
            data:data
        })).toBeDefined() 
    })

    it('should handle the pushUnreadConversation/asyncMessage', () => {
        const data = [{
            conversation:{messages:[]},
            messages:[],
            participantLists:[],
            title:'',
            isActice:true,
            canEdit:true
        }]
        expect(reducer({
            conversationSummary: [],
            conversation: {messages:[]},
            newConversationId: null,
            currentConversation: {},
            unreadCounts: [],
            linkedPatients: [],
            linkedParticipants: [],
            dashboardMessageCount: 0,
            conversationImageUrl: '',
            conversationCount: 10,
            openedAsyncPage: null,
            removeParticipantConcurrencyExist: false,
            isEmptyParticipantDataLoaded: false,
            activePageNumber: 1,
            isLoading: false,
            callbackInterval: 9000,
            conversationId: 0
        }, {
            type: 'pushUnreadConversation/asyncMessage',
            data: data
        })).toBeDefined() 
    })

    it('should handle the set_unread_count/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'set_unread_count/asyncMessage',
            data:data
        })).toEqual(
            { unreadCounts: data }
        )
    })

    it('should handle the set_linked_patients/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'set_linked_patients/asyncMessage',
            data:data
        })).toEqual(
            { linkedPatients: data }
        )
    })

    it('should handle the set_linked_participants/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'set_linked_participants/asyncMessage',
            data:data
        })).toBeDefined() 
    })

    it('should handle the setDashboardMessageCount/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'setDashboardMessageCount/asyncMessage',
            data:data
        })).toEqual(
            {
                dashboardMessageCount: data
            }
        ) 
    })

    it('should handle the clear_linked_participants/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'clear_linked_participants/asyncMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the set_conversation_image/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'set_conversation_image/asyncMessage',
            data:data
        })).toEqual({
            conversationImageUrl: data
        })
    })

    it('should handle the clear_conversation_image_url/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'clear_conversation_image_url/asyncMessage',
            data:data
        })).toEqual({
            conversationImageUrl: ''
        })
    })

    it('should handle the set_conversation_count/asyncMessage', () => {
        const data = ["data"]
        expect(reducer([], {
            type: 'set_conversation_count/asyncMessage',
            data:data
        })).toEqual({
            conversationCount: data
        })
    })

    it('should handle the set_opened_async_page/asynMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'set_opened_async_page/asynMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the set_opened_async_page/asynMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'set_opened_async_page/asynMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the push_conversation_asyncMessage/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer({
            conversationSummary: [],
            conversation: {messages:[]},
            newConversationId: null,
            currentConversation: {},
            unreadCounts: [],
            linkedPatients: [],
            linkedParticipants: [],
            dashboardMessageCount: 0,
            conversationImageUrl: '',
            conversationCount: 10,
            openedAsyncPage: null,
            removeParticipantConcurrencyExist: false,
            isEmptyParticipantDataLoaded: false,
            activePageNumber: 1,
            isLoading: false,
            callbackInterval: 9000,
            conversationId: 0
        }, {
            type: 'push_conversation_asyncMessage/asyncMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the setRemoveParticipantConcurrency/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'setRemoveParticipantConcurrency/asyncMessage',
            data:data
        })).toEqual({
            removeParticipantConcurrencyExist :data
        })
    })


    it('should handle the clearConversation/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'clearConversation/asyncMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the setActivePageNumber/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'setActivePageNumber/asyncMessage',
            data:data
        })).toEqual({
            activePageNumber: data
        })
    })

    it('should handle the updateTitle/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'updateTitle/asyncMessage',
            data:data
        })).toBeDefined()
    })

    it('should handle the loading_start/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'loading_start/asyncMessage',
            data:data
        })).toEqual({
            isLoading: true
        })
    })

    it('should handle the loading_end/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'loading_end/asyncMessage',
            data:data
        })).toEqual({
            isLoading: false
        })
    })

    it('should handle the msgCallbackInterval/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'msgCallbackInterval/asyncMessage',
            data:data
        })).toEqual({
            callbackInterval: data
        })
    })

    it('should handle the setCanCreateConversation', () => {
        const data = {
        }
        expect(reducer([], {
            type: AsyncMessageActions.setCanCreateConversation,
            data:data
        })).toEqual({
            canCreateConversation: data
        })
    })

    it('should handle the setConversationId/asyncMessage', () => {
        const data = {
            participantList:[]
        }
        expect(reducer([], {
            type: 'setConversationId/asyncMessage',
            data:data
        })).toEqual({
            conversationId: data
        })
    })


});