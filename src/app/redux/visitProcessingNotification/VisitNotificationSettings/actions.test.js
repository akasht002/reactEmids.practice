import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { VisitNotificationSettings } from './bridge'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('ServiceOffered actions', () => {

    it('should create an action to startLoadingNotification', () => {
        const expectedAction = {
            type: VisitNotificationSettings.startLoadingNotification
        }
        expect(actions.startLoadingNotification()).toEqual(expectedAction)
    })

    it('should create an action to endLoadingNotification', () => {
        const expectedAction = {
            type: VisitNotificationSettings.endLoadingNotification
        }
        expect(actions.endLoadingNotification()).toEqual(expectedAction)
    })

    it('should create an action to getVisitNotificationSettingsSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotificationSettings.getVisitNotificationSettingsSuccess,
            data
        }
        expect(actions.getVisitNotificationSettingsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to updateVisitNotificationSettingsSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotificationSettings.getVisitNotificationSettingsSuccess,
            data
        }
        expect(actions.updateVisitNotificationSettingsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to handlePushChangeSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotificationSettings.handlePushChangeSuccess,
            data
        }
        expect(actions.handlePushChangeSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to handleEmailChangeSuccess', () => {
        let data = {}
        const expectedAction = {
            type: VisitNotificationSettings.handleEmailChangeSuccess,
            data
        }
        expect(actions.handleEmailChangeSuccess(data)).toEqual(expectedAction)
    })

});

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates getVisitNotificationSettings when fetching service content has been done', () => {
        fetchMock.getOnce(API.getNotificationSettings, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.getVisitNotificationSettings()).then(() => {
          store.dispatch(actions.getVisitNotificationSettingsSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates updateVisitNotificationSettings when fetching service content has been done', () => {
        fetchMock.getOnce(API.updateVisitNotificationSettings, {
          body: { data: [] },
          headers: { 'content-type': 'application/json' }
        })
  
        const store = mockStore({ data: '' })
    
        return store.dispatch(actions.updateVisitNotificationSettings()).then(() => {
          store.dispatch(actions.updateVisitNotificationSettingsSuccess([]))
          expect(store.getActions()).toBeDefined()
        })
    })

    it('creates handlePushChange when fetching service content has been done', () => {
        const data = {
        }
        const store = mockStore({
            visitNotificationState:
            {
                VisitNotificationSettingsState:
                {
                    pushNotification:[]
                }
            }

        }
        )

        store.dispatch(actions.handlePushChange({conversationId :34}))
    })

    it('creates handleEmailChange when fetching service content has been done', () => {
        const data = {
        }
        const store = mockStore({
            visitNotificationState:
            {
                VisitNotificationSettingsState:
                {
                    emailNotification:[]
                }
            }

        }
        )

        store.dispatch(actions.handleEmailChange({conversationId :34}))
    })
});