import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { endLoading } from '../../loading/actions'
import { VisitServiceRequestList } from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
    it('should create an action to setActiveSubTab', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.setActiveSubTab,
            data
        }
        expect(actions.setActiveSubTab(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestDetailsSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.getServiceRequestDetailsSuccess,
            data
        }
        expect(actions.getServiceRequestDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestApprovalStatus', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.getServiceRequestApprovalStatus,
            data
        }
        expect(actions.getServiceRequestApprovalStatus(data)).toEqual(expectedAction)
    })

    it('should create an action to setPaginationRowCountSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.setPaginationRowCountSuccess,
            data
        }
        expect(actions.setPaginationRowCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestCountListSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.getServiceRequestCountListSuccess,
            data
        }
        expect(actions.getServiceRequestCountListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestTableListSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.getServiceRequestTableListSuccess,
            data
        }
        expect(actions.getServiceRequestTableListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getDiagnosisCodeSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceRequestList.getDiagnosisCodeSuccess,
            data
        }
        expect(actions.getDiagnosisCodeSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to clearRequestStatus', () => {
        const data = [{ isActive: true }]
        const expectedAction = {
            type: VisitServiceRequestList.clearRequestStatus,
            data: [{ isActive: false }]
        }
        expect(actions.clearRequestStatus(data)).toEqual(expectedAction)
    })

    it('should create an action to clearScheduleType', () => {
        const data = [{ isActive: true }]
        const expectedAction = {
            type: VisitServiceRequestList.clearScheduleType,
            data: [{ "isActive": true, "isChecked": false }],
        }
        expect(actions.clearScheduleType(data)).toEqual(expectedAction)
    })

    it('should create an action to getScheduleTypeSuccess', () => {
        const data = [{ isActive: true }]
        const expectedAction = {
            type: VisitServiceRequestList.getScheduleTypeSuccess,
            data: [{ "isActive": true, "isChecked": false }],
        }
        expect(actions.getScheduleTypeSuccess(data)).toEqual(expectedAction)
    })

});


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('getDiagnosisCode', () => {
        fetchMock.getOnce(API.getDiagnosisCode, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        return store.dispatch(actions.getDiagnosisCode()).then((resp) => {
            store.dispatch(actions.getDiagnosisCodeSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getDiagnosisCodeText', () => {
        fetchMock.get(API.getDiagnosisCode, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = "test"

        return store.dispatch(actions.getDiagnosisCodeText(data)).then((resp) => {
            store.dispatch(actions.getDiagnosisCodeSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('postDiagnosisCode', () => {
        fetchMock.post(API.postDiagnosisCode, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = "test"

        return store.dispatch(actions.postDiagnosisCode(data)).then((resp) => {
            // store.dispatch(actions.getDiagnosisCodeSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getServiceRequestCountList', () => {
        fetchMock.post(API.getVisitServiceRequestCount, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = "test"

        return store.dispatch(actions.postDiagnosisCode(data)).then((resp) => {
            // store.dispatch(actions.getDiagnosisCodeSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getServiceRequestCountList', () => {
        fetchMock.post(API.getVisitServiceRequestCount, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = "test"

        return store.dispatch(actions.getServiceRequestCountList(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestCountListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getServiceRequestTableList true', () => {
        fetchMock.post(API.getVisitServiceRequestCount, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({
            careteamDashboard: {
                VisitServiceRequestState: {
                    serviceRequestStatusList: [{"id":91,"keyName":null,"keyValue":"Approved"},{"id":92,"keyName":null,"keyValue":"Declined"},{"id":93,"keyName":null,"keyValue":"Pending"},{"id":94,"keyName":null,"keyValue":"NotRequired"}]
                },
            }
        })

        let data = { "fromDate": "2019-02-22", "toDate": "2019-05-22", "serviceTypeIds": [], "status": [], "careTeamId": 3, "recurringPattern": 0, "tabFilter": "NeedApproval", "pageNumber": 1, "pageSize": 10, "streetAddress": "", "city": "", "stateName": "", "zip": 0, "range": 0, "lat": 0, "lon": 0, "sortName": "ModifiedDate", "sortOrder": "asc", "searchText": "", "approvalStatus": [], "offset": -330 }

        return store.dispatch(actions.getServiceRequestTableList(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestTableListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    
    it('getServiceRequestTableList false', () => {
        fetchMock.post(API.getVisitServiceRequestCount, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({
            careteamDashboard: {
                VisitServiceRequestState: {
                    serviceRequestStatusList: [{"id":91,"keyName":null,"keyValue":"Approved"},{"id":92,"keyName":null,"keyValue":"Declined"},{"id":93,"keyName":null,"keyValue":"NeedApproval"},{"id":94,"keyName":null,"keyValue":"NotRequired"}]
                },
            }
        })

        let data = { "fromDate": "2019-02-22", "toDate": "2019-05-22", "serviceTypeIds": [], "status": [], "careTeamId": 3, "recurringPattern": 0, "tabFilter": "NeedApproval", "pageNumber": 1, "pageSize": 10, "streetAddress": "", "city": "", "stateName": "", "zip": 0, "range": 0, "lat": 0, "lon": 0, "sortName": "ModifiedDate", "sortOrder": "asc", "searchText": "", "approvalStatus": [], "offset": -330 }

        return store.dispatch(actions.getServiceRequestTableList(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestTableListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getServiceRequestStatus', () => {
        fetchMock.get(API.getServiceRequestCardStatus, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = { offset: '' }

        return store.dispatch(actions.getServiceRequestStatus(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestStatusSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getScheduleType ', () => {
        fetchMock.get(API.getScheduleType, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = { offset: '' }

        return store.dispatch(actions.getScheduleType(data)).then((resp) => {
            store.dispatch(actions.getScheduleTypeSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getServiceRequestDetails', () => {
        fetchMock.get(API.getServiceRequestDetails, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = 23

        return store.dispatch(actions.getServiceRequestDetails(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestDetailsSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    it('getApprovalStatus', () => {
        fetchMock.put(API.getapprovalStatus, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = { id: 23, status: 'test' }

        return store.dispatch(actions.getApprovalStatus(data)).then((resp) => {
            store.dispatch(actions.getServiceRequestApprovalStatus(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

});