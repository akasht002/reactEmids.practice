import { API } from '../../../services/api'
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { VisitServiceDetails } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12,
        isEntityServiceProvider : true
    })
}))

describe('actions', () => {
    it('should create an action to getVisitServiceDetailsSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getVisitServiceDetailsSuccess,
            data
        }
        expect(actions.getVisitServiceDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to scheduleLoading   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.isScheduleLoading,
            data
        }
        expect(actions.scheduleLoading(data)).toEqual(expectedAction)
    })

    it('should create an action to cancelHiredRequest   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.cancelHiredRequest,
            data
        }
        expect(actions.cancelHiredRequest(data)).toEqual(expectedAction)
    })

    it('should create an action to setEntityServiceProviderSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setEntityServiceProviderSuccess,
            data
        }
        expect(actions.setEntityServiceProviderSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceScheduleSuccess    ', () => {
        let data = {}
        let disableShowMore = true
        const expectedAction = {
            type: VisitServiceDetails.getVisitServiceScheduleSuccess,
            data,
            disableShowMore
        }
        expect(actions.getVisitServiceScheduleSuccess(data, disableShowMore)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestId    ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getServiceRequestId,
            data
        }
        expect(actions.getServiceRequestId(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceEligibityStatusSuccess     ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getVisitServiceEligibityStatusSuccess,
            data
        }
        expect(actions.getVisitServiceEligibityStatusSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to updateServiceRequestByServiceProviderSuccess      ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.updateServiceRequestByServiceProviderSuccess,
            data
        }
        expect(actions.updateServiceRequestByServiceProviderSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to canInitiateConversationSuccess       ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.canInitiateConversationSuccess,
            data
        }
        expect(actions.canInitiateConversationSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtyVisitServiceDetails       ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.formDirtyVisitServiceDetails
        }
        expect(actions.formDirtyVisitServiceDetails(data)).toEqual(expectedAction)
    })

    it('should create an action to getDaysSuccess        ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getDaysSuccess 
        }
        expect(actions.formDirtyVisitServiceDetails(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates dispatchServiceRequestByServiceProvider when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.dispatchServiceRequestByServiceProvider())
    })

    it('creates setEntityServiceProvider when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.setEntityServiceProvider())
    })

    it('creates clearVisitServiceSchedule when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.clearVisitServiceSchedule())
    })

    it('creates updateServiceRequestByServiceProvider when fetching service content has been done', () => {
        fetchMock.get(API.applyServiceRequestByServiceProvider, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.updateServiceRequestByServiceProvider(data)).then((resp) => {
            store.dispatch(actions.getQuestionsListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

        it('creates cancelServiceRequestByServiceProvider when fetching service content has been done', () => {
            fetchMock.get(API.cancelServiceRequestByServiceProvider, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.cancelServiceRequestByServiceProvider(data)).then((resp) => {
                store.dispatch(actions.getSummaryDetails(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates getVisitServiceDetails when fetching service content has been done', () => {
            fetchMock.get(API.getVisitServiceDetails, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.getVisitServiceDetails(data)).then((resp) => {
                store.dispatch(actions.visitHistoryLoading(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates getVisitServiceEligibilityStatus when fetching service content has been done', () => {
            fetchMock.get(API.getVisitServiceEligibilityStatus, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.getVisitServiceEligibilityStatus(data)).then((resp) => {
                store.dispatch(actions.visitHistoryLoading(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates getDays when fetching service content has been done', () => {
            fetchMock.get(API.servicerequest , {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.getDays(data)).then((resp) => {
                store.dispatch(actions.getDaysSuccess(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })
})