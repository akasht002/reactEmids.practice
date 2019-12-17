import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { VerifyUserID } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('VerifyUserID actions', () => {
    it('should create an action to cancelClick', () => {
        const expectedAction = {
            type: VerifyUserID.cancelClick
        }
        expect(actions.cancelClick()).toEqual(expectedAction)
    })

    it('should create an action to clearState', () => {
        const expectedAction = {
            type: VerifyUserID.clearState
        }
        expect(actions.clearState()).toEqual(expectedAction)
    })

    it('should create an action to formDirty', () => {
        const expectedAction = {
            type: VerifyUserID.formDirty
        }
        expect(actions.formDirty()).toEqual(expectedAction)
    })

    it('should create an action to onSetUserIdCompletion', () => {
        let data ={}
        const expectedAction = {
            type: VerifyUserID.onSetUserDetailsCompletion,
            data
        }
        expect(actions.onSetUserIdCompletion(data)).toEqual(expectedAction)
    })

    it('should create an action to isAlreadyOnboarded', () => {
        let isExist = {}
        const expectedAction = {
            type: VerifyUserID.setIsAlreadyOnboarded,
            isExist
        }
        expect(actions.isAlreadyOnboarded(isExist)).toEqual(expectedAction)
    })


    it('should create an action to userEmailExist', () => {
        let isExistMsge = {}
        const expectedAction = {
            type: VerifyUserID.userEmailExist,
            isExistMsge
        }
        expect(actions.userEmailExist(isExistMsge)).toEqual(expectedAction)
    })

    it('should create an action to userEmailNotExist', () => {
        let isExist = {}
        const expectedAction = {
            type: VerifyUserID.userEmailNotExist,
            isExist
        }
        expect(actions.userEmailNotExist(isExist)).toEqual(expectedAction)
    })
    
});



describe('VerifyUserID async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an action to onUserEmailNext', () => {
        const store = mockStore({
            data: '',
            onboardingState: {
                verifyUserIDState: {
                    serviceProviderDetails: {
                    }
                }
            }
        })
        expect(store.dispatch(actions.onUserEmailNext({})))
    })

    it('should create an action to onCancelClick', () => {
        const store = mockStore({
            data: '',
            onboardingState: {
                verifyUserIDState: {
                    serviceProviderDetails: {
                    }
                }
            }
        })
        expect(store.dispatch(actions.onCancelClick({})))
    })

    it('creates sendVerificationLink ', () => {
        fetchMock.get(API.sendEmailVerification, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ data: '', setPasswordState: '' })
        let data = { emailId: "test@mailinator.com" }

        return store.dispatch(actions.sendVerificationLink(data)).then((response) => {
            store.dispatch(actions.onSetUserIdCompletion())
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });
});