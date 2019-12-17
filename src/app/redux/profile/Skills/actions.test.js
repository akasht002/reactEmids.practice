import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { Skills } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId:23
    })
}))

describe('Skills actions', () => {
    it('should create an action to getSkillsSuccess', () => {
        let data = {}
        const expectedAction = {
            type: Skills.getSkillsSuccess,
            data
        }
        expect(actions.getSkillsSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to getSelectedSkillsDetails', () => {
        let data = {}
        const expectedAction = {
            type: Skills.getSelectedSkillsDetails,
            data
        }
        expect(actions.getSelectedSkillsDetails(data)).toEqual(expectedAction)
    })
});


describe('VerifyContact async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('call getSkills fn', () => {
        fetchMock.get(API.getSkills, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.getSkills()).then((response) => {
            store.dispatch(actions.getSkillsSuccess())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call addSkills fn', () => {
        fetchMock.post(API.getSkills, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })

        return store.dispatch(actions.addSkills('skill1,skill2')).then((response) => {
            store.dispatch(actions.getSelectedSkills())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getSelectedSkills fn', () => {
        fetchMock.get(API.getSkills, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ 
            profileState : {
                PersonalDetailState : { serviceProviderId :34 }
            }
         })

        return store.dispatch(actions.getSelectedSkills()).then((response) => {
            store.dispatch(actions.getSelectedSkills())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});