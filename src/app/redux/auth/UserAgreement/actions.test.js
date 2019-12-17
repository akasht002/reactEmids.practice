import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect'
import * as actions from './actions';
import { UserAgreement } from './bridge'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({})

describe("Test user agreement actions", () => {
    it('should create an action to get user information', () => {
        const data = {};
        const expectedAction = {
            type: UserAgreement.getUserInfoSuccess,
            data
        }    
        expect(actions.getUserInfoSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to get eula content', () => {
        const data = {};
        const expectedAction = {
            type: UserAgreement.getEulaContentSuccess,
            data
        }    
        expect(actions.getEulaContentSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to update eula', () => {
        const data = {};
        const expectedAction = {
            type: UserAgreement.updateEulaSuccess,
            data
        }    
        expect(actions.updateEulaSuccess(data)).toEqual(expectedAction)
    })
});