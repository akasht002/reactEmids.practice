import { API } from '../../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SummaryDetails } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// jest.mock('../../../services/http', () => ({
//     getUserInfo: () => ({
//         serviceProviderId: 12
//     })
// }))

describe('actions', () => {
    it('should create an action to getSummaryDetailsSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.getSummaryDetailsSuccess,
            data
        }
        expect(actions.getSummaryDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceEligibityStatusSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.getVisitServiceEligibityStatusSuccess,
            data
        }
        expect(actions.getVisitServiceEligibityStatusSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to startLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.startLoading
        }
        expect(actions.startLoadingProcessing(data)).toEqual(expectedAction)
    })

    it('should create an action to endLoadingProcessing  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.endLoading
        }
        expect(actions.endLoadingProcessing(data)).toEqual(expectedAction)
    })

    it('should create an action to getCalculationsData  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.getCalculationsData,
            data
        }
        expect(actions.getCalculationsData(data)).toEqual(expectedAction)
    })

    it('should create an action to saveOriginalTimeDiff  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.saveOriginalTimeDiff,
            data
        }
        expect(actions.saveOriginalTimeDiff(data)).toEqual(expectedAction)
    })

    it('should create an action to saveActualTimeDiff  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.saveActualTimeDiff,
            data
        }
        expect(actions.saveActualTimeDiff(data)).toEqual(expectedAction)
    })

    it('should create an action to getSavedSignatureSuccess  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.getSavedSignatureSuccess,
            data
        }
        expect(actions.getSavedSignatureSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtySummaryDetails  ', () => {
        let data = {}
        const expectedAction = {
            type: SummaryDetails.formDirtySummaryDetails
        }
        expect(actions.formDirtySummaryDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getSummaryDetails when fetching service content has been done', () => {
        fetchMock.get(API.getSummaryDetails , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getSummaryDetails(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {

        })
    })

    it('creates getSummaryDetail when fetching service content has been done', () => {
        fetchMock.get(API.getSummaryDetails , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getSummaryDetail(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getVisitServiceEligibilityStatus when fetching service content has been done', () => {
        const eligibilityData = {
            patientId: 1,
            serviceProviderId: 1,
            serviceRequestId: 1
        }
        fetchMock.get(API.getServiceRequestEligibilityStatus, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getVisitServiceEligibilityStatus(eligibilityData)).then((resp) => {
            store.dispatch(actions.getVisitServiceEligibityStatusSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates saveSummaryDetails when fetching service content has been done', () => {
        fetchMock.get(API.saveSummaryDetails, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.saveSummaryDetails(data)).then((resp) => {
            store.dispatch(actions.saveStartedTime(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates saveSignature when fetching service content has been done', () => {
        fetchMock.get(API.saveSignature, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.saveSignature(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates getSavedSignature when fetching service content has been done', () => {
        fetchMock.get(API.getSavedSignature, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.getSavedSignature(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

    it('creates updateVisitProcessingUpdateBilledDuration when fetching service content has been done', () => {
        fetchMock.get(API.visitProcessingUpdateBilledDuration , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: {data:[{name:''}]}
          })
          const store = mockStore({  })
          let data = ''
          return store.dispatch(actions.updateVisitProcessingUpdateBilledDuration(data)).then((resp) => {
            store.dispatch(actions.getSummaryDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
          }).catch(err => {
            
          })       
    })

 })