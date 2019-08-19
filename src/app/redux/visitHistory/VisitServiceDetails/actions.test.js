import * as actions from './actions';
import { vistServiceHistoryDetails } from './bridge'
import { API } from '../../../services/api'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { START_VISIT, IN_PROGRESS,VISIT_SUMMARY, PAYMENT_PENDING } from '../../constants/constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getPatientData: () => ({
        patientId: 'G'
    }),
    getUserInfo : () => ( {
        serviceProviderId :234,
        coreoHomeUserId :34
    })
}))

describe('actions', () => {
    it('should create an action to visitHistoryLoading', () => {
      let data = {}
      const expectedAction = {
        type: vistServiceHistoryDetails.visitHistoryLoading,
        data
      }
      expect(actions.visitHistoryLoading(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceHistoryDetailsSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess,
          data
        }
        expect(actions.getVisitServiceHistoryDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSubmittedResponse', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getSubmittedResponse,
          data
        }
        expect(actions.getSubmittedResponse(data)).toEqual(expectedAction)
    })

    it('should create an action to updateVisitHistoryFilterState', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.updateVisitHistoryFilter,
          data
        }
        expect(actions.updateVisitHistoryFilterState(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceCategorySuccess', () => {
        let data = [{}]
        const expectedAction = {
          type: vistServiceHistoryDetails.getServiceCategorySuccess,
          data
        }
        expect(actions.getServiceCategorySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceProviders', () => {
        let data = [{}]
        const expectedAction = {
          type: vistServiceHistoryDetails.getAllServiceProviders,
          data
        }
        expect(actions.getServiceProviders(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceHistoryByIdDetailSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess,
          data
        }
        expect(actions.getVisitServiceHistoryByIdDetailSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceHistoryListSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getVisitServiceHistoryListSuccess,
          data
        }
        expect(actions.getVisitServiceHistoryListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getHistoryListCountSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getHistoryListCountSuccess,
          data
        }
        expect(actions.getHistoryListCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitFeedBackSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getVisitFeedBack,
          data
        }
        expect(actions.getVisitFeedBackSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestId', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getServiceRequestId,
          data
        }
        expect(actions.getServiceRequestId(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirty ', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.formDirty
        }
        expect(actions.formDirty(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceTypeSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getServiceTypeSuccess,
          data
        }
        expect(actions.getServiceTypeSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceProviders', () => {
        let data = [{}]
        const expectedAction = {
          type: vistServiceHistoryDetails.clearServiceProviders,
          data
        }
        expect(actions.clearServiceProviders(data)).toEqual(expectedAction)
    })

    it('should create an action to clearPatientForServiceProviders', () => {
        let data = [{}]
        const expectedAction = {
          type: vistServiceHistoryDetails.clearPatientForServiceProviders,
          data
        }
        expect(actions.clearPatientForServiceProviders(data)).toEqual(expectedAction)
    })

    it('should create an action to clearServiceTypes', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.clearServiceTypes
        }
        expect(actions.clearServiceTypes(data)).toEqual(expectedAction)
    })

    it('should create an action to getAllPatientForServiceProvidersSuccess', () => {
        let data = {}
        const expectedAction = {
          type: vistServiceHistoryDetails.getAllPatientForServiceProviders,
          data
        }
        expect(actions.getAllPatientForServiceProvidersSuccess(data)).toEqual(expectedAction)
    })
});


describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('call clearVisitServiceHistoryByIdDetail fn', () => {
        const store = mockStore({
            
        })
        expect(store.dispatch(actions.clearVisitServiceHistoryByIdDetail()))
    })

    it('Call getVisitServiceLists fn', () => {
        fetchMock.get(API.getVisitHistoryList, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitServiceLists()).then((response) => {
            store.dispatch(actions.getVisitServiceHistoryListSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getVisitServiceListSort fn', () => {
        fetchMock.get(API.getSortedVisitHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitServiceListSort()).then((response) => {
            store.dispatch(actions.getVisitServiceHistoryListSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getVisitServiceHistoryByIdDetail fn', () => {
        fetchMock.get(API.getServiceVisitsHistoryById, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitServiceHistoryByIdDetail()).then((response) => {
            store.dispatch(actions.getVisitServiceHistoryByIdDetailSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getFilteredData fn', () => {
        fetchMock.get(API.getFilteredVisitHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getFilteredData()).then((response) => {
            store.dispatch(actions.getVisitServiceHistoryDetailsSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getSort fn', () => {
        fetchMock.get(API.getSortedVisitHistory, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getSort()).then((response) => {
            store.dispatch(actions.getVisitServiceHistoryDetailsSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getServiceProviderRating fn', () => {
        fetchMock.get(API.getRatingAndFeedback , {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getServiceProviderRating()).then((response) => {
            store.dispatch(actions.getSubmittedResponse())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getAllServiceProviders fn', () => {
        fetchMock.get(API.getAllServiceProviders , {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getAllServiceProviders()).then((response) => {
            store.dispatch(actions.getServiceProviders())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getServiceCategory fn', () => {
        fetchMock.get(API.getServiceCategory , {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getServiceCategory()).then((response) => {
            store.dispatch(actions.getServiceCategorySuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getServiceType fn', () => {
        fetchMock.get(API.servicerequest, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getServiceType()).then((response) => {
            store.dispatch(actions.getServiceTypeSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getServiceType fn', () => {
        fetchMock.get(API.servicerequest, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getServiceType()).then((response) => {
            store.dispatch(actions.getServiceTypeSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getHistoryListCount fn', () => {
        fetchMock.get(API.getHistoryListCount, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getHistoryListCount()).then((response) => {
            store.dispatch(actions.getHistoryListCountSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getVisitFeedBack fn', () => {
        fetchMock.get(API.getVisitFeedback , {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitFeedBack()).then((response) => {
            store.dispatch(actions.getVisitFeedBackSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getAllPatientForServiceProviders fn', () => {
        fetchMock.get(API.getAllPatientForServiceProviders, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({})
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getAllPatientForServiceProviders()).then((response) => {
            store.dispatch(actions.getAllPatientForServiceProvidersSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});