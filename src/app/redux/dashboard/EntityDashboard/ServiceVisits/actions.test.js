import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../../services/api';
import { endLoading } from '../../../loading/actions'
import { VisitServiceList } from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
    it('should create an action to setActiveSubTab', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.setActiveSubTab,
            data
        }
        expect(actions.setActiveSubTab(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestDetailsSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.getServiceRequestDetailsSuccess,
            data
        }
        expect(actions.getServiceRequestDetailsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getServiceRequestApprovalStatus', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.getServiceRequestApprovalStatus,
            data
        }
        expect(actions.getServiceRequestApprovalStatus(data)).toEqual(expectedAction)
    })

    it('should create an action to setPaginationRowCountSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.setPaginationRowCountSuccess,
            data
        }
        expect(actions.setPaginationRowCountSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitsCountListSuccess', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.getVisitsCountListSuccess,
            data
        }
        expect(actions.getVisitsCountListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitServiceTableList', () => {
        const data = {}
        const expectedAction = {
            type: VisitServiceList.getVisitsTableListSuccess,
            data
        }
        expect(actions.getVisitsTableListSuccess(data)).toEqual(expectedAction)
    })

});


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('getVisitServiceCountList', () => {
        fetchMock.post(API.getVisitServiceCount, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({})

        let data = "test"

        return store.dispatch(actions.getVisitServiceCountList(data)).then((resp) => {
            store.dispatch(actions.getVisitsCountListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

    
    it('getVisitServiceTableList false', () => {
        fetchMock.post(API.getVisitServiceTable, {
            body: {},
            headers: { 'content-type': 'application/json' }
        })

        const store = mockStore({
            entityDashboard: {
                VisitServiceRequestState: {
                    serviceRequestStatusList: [{"id":91,"keyName":null,"keyValue":"Approved"},{"id":92,"keyName":null,"keyValue":"Declined"},{"id":93,"keyName":null,"keyValue":"NeedApproval"},{"id":94,"keyName":null,"keyValue":"NotRequired"}]
                },
            }
        })

        let data = { "fromDate": "2019-02-22", "toDate": "2019-05-22", "serviceTypeIds": [], "status": [], "careTeamId": 3, "recurringPattern": 0, "tabFilter": "NeedApproval", "pageNumber": 1, "pageSize": 10, "streetAddress": "", "city": "", "stateName": "", "zip": 0, "range": 0, "lat": 0, "lon": 0, "sortName": "ModifiedDate", "sortOrder": "asc", "searchText": "", "approvalStatus": [], "offset": -330 }

        return store.dispatch(actions.getVisitServiceTableList(data)).then((resp) => {
            store.dispatch(actions.getVisitsTableListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
            store.dispatch(endLoading())
        })
    })

});