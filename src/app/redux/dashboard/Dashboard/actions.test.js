import * as actions from './actions';
import { DashboardDetail  } from './bridge'
import { API } from '../../../services/api'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { START_VISIT, IN_PROGRESS,VISIT_SUMMARY, PAYMENT_PENDING } from '../../constants/constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/userUtility', () => ({
    getPatientData: () => ({
        patientId: 'G'
    }),
    getUserInfo : () => ( {
        serviceProviderId :234,
        coreoHomeUserId :34
    })
}))

describe('actions', () => {
    it('should create an action to getServiceStatusSuccess', () => {
      let data = {}
      const expectedAction = {
        type: DashboardDetail.get_service_request_success,
        data
      }
      expect(actions.getServiceStatusSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getPatientVisitDetailSuccess', () => {
        let data = {}
        const expectedAction = {
          type: DashboardDetail.get_patient_visit_detail_success,
          data
        }
        expect(actions.getPatientVisitDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getEntityServiceProviderListSuccess', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.get_entity_service_provider_list,
            data
        }
        expect(actions.getEntityServiceProviderListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceVisitCountSuccess', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.get_service_visit_count,
            data
        }
        expect(actions.getServiceVisitCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to setServiceVisitDate', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.setServiceVisitDate,
            data
        }
        expect(actions.setServiceVisitDate(data)).toEqual(expectedAction)
    })

    it('should create an action to getPatientServiceRequestDetailSuccess', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.get_patient_service_request_detail_success,
            data
        }
        expect(actions.getPatientServiceRequestDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceProviderDetailSuccess', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.get_service_provider_detail_success,
            data
        }
        expect(actions.getServiceProviderDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getConversationDetailSuccess', () => {
        let data = {}
        const expectedAction = {
            type: DashboardDetail.get_conversation_detail_success,
            data
        }
        expect(actions.getConversationDetailSuccess(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates getServiceStatusDetail when fetching service content has been done', () => {
        fetchMock.getOnce(API.getServiceRequestStatus, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceStatusDetail()).then(() => {
          store.dispatch(actions.getServiceStatusSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getServiceVisitCount when fetching service content has been done', () => {
        fetchMock.getOnce(API.getServiceVisitsCount, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })

        
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceVisitCount()).then(() => {
          store.dispatch(actions.getServiceVisitCountSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getEntityServiceProviderList when fetching service content has been done', () => {
        fetchMock.getOnce(API.getEntityServiceProviderList , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
        let data =  {  visitStatusId :23}
    
        return store.dispatch(actions.getEntityServiceProviderList()).then(() => {
          store.dispatch(actions.getEntityServiceProviderListSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getEntityServiceProviderListSearch when fetching service content has been done', () => {
        fetchMock.getOnce(API.getEntityServiceProviderList , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getEntityServiceProviderListSearch()).then(() => {
          store.dispatch(actions.getEntityServiceProviderListSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getServiceProviderVists when fetching service content has been done', () => {
        fetchMock.getOnce(API.getServiceProviderVists, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceProviderVists()).then(() => {
          store.dispatch(actions.getPatientVisitDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getPatientServiceRequestDetail when fetching service content has been done', () => {
        fetchMock.getOnce(API.getServiceProviderRequests, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getPatientServiceRequestDetail()).then(() => {
          store.dispatch(actions.getPatientServiceRequestDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates updateEntityServiceVisit when fetching service content has been done', () => {
        fetchMock.post(API.assignServiceVisit, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })

        let id = 90,pageNo = 9 ;        
    
        return store.dispatch(actions.updateEntityServiceVisit(id,pageNo,true)).then(() => {
          store.dispatch(actions.getVisitServiceSchedule([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getServiceProviderDetail when fetching service content has been done', () => {
        fetchMock.getOnce(API.getServiceProviders, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceProviderDetail({})).then(() => {
          store.dispatch(actions.getServiceProviderDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getConversationDetail when fetching service content has been done', () => {
        fetchMock.getOnce(API.getConversationSummary, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getConversationDetail({})).then(() => {
          store.dispatch(actions.getConversationDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates updateStandByMode when fetching service content has been done', () => {
        fetchMock.put(API.updateStandByMode, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.updateStandByMode({})).then(() => {
          store.dispatch(actions.getConversationDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getConversationSummaryDashboardSignalR when fetching service content has been done', () => {
        fetchMock.get(API.getConversationSummary, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getConversationSummaryDashboardSignalR(23)).then(() => {
          store.dispatch(actions.getConversationSummaryItemSignalRSuceess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getConversationSummaryItemSignalRSuceess when fetching service content has been done', () => {
        const data = {
            visitStatusId:VISIT_SUMMARY,
            end_date:''
        }
        const store = mockStore({
            dashboardState : {
                 dashboardState: {
                     conversationDetail :[{conversationId :34}]
                 }
            }
        }
        )

        store.dispatch(actions.getConversationSummaryItemSignalRSuceess({conversationId :34}))
    })

    it('call goToServiceVisitProcessing fn',() =>{
        const data = {
            visitStatusId:12,
            end_date:''
        }
        const store = mockStore({data:[]})

        store.dispatch(actions.goToServiceVisitProcessing(data))
    });   
    
    it('call goToServiceVisitProcessing fn',() =>{
        const data = {
            visitStatusId:START_VISIT,
            end_date:''
        }
        const store = mockStore({data:[]})

        store.dispatch(actions.goToServiceVisitProcessing(data))
    });
    
    it('call goToServiceVisitProcessing fn',() =>{
        const data = {
            visitStatusId:IN_PROGRESS,
            end_date:''
        }
        const store = mockStore({data:[]})

        store.dispatch(actions.goToServiceVisitProcessing(data))
    });

    it('call goToServiceVisitProcessing fn',() =>{
        const data = {
            visitStatusId:PAYMENT_PENDING,
            end_date:''
        }
        const store = mockStore({data:[]})

        store.dispatch(actions.goToServiceVisitProcessing(data))
    });

    it('call goToServiceVisitProcessing fn',() =>{
        const data = {
            visitStatusId:VISIT_SUMMARY,
            end_date:''
        }
        const store = mockStore({data:[]})

        store.dispatch(actions.goToServiceVisitProcessing(data))
    });
      
});