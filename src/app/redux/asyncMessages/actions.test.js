import * as actions from './actions';
import { AsyncMessageActions } from './bridge'

import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../services/api';
import { endLoading } from '../loading/actions';

let localStorage = {};

let mockLocalStorage = {
    setItem(key, value) {
      return Object.assign(localStorage, { [key]: value });
    }
  }

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
window.localStorage = mockLocalStorage;

jest.mock('../../utils/signalrUtility', () => ({
    getPatientData: () => ({
        firstName: "Name",
        lastName:'LName',
        imageData:{ image:'' }
    }),
    getUserInfo: () => ({
        userType : 'G',
        coreoHomeUserId:34
    }),
    fetchUserId: () => ({
        userId: 'G'
    }),
    getCareTeamId: () => ({
        userId: 'G'
    }),
    invokeSignalr: () => ({
        firstName: "Name",
        lastName:'LName',
        imageData:{ image:'' }
    })
}))



describe('actions', () => {
    it('should create an action to msgCallbackInterval', () => {
      const expectedAction = {
        type: AsyncMessageActions.msgCallbackInterval
      }
      expect(actions.msgCallbackInterval ()).toEqual(expectedAction)
    })

    it('should create an action to setConversationSummary ', () => {
        const expectedAction = {
          type: AsyncMessageActions.setConversationSummary
        }
        expect(actions.setConversationSummary()).toEqual(expectedAction)
    })

    it('should create an action to convLoadingStart', () => {
        const expectedAction = {
          type: AsyncMessageActions.loadingStart
        }
        expect(actions.convLoadingStart()).toEqual(expectedAction)
    })

    it('should create an action to convLoadingEnd', () => {
        const expectedAction = {
          type: AsyncMessageActions.loadingEnd
        }
        expect(actions.convLoadingEnd()).toEqual(expectedAction)
    })

    it('should create an action to pushConversation', () => {
        const expectedAction = {
          type: AsyncMessageActions.pushConversation
        }
        expect(actions.pushConversation()).toEqual(expectedAction)
    })

    it('should create an action to pushUnreadConversation', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.pushUnreadConversation,
          data: data
        }
        expect(actions.pushUnreadConversation(data)).toEqual(expectedAction)
    })

    it('should create an action to openedAsyncPage ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.setopenedAsyncPage,
          data: data
        }
        expect(actions.openedAsyncPage(data)).toEqual(expectedAction)
    })
    

    it('should create an action to pushUnreadCount ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.pushUnreadCount,
          data: data
        }
        expect(actions.pushUnreadCount(data)).toEqual(expectedAction)
    })

    it('should create an action to pushConversationMessage ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.pushConversationMessage,
          data: data
        }
        expect(actions.pushConversationMessage(data)).toEqual(expectedAction)
    })

    it('should create an action to updateTitle ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.updateTitle,
          data: data
        }
        expect(actions.updateTitle(data)).toEqual(expectedAction)
    })

    it('should create an action to setNewConversationId  ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.setNewConversationId,
          id: data
        }
        expect(actions.setNewConversationId(data)).toEqual(expectedAction)
    })

    it('should create an action to getConversationCountSuccess  ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.setConversationCount,
          data: data
        }
        expect(actions.getConversationCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to onUnreadCountSuccess  ', () => {
        const data = {}
        const expectedAction = {
          type: AsyncMessageActions.setUnreadCountDetails,
          data: data
        }
        expect(actions.onUnreadCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to clearConversation ', () => {
        const expectedAction = {
          type: AsyncMessageActions.clearConversation
        }
        expect(actions.clearConversation()).toEqual(expectedAction)
    })

    it('should create an action to getLinkedParticipantsByPatientsSuccess ', () => {
        let data ={}
        const expectedAction = {
          type: AsyncMessageActions.setLinkedParticipants,
          data:data
        }
        expect(actions.getLinkedParticipantsByPatientsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getDashboardCountSuccess ', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setDashboardMessageCount,
          data:data
        }
        expect(actions.getDashboardCountSuccess(data)).toEqual(expectedAction)
    })


    it('should create an action to setActivePageNumber ', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setActivePageNumber,
          data:data
        }
        expect(actions.setActivePageNumber(data)).toEqual(expectedAction)
    })

    it('should create an action to setRemoveParticipantConcurrency  ', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setRemoveParticipantConcurrency,
          data:data
        }
        expect(actions.setRemoveParticipantConcurrency(data)).toEqual(expectedAction)
    })

    it('should create an action to setConversationId   ', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setConversationId,
          data:data
        }
        expect(actions.setConversationId(data)).toEqual(expectedAction)
    })

    it('should create an action to setCurrentOpenConversation', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setconversation,
          data:data
        }
        expect(actions.setCurrentOpenConversation(data)).toEqual(expectedAction)
    })

    it('should create an action to setConversationData', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setconversation,
          data:data
        }
        expect(actions.setConversationData(data)).toEqual(expectedAction)
    })

    it('should create an action to getLinkedPatientsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setLinkedPatients,
          data:data
        }
        expect(actions.getLinkedPatientsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to onGetConversationImageWithImageIdSuccess', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setConversationImage,
          data:data
        }
        expect(actions.onGetConversationImageWithImageIdSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to onClearConversationImageUrl', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.clearConversationImageUrl,
          data:data
        }
        expect(actions.onClearConversationImageUrl(data)).toEqual(expectedAction)
    })

    it('should create an action to onGetConversationImageWithImageIdSuccess', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setConversationImage,
          data:data
        }
        expect(actions.onGetConversationImageWithImageIdSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to CanServiceProviderCreateMessageSuccess', () => {
        let data = {}
        const expectedAction = {
          type: AsyncMessageActions.setCanCreateConversation,
          data:data
        }
        expect(actions.CanServiceProviderCreateMessageSuccess(data)).toEqual(expectedAction)
    })
  
})

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates setNewConversationSuccess when fetching service content has been done', () => {
        const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
        let data = 43
        store.dispatch(actions.setNewConversationSuccess(data))
    })

    it('creates clearConversationImageUrl when fetching service content has been done', () => {
        const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
        store.dispatch(actions.clearConversationImageUrl())
    })

    it('creates verifyIsConversationMessageExistSendMessage when fetching service content has been done', () => {
        const store = mockStore({asyncMessageState : { 
            openedAsyncPage:'conversationSummary',
            conversation: { messages: [{conversationMessageId :34}]} } 
        })
        let data = [{conversationMessageId :34}]
        store.dispatch(actions.verifyIsConversationMessageExistSendMessage(data))
    })


    it('creates verifyIsConversationMessagesExist when fetching service content has been done', () => {
        const store = mockStore({asyncMessageState : { 
            openedAsyncPage:'conversationSummary',
            conversation: { messages: [{conversationMessageId :34}]} } 
        })
        let data = [{conversationMessageId :34}]
        store.dispatch(actions.verifyIsConversationMessagesExist(data))
    })


    it('creates getConversationSummaryItemSignalR when fetching service content has been done', () => {
        fetchMock.getOnce('conversation/user/1/G/1/10', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
        let pageNumber = 1;
    
        return store.dispatch(actions.getConversationSummaryItemSignalR(pageNumber)).then(() => {
          store.dispatch(actions.setConversationSummary([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd()) 
        }) 
    })

    it('creates CanServiceProviderCreateMessage when fetching service content has been done', () => {
        fetchMock.getOnce('conversation/user/1/G/1/10', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
        let pageNumber = 1;
    
        return store.dispatch(actions.CanServiceProviderCreateMessage(pageNumber)).then(() => {
          store.dispatch(actions.setConversationSummary([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd()) 
        }) 
    })

    it('creates getConversationImageWithImageId when fetching service content has been done', () => {
        fetchMock.getOnce('conversation/user/1/G/1/10', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
        let pageNumber = 1;
    
        return store.dispatch(actions.getConversationImageWithImageId(pageNumber)).then(() => {
          store.dispatch(actions.setConversationSummary([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd()) 
        }) 
    })
  
    it('creates onFetchConversationSummary when fetching service content has been done', () => {
      fetchMock.getOnce('conversation/user/1/G/1/10', {
        body: { data: [] },
        headers: { 'content-type': 'application/json' }
      })

      const store = mockStore({asyncMessageState : { openedAsyncPage:'conversationSummary' } })
      let pageNumber = 1;
      let hideLoading = true;
  
      return store.dispatch(actions.onFetchConversationSummary(pageNumber,hideLoading)).then(() => {
        store.dispatch(actions.setConversationSummary([]))
        expect(store.getActions()).toBeDefined()
      }).catch(err => {
        store.dispatch(actions.convLoadingEnd()) 
      })
     

    })
    

    it('creates getConversationSummaryItemSignalRSuceess ', () => {
        fetchMock.getOnce('Conversation/CareTeam/1/G/1/10', {
            body: { data: [] },
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({
            asyncMessageState : { 
                conversationSummary: [{}],
                openedAsyncPage:'conversationSummary' 
            }
         })

        let data = 1;
        
        return store.dispatch(actions.getConversationSummaryItemSignalRSuceess(data)).then(() => {
            store.dispatch(actions.setConversationSummary([]))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(actions.convLoadingEnd())
        })  

    })     

    it('creates onFetchConversation for hideloading is true', () => {

        const data = {
            currentConversation:{ conversationId:1 }
        }

        fetchMock.getOnce('conversation/1/1/G/1', {
          body: {  data: '',currentConversation:{conversationId:1}  },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore(
                {
                asyncMessageState:{
                                    currentConversation:{
                                        conversationId:5
                                    }
                                }
                }
             )       
  
        let pageNumber = 1;
        let hideLoading = false;
        
        return store.dispatch(actions.onFetchConversation(pageNumber,hideLoading)).then(() => {
          store.dispatch(actions.setConversationData(data))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd())
        })  
  
    })

      it('creates onFetchConversation for hideloading is false', () => {
        fetchMock.getOnce('conversation/1/1/G/1', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({
            asyncMessageState:{
                                currentConversation:{
                                    conversationId:5
                                }
                            }
            })       
  
        let pageNumber = 1;
        let hideLoading = false;
        
        return store.dispatch(actions.onFetchConversation(pageNumber,hideLoading)).then(() => {
          store.dispatch(actions.setConversationData([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd())
        })  
  
      })

      it('creates onCreateNewConversation ', () => {
        fetchMock.getOnce('conversation', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({
            asyncMessageState:{
                                currentConversation:{
                                    conversationId:5
                                }
                            }
            })       
  
        let data = {
            title:'',
            context:'',
            participantList:[]
        };
        
        return store.dispatch(actions.onCreateNewConversation(data)).then(() => {
          store.dispatch(actions.setNewConversationSuccess([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd())
        })  
  
      })

      it('creates onSaveTitle ', () => {
        fetchMock.getOnce('conversation', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({
            asyncMessageState:{
                                currentConversation:{
                                    conversationId:5
                                }
                            }
            })       
  
        let data = {
            title:''
        };
        
        return store.dispatch(actions.onSaveTitle(data)).then(() => {
          store.dispatch(actions.updateTitle([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd())
        })  
  
      })

      it('check goToConversation fn', () => {  
        const store = mockStore({ data: '' })
        return store.dispatch(actions.goToConversation())
      })

      it('creates onSendNewMessage function test ', () => {
        fetchMock.getOnce('conversation/message', {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({
            result: { conversationId :2,conversationMessageId :3 }
            })       
  
        let data = {
            title:''
        };
        
        return store.dispatch(actions.onSendNewMessage(data)).then(() => {
          store.dispatch(actions.verifyIsConversationMessageExistSendMessage([]))
          expect(store.getActions()).toBeDefined()
        }).catch(err => {
          store.dispatch(actions.convLoadingEnd())
        })  
  
      })

      it('creates onAddParticipant function test ', () => {       
        fetchMock.getOnce(API.addParticipant, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' }
          })
    
          const store = mockStore({
              result: { conversationId :2,conversationMessageId :3 }
              })       
    
          let data = {
              title:''
          };
          
          return store.dispatch(actions.onAddParticipant(data)).then(() => {
            store.dispatch(actions.onFetchConversation(1))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getConversationImageWithImageId function test ', () => {       
        fetchMock.getOnce(API.getConversationImage, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' }
          })
    
          const store = mockStore({
              result: { conversationId :2,conversationMessageId :3 }
              })       
    
          let data = 23;
          
          return store.dispatch(actions.getConversationImageWithImageId(data)).then(() => {
            store.dispatch(actions.onGetConversationImageWithImageIdSuccess(1))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates onRemoveParticipant function test ', () => {       
        fetchMock.getOnce(API.removeParticipant, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' }
          })
    
          const store = mockStore({
              result: { conversationId :2,conversationMessageId :3 }
              })       
    
          let data = {
              title:''
          };
          
          return store.dispatch(actions.onRemoveParticipant(data)).then(() => {
            store.dispatch(actions.onFetchConversation(1))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getUnreadMessageCounts function test ', () => {       
        fetchMock.get(API.getUnreadCount + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })    
               
          return store.dispatch(actions.getUnreadMessageCounts()).then((response) => {
            store.dispatch(actions.onUnreadCountSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getUnreadMessageCounts function test ', () => {       
        fetchMock.get(API.getConverstionCountByUserId + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })    
               
          return store.dispatch(actions.getConversationCount()).then((response) => {
            store.dispatch(actions.getConversationCountSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('check goToConversationSummary fn', () => {  
        const store = mockStore({asyncMessageState:{
            currentConversation:{
                conversationId:2 
            }
        }
        })
        return store.dispatch(actions.goToConversationSummary())
      })


      it('creates getLinkedPatients function test ', () => {       
        fetchMock.get(API.getContext  + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })    
               
          return store.dispatch(actions.getLinkedPatients()).then((response) => {
            store.dispatch(actions.getLinkedPatientsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })    


      it('check setLinkedPatients fn', () => {  
        const store = mockStore({asyncMessageState:{
            currentConversation:{
                conversationId:2 
            }
        }
        })
        return store.dispatch(actions.setLinkedPatients())
      })

      it('check setLinkedPatients fn', () => {  
        const store = mockStore({asyncMessageState:{
            currentConversation:{
                conversationId:2 
            }
        }
        })
        return store.dispatch(actions.setLinkedPatients())
      })

      it('check getConversationSummaryItemSignalRSuceess  fn', () => {  
        const store = mockStore({
            asyncMessageState:{
                currentConversation:[],
                conversationSummary:[]
            }
        })
        let data = {
            conversationId:9
        }
        return store.dispatch(actions.getConversationSummaryItemSignalRSuceess(data))
      })

      it('check clearLinkedParticipants fn', () => {  
        const store = mockStore({asyncMessageState:{
            currentConversation:{
                conversationId:2 
            }
        }
        })
        return store.dispatch(actions.clearLinkedParticipants())
      })

      it('check ClearCurrentOpenConversation fn', () => {  
        const store = mockStore({asyncMessageState:{
            currentConversation:{
                conversationId:2 
            }
        }
        })
        return store.dispatch(actions.ClearCurrentOpenConversation())
      })

      it('creates getCareTeamIndividualsList function test ', () => {       
        fetchMock.get(API.getIndividualsList  + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })    
               
          return store.dispatch(actions.getCareTeamIndividualsList()).then((response) => {
            store.dispatch(actions.getLinkedPatientsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getConversationItemSignalR function test ', () => {       
        fetchMock.get(API.getConversationMessage + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 },
              openedAsyncPage:[]
            })    
          let conversionId = 2
          let messageId = 3     
          return store.dispatch(actions.getConversationItemSignalR(conversionId,messageId)).then((response) => {
            store.dispatch(actions.verifyIsConversationMessageExist(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getLinkedParticipantsByPatients function test ', () => {       
        fetchMock.get(API.getParticipantsByContext  + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })  
            
         let data = {
            searchText :'sampleText'
         }
               
          return store.dispatch(actions.getLinkedParticipantsByPatients(data)).then((response) => {
            store.dispatch(actions.getLinkedParticipantsByPatientsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })


      it('creates getLinkedParticipantsList function test ', () => {       
        fetchMock.get(API.getParticipantsByContext   + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 }
            })  
            
         let data = {
            conversationId : 23
         }
               
          return store.dispatch(actions.getLinkedParticipantsList(data)).then((response) => {
            store.dispatch(actions.getLinkedParticipantsByPatientsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates getUnreadConversationByUserId function test ', () => {       
        fetchMock.get(API.getUnreadConversationsByUserId  + '1/G' , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            response:{}
          })
    
          const store = mockStore({
              data: { conversationId :2,conversationMessageId :3 },
              asyncMessageState:{ openedAsyncPage: 'conversation',currentConversation:2 },
              openedAsyncPage: 'conversation',
              conversationId :2
            })  
            
         let conversationId =  23
               
          return store.dispatch(actions.getUnreadConversationByUserId(conversationId)).then((response) => {
            store.dispatch(actions.verifyIsConversationMessagesExist(response.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates leaveConversation function test ', () => {       
        fetchMock.get(API.leaveConversation + '1/2/G' , {
            body: { data: {conversationId:2} },
            headers: { 'content-type': 'application/json' },
            response:{
                asyncMessageState:{
                    currentConversation:{
                        conversationId:2 
                    }
                },  
                conversationSummary: [],
                conversation: {},
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
            }
          })
    
          const store = mockStore(              
              {
                asyncMessageState:{
                    currentConversation:{
                        conversationId:2 
                    }
                },  
                conversationSummary: [],
                conversation: {},
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
            })    
            let data = {
                conversationId : 23
             }    
          return store.dispatch(actions.leaveConversation(data)).then((response) => {
            store.dispatch(actions.onFetchConversation(response))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates updateReadStatus function test ', () => {       
        fetchMock.get(API.updateReadStatus + '1/2/G' , {
            body: { data: {conversationId:2} },
            headers: { 'content-type': 'application/json' },
            response:{conversationId:2}
          })
    
          const store = mockStore(
              { asyncMessageState:
                {
                    currentConversation:{
                    conversationId:2 
                     }
                }
            })    
            let data = {
                conversationId : 23
             } 

          return store.dispatch(actions.updateReadStatus(data)).then((response) => {
            store.dispatch(actions.getDashboardMessageCount(response))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates checkLatestMessages function test ', () => {       
        fetchMock.get(API.getLatestMessages + '1/2/G' , {
            body: { data: {conversationId:2} },
            headers: { 'content-type': 'application/json' },
            response:{conversationId:2}
          })
    
          const store = mockStore(
              { 
                 
            asyncMessageState:{
                    openedAsyncPage :'conversation',
                    conversation: {messages : []},
                    currentConversation:{
                    conversationId:2 
                }
                }
            })    
            let conversationId = 2

          return store.dispatch(actions.checkLatestMessages(conversationId)).then((response) => {
            store.dispatch(actions.getDashboardMessageCount(response))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      })

      it('creates joinGroup function test ', () => {
        const store = mockStore(
            {               
          asyncMessageState:{
                  openedAsyncPage :'conversation',
                  conversation: {messages : []},
                  currentConversation:{
                  conversationId:2 
              }
              }
          }) 
          let conversationId = 2
          return store.dispatch(actions.joinGroup(conversationId))
      });

      it('creates checkConversationCreated function test ', () => {
        const store = mockStore(
            {               
          asyncMessageState:{
                  openedAsyncPage :'conversation',
                  conversation: {messages : []},
                  currentConversation:{
                  conversationId:2,
                  activePageNumber : 1
              }
              }
          }) 
          let conversationId = 2
          return store.dispatch(actions.checkConversationCreated(conversationId))
      });

      it('creates checkConversationExist function test ', () => {
        const store = mockStore(
            {               
          asyncMessageState:{
                  openedAsyncPage :'conversation',
                  conversation: {messages : []},
                  currentConversation:{
                  conversationId:2,
                  activePageNumber : 1,
                  conversationSummary :[{conversationId:2}]
              }
              }
          }) 
          let conversationId = 2
          return store.dispatch(actions.checkConversationExist(conversationId))
      });

      it('creates verifyIsConversationMessageExist function test ', () => {
        const store = mockStore(
            {               
          asyncMessageState:{
                  openedAsyncPage :'conversation',
                  conversation: {messages : []},
                  currentConversation:{
                  conversationId:2,
                  activePageNumber : 1,
                  conversationSummary :[{conversationId:2}]
              }
              }
          }) 
          let data = {messages:[]}
          return store.dispatch(actions.verifyIsConversationMessageExist (data))
      });

      it('check getMessageFallBackInterval fn', () => {  
        const store = mockStore({ data: '' })
        return store.dispatch(actions.getMessageFallBackInterval())
      })

      it('creates getMessageFallBackInterval  function test ', () => {
        fetchMock.get(API.getMessageFallBackInterval , {
            body: { data: {conversationId:2} },
            headers: { 'content-type': 'application/json' },
            response:{conversationId:2}
          })
    
          const store = mockStore(
              { 
                 
            asyncMessageState:{
                    openedAsyncPage :'conversation',
                    conversation: {messages : []},
                    currentConversation:{
                    conversationId:2 
                }
                }
            })

          return store.dispatch(actions.getMessageFallBackInterval()).then((response) => {
            store.dispatch(actions.getDashboardMessageCount(response))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            store.dispatch(endLoading())
          })   
      });

      it('creates verifyIsConversationMessagesExist function test ', () => {
        const store = mockStore(
            {               
          asyncMessageState:{
                  openedAsyncPage :'conversation',
                  conversation: {messages : [{}]},
                  currentConversation:{
                  conversationId:2,
                  activePageNumber : 1,
                  conversationSummary :[{conversationId:2}]
              }
              }
          }) 
          let data = [{conversationMessageId:2}]
          return store.dispatch(actions.verifyIsConversationMessagesExist(data))
      });
     
})

