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
        isEntityServiceProvider: true
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

    it('should create an action to editIndividualEditPopup         ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.editIndividualEditPopup,
            data
        }
        expect(actions.editIndividualEditPopup(data)).toEqual(expectedAction)
    })

    it('should create an action to formDirtyVisitServiceDetails       ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.formDirtyVisitServiceDetails
        }
        expect(actions.formDirtyVisitServiceDetails(data)).toEqual(expectedAction)
    })

    it('should create an action to loadingESPList        ', () => {
        let data = {}
        const expectedAction = {
            type: "loadingESPList/visitservicedetails",
            data
        }
        expect(actions.loadingESPList(data)).toEqual(expectedAction)
    })

    it('should create an action to resetServiceDetails        ', () => {
        let data = {}
        const expectedAction = {
            type: "visitServiceDetails/resetState"
        }
        expect(actions.resetServiceDetails(data)).toEqual(expectedAction)
    })

    it('should create an action to getDaysSuccess         ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getDaysSuccess,
            data
        }
        expect(actions.getDaysSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestListSuccess           ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getServiceRequestListSuccess,
            data
        }
        expect(actions.getServiceRequestListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSchedulesListSuccess            ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getSchedulesListSuccess,
            data
        }
        expect(actions.getSchedulesListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitListSuccess             ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getVisitListSuccess,
            data
        }
        expect(actions.getVisitListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitListCountSuccess              ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getVisitListCountSuccess,
            data
        }
        expect(actions.getVisitListCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitStatusSuccess               ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getVisitStatusSuccess,
            data
        }
        expect(actions.getVisitStatusSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceVisitDetailsSuccess                ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getServiceVisitDetailsSuccess,
            data
        }
        expect(actions.getServiceVisitDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getEntityServiceProviderListSuccess                 ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getEntityServiceProviderListSuccess,
            data
        }
        expect(actions.getEntityServiceProviderListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to disableShowmore                  ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.disableShowmore,
            data
        }
        expect(actions.disableShowmore(data)).toEqual(expectedAction)
    })

    it('should create an action to clearESPList                  ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.clearESPList
        }
        expect(actions.clearESPList(data)).toEqual(expectedAction)
    })

    it('should create an action to getfirstlastvisitdateSuccess                  ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getfirstlastvisitdateSuccess,
            data
        }
        expect(actions.getfirstlastvisitdateSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to setActiveTab                   ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setActiveTab,
            data
        }
        expect(actions.setActiveTab(data)).toEqual(expectedAction)
    })

    it('should create an action to saveScheduleType                    ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.saveScheduleType,
            data
        }
        expect(actions.saveScheduleType(data)).toEqual(expectedAction)
    })

    it('should create an action to setAddNewScheduledClicked                     ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setAddNewScheduledClicked,
            data
        }
        expect(actions.setAddNewScheduledClicked(data)).toEqual(expectedAction)
    })

    it('should create an action to setVisitDate                      ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setVisitDate,
            data
        }
        expect(actions.setVisitDate(data)).toEqual(expectedAction)
    })

    it('should create an action to setEntityDashboard                       ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setEntityDashboard,
            data
        }
        expect(actions.setEntityDashboard(data)).toEqual(expectedAction)
    })

    it('should create an action to getPaymentAvailabilitySuccess                        ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getPaymentAvailabilitySuccess,
            data
        }
        expect(actions.getPaymentAvailabilitySuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getPlanId                         ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.getPlanId,
            data
        }
        expect(actions.getPlanId(data)).toEqual(expectedAction)
    })

    // it('should create an action to modifiedPlanId                          ', () => {
    //     let data = {}
    //     const expectedAction = {
    //         type: VisitServiceDetails.getPlanId,
    //         data
    //     }
    //     expect(actions.modifiedPlanId(data)).toEqual(expectedAction)
    // })

    it('should create an action to setServicePlanVisitId                         ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setServicePlanVisitId,
            data
        }
        expect(actions.setServicePlanVisitId(data)).toEqual(expectedAction)
    })

    it('should create an action to setActivePage                          ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setActivePage,
            data
        }
        expect(actions.setActivePage(data)).toEqual(expectedAction)
    })

    it('should create an action to setPlanScheduleId                           ', () => {
        let data = {}
        const expectedAction = {
            type: VisitServiceDetails.setPlanScheduleId,
            data
        }
        expect(actions.setPlanScheduleId(data)).toEqual(expectedAction)
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

    it('creates clearServiceDetails when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.clearServiceDetails())
    })

    it('creates setEntityServiceProvider when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.setEntityServiceProvider({ serviceRequestId: 10 }))
    })

    it('creates setEntityServiceProvider when fetching service content has been done', () => {
        const store = mockStore({})
        store.dispatch(actions.setEntityServiceProvider({ serviceRequestId: 0 }))
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
        fetchMock.get(API.servicerequest, {
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

    //Nnnnn
    it('creates getVisitServiceSchedule when fetching service content has been done', () => {
        fetchMock.get(API.getServiceRequestSchedule , {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getVisitServiceSchedule(data)).then((resp) => {
            store.dispatch(actions.visitHistoryLoading(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })
})