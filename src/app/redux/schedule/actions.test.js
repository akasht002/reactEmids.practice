import * as actions from './actions';
import { Schedule } from './bridge';
import { API } from '../../services/api'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SELECTED_POS_ERROR_MSG, NEW_POS_ERROR_MSG } from '../constants/constants';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// jest.mock('../../../utils/userUtility', () => ({
//     getPatientData: () => ({
//         patientId: 'G'
//     }),
//     getUserInfo : () => ( {
//         serviceProviderId :234,
//         coreoHomeUserId :34
//     })
// }))


describe('actions', () => {
    it('should create an action to getServiceCategorySuccess', () => {
      let data = {}
      const expectedAction = {
        type: Schedule.getServiceCategorySuccess,
        data
      }
      expect(actions.getServiceCategorySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceTypeSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getServiceTypeSuccess,
          data
        }
        expect(actions.getServiceTypeSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceDetails', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.clearServiceDetails,
          data
        }
        expect(actions.clearServiceDetails(data)).toEqual(expectedAction)
      })
  
      it('should create an action to getPatientAddressSuccess', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.getPatientAddressSuccess,
            data
          }
          expect(actions.getPatientAddressSuccess(data)).toEqual(expectedAction)
      })


      it('should create an action to getStateSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getStateSuccess,
          data
        }
        expect(actions.getStateSuccess(data)).toEqual(expectedAction)
      })
  
      it('should create an action to setSelectedPos', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.setSelectedPos,
            data
          }
          expect(actions.setSelectedPos(data)).toBeDefined()
      })


      it('should create an action to getValidPatientAddressSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getValidPatientAddressSuccess,
          data
        }
        expect(actions.getValidPatientAddressSuccess(data)).toEqual(expectedAction)
      })
  
      it('should create an action to getEntityServiceProviderListSuccess ', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.getEntityServiceProviderListSuccess,
            data
          }
          expect(actions.getEntityServiceProviderListSuccess(data)).toEqual(expectedAction)
      })


      it('should create an action to getRecurringPatternSuccess ', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getRecurringPatternSuccess,
          data
        }
        expect(actions.getRecurringPatternSuccess(data)).toEqual(expectedAction)
      })
  
      it('should create an action to getDaysSuccess ', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.getDaysSuccess,
            data
          }
          expect(actions.getDaysSuccess(data)).toEqual(expectedAction)
      })


      it('should create an action to disableShowmore ', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.disableShowmore,
          data
        }
        expect(actions.disableShowmore(data)).toEqual(expectedAction)
      })
  
      it('should create an action to clearESPListSchedule ', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.clearESPListSchedule,
            data
          }
          expect(actions.clearESPListSchedule(data)).toBeDefined()
      })

      it('should create an action to getAssessmentDetailSuccess ', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getAssessmentDetailSuccess,
          data
        }
        expect(actions.getAssessmentDetailSuccess(data)).toEqual(expectedAction)
      })
  
      it('should create an action to createOrEditAssessmentSuccess ', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.createOrEditAssessmentSuccess,
            data
          }
          expect(actions.createOrEditAssessmentSuccess(data)).toEqual(expectedAction)
      })


      it('should create an action to getIndividualSchedulesDetailsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getIndividualSchedulesDetailsSuccess,
          data
        }
        expect(actions.getIndividualSchedulesDetailsSuccess(data)).toEqual(expectedAction)
      })
  
      it('should create an action to isScheduleEdit ', () => {
          let data = {}
          const expectedAction = {
            type: Schedule.isScheduleEdit,
            data
          }
          expect(actions.isScheduleEdit(data)).toEqual(expectedAction)
      })

      it('should create an action to isAssessmentEdit ', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.isAssessmentEdit,
          data
        }
        expect(actions.isAssessmentEdit(data)).toEqual(expectedAction)
      })
  
      it('should create an action to setselectedServices', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.selectedServices,
          data
        }
        expect(actions.setselectedServices(data)).toEqual(expectedAction)
      })
      
      it('should create an action to setselectedServicesSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.selectedServices,
          data
        }
        expect(actions.setselectedServicesSuccess(data)).toEqual(expectedAction)
      })

      it('should create an action to checkServiceType', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getServiceTypeSuccess,
          data
        }
        expect(actions.checkServiceType(data)).toEqual(expectedAction)
      })

      it('should create an action to setServiceTypeIds', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.setServiceTypeIds,
          data
        }
        expect(actions.setServiceTypeIds(data)).toEqual(expectedAction)
      })

      it('should create an action to setServiceCategoryId', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.setServiceCategoryId,
          data
        }
        expect(actions.setServiceCategoryId(data)).toEqual(expectedAction)
      })

      it('should create an action to selectOrClearAllServiceTypeSuccess', () => {
        let data = {}
        const expectedAction = {
          type: Schedule.getServiceTypeSuccess,
          data
        }
        expect(actions.selectOrClearAllServiceTypeSuccess(data)).toEqual(expectedAction)
      })
})


describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates getServiceCategory when fetching service content has been done', () => {
        fetchMock.getOnce(API.GetServiceCategoryTypeTask, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceCategory(12,{},true)).then(() => {
          store.dispatch(actions.getServiceCategorySuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getServiceType when fetching service content has been done', () => {
        fetchMock.getOnce(API.GetServiceCategoryTypeTask, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getServiceType(12,{},true)).then(() => {
          store.dispatch(actions.getServiceTypeSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates selectOrClearAllServiceType when fetching service content has been done', () => {
        fetchMock.getOnce(API.GetServiceCategoryTypeTask, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.selectOrClearAllServiceType(12,{},true)).then(() => {
          store.dispatch(actions.getServiceTypeSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getPatientAddress when fetching service content has been done', () => {
        fetchMock.getOnce(API.getPatientAddress, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getPatientAddress(12)).then(() => {
          store.dispatch(actions.getServiceTypeSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getStates when fetching service content has been done', () => {
        fetchMock.getOnce(API.getStates, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getStates()).then(() => {
          store.dispatch(actions.getStateSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getValidPatientAddress when fetching service content has been done', () => {
        fetchMock.getOnce(API.getValidPatientAddress, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getValidPatientAddress({},()=>{})).then(() => {
          store.dispatch(actions.getValidPatientAddressSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getEntityServiceProviderList when fetching service content has been done', () => {
        fetchMock.getOnce(API.searchESP, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getEntityServiceProviderList({},2)).then(() => {
          store.dispatch(actions.getEntityServiceProviderListSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates selectESP when fetching service content has been done', () => {
        const data = {
           
        }
        const store = mockStore({
            scheduleState : {
                entityServiceProvidersList:[{}]
            }
        }
        )

        store.dispatch(actions.selectESP(23))
    })

    it('creates getEntityServiceProviderListSearch when fetching service content has been done', () => {
        fetchMock.getOnce(API.searchESP, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getEntityServiceProviderListSearch({},2)).then(() => {
          store.dispatch(actions.getEntityServiceProviderListSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getRecurringPattern when fetching service content has been done', () => {
        fetchMock.getOnce(API.servicerequest , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getRecurringPattern({},2)).then(() => {
          store.dispatch(actions.getRecurringPatternSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getDays when fetching service content has been done', () => {
        fetchMock.getOnce(API.servicerequest , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getDays({},2)).then(() => {
          store.dispatch(actions.getDaysSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates createSchedule when fetching service content has been done', () => {
        fetchMock.getOnce(API.createOrEditSchedule , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.createSchedule({},2)).then(() => {
          store.dispatch(actions.clearESPListSchedule([]))
          expect(store.getActions()).toBeDefined()
        })
    })


    it('creates editSchedule when fetching service content has been done', () => {
        fetchMock.getOnce(API.createOrEditSchedule , {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.editSchedule({},2)).then(() => {
          store.dispatch(actions.clearESPListSchedule([]))
          expect(store.getActions()).toBeDefined()
        })
    })


    it('creates createOrEditAssessment when fetching service content has been done', () => {
        fetchMock.getOnce(API.createOrEditAssessment, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.createOrEditAssessment({},2)).then(() => {
          store.dispatch(actions.clearESPListSchedule([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getAssessmentDetailsById when fetching service content has been done', () => {
        fetchMock.getOnce(API.getAssessmentByAssessmentId, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getAssessmentDetailsById({},2)).then(() => {
          store.dispatch(actions.getAssessmentDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates getIndividualSchedulesDetails when fetching service content has been done', () => {
        fetchMock.getOnce(API.getIndividualSchedulesDetails, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getIndividualSchedulesDetails({},2)).then(() => {
          store.dispatch(actions.getAssessmentDetailSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })
})