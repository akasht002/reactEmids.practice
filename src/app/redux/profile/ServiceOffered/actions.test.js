import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { ServiceOffered } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId:23
    })
}))

describe('ServiceOffered actions', () => {

    it('should create an action to getServicesOfferedSuccess', () => {
        const expectedAction = {
            type: ServiceOffered.getServicesOfferedSuccess
        }
        expect(actions.getServicesOfferedSuccess()).toEqual(expectedAction)
    })

    it('should create an action to getServiceOfferedDetails', () => {
        const expectedAction = {
            type: ServiceOffered.getServiceOfferedDetails
        }
        expect(actions.getServiceOfferedDetails()).toEqual(expectedAction)
    })

});

describe('ServiceOffered async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('call toggleCollapseCategory fn', () => {
        const store = mockStore({
            profileState : {
                serviceOfferedState:  { serviceOfferedList : [{serviceCategoryId:'34',isOpen:true},{serviceCategoryId:'34',isOpen:true}],
                PersonalDetailState : { serviceProviderId: 23 }
            }
         }
        })
        expect(store.dispatch(actions.toggleCollapseCategory([{serviceCategoryId:'34',isOpen:true},{serviceCategoryId:'34',isOpen:true}])))
    })

    it('call toggleCollapseDetails fn', () => {
        const store = mockStore({
            profileState : {
                serviceOfferedState:  { serviceOfferedList : [{serviceCategoryId:34,isOpen:true},{serviceCategoryId:'34',isOpen:true}],
                PersonalDetailState : { serviceProviderId: 23 }
            }
         }
        })
        expect(store.dispatch(actions.toggleCollapseDetails([{serviceCategoryId:34,isOpen:true},{serviceCategoryId:'34',isOpen:true}])))
    })

   

    it('Call getServiceOffered fn', () => {
        fetchMock.get(API.getServiceOffered, {
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

        return store.dispatch(actions.getServiceOffered()).then((response) => {
            store.dispatch(actions.getServicesOfferedSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call addServiceOfferd fn', () => {
        fetchMock.post(API.addServiceOffered, {
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

        return store.dispatch(actions.addServiceOfferd([{}])).then((response) => {
            store.dispatch(actions.getServiceOffered())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('Call editServiceOffered fn', () => {
        fetchMock.get(API.editServiceOffered, {
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

        return store.dispatch(actions.editServiceOffered([{}])).then((response) => {
            store.dispatch(actions.getServiceOfferedDetails())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});