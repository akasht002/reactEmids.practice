import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { ProgressIndicator } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId:34
    })
}))

describe('ProgressIndicator actions', () => {
    it('should create an action to getProfilePercentageSuccess', () => {
        let data = {}
        const expectedAction = {
            type: ProgressIndicator.getProfilePercentageSuccess,
            data
        }
        expect(actions.getProfilePercentageSuccess(data)).toEqual(expectedAction)
    })
});

describe('ProgressIndicator async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('call getProfilePercentage fn', () => {
        fetchMock.get(API.getProfilePercentage, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ 
            patientProfileState: { serviceProviderId:34 },
            profileState: { PersonalDetailState : { serviceProviderId:34 } }
        })

        return store.dispatch(actions.getProfilePercentage()).then((response) => {
            store.dispatch(actions.getProfilePercentageSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});