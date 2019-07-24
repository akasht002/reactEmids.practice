import * as actions from './actions';

import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('OnboardSuccess action', () => {
    it('should create an action to continueToProfile', () => {
        expect(actions.continueToProfile()).toBeDefined()
    })
});