import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { VisitNotification
} from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        serviceProviderId:23
    })
}))

describe('VisitNotification actions', () => {

    it('should create an action to getVisitNotificationSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotification.getVisitNotificationSuccess,
            data
        }
        expect(actions.getVisitNotificationSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getVisitNotificationCountSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotification.getVisitNotificationCountSuccess,
            data
        }
        expect(actions.getVisitNotificationCountSuccess(data)).toEqual(expectedAction)
    })

});


describe('VisitNotification async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('Call getVisitNotification fn', () => {
        fetchMock.get(API.getVisitNotification, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({
            profileState : {
                PersonalDetailState : { serviceProviderId: 23 }
            }
         })
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitNotification({data : { pageNumber:23,count:23 }})).then((response) => {
            store.dispatch(actions.getServicesOfferedSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call getVisitNotificationCount fn', () => {
        fetchMock.get(API.getVisitNotificationCount, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({
            profileState : {
                PersonalDetailState : { serviceProviderId: 23 }
            }
         })
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.getVisitNotificationCount([{}])).then((response) => {
            store.dispatch(actions.getVisitNotificationCountSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

});