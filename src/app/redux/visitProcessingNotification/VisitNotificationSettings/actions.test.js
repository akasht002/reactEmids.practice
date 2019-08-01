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

});