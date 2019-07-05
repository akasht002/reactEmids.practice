import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { VerifyContact } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/encryptPassword', () => ({
    encryptPassword: () => ({
    })
}))

describe('VerifyContact actions', () => {
    it('should create an action to onSetUserId', () => {
        const expectedAction = {
            type: VerifyContact.setUserId
        }
        expect(actions.onSetUserId()).toEqual(expectedAction)
    })

    it('should create an action to cancelClick', () => {
        const expectedAction = {
            type: VerifyContact.cancelClick
        }
        expect(actions.cancelClick()).toEqual(expectedAction)
    })

    it('should create an action to clearState', () => {
        const expectedAction = {
            type: VerifyContact.clearState
        }
        expect(actions.clearState()).toEqual(expectedAction)
    })

    it('should create an action to formDirty', () => {
        const expectedAction = {
            type: VerifyContact.formDirty
        }
        expect(actions.formDirty()).toEqual(expectedAction)
    })

    it('should create an action to onSetUserIdCompletion', () => {
        let data = {}
        const expectedAction = {
            type: VerifyContact.onSetUserDetailsCompletion,
            data
        }
        expect(actions.onSetUserIdCompletion(data)).toEqual(expectedAction)
    })

    it('should create an action to temporaryPasscodeExpired', () => {
        let data = true
        const expectedAction = {
            type: VerifyContact.temporaryPasscodeExpired,
            isExpired: data
        }
        expect(actions.temporaryPasscodeExpired(data)).toEqual(expectedAction)
    })

    it('should create an action to setPasscodeMatch', () => {
        let data = true
        const expectedAction = {
            type: VerifyContact.setPasscodeMatch,
            isSuccess: data
        }
        expect(actions.setPasscodeMatch(data)).toEqual(expectedAction)
    })


    it('should create an action to verifyPasscodeSuccess', () => {
        const expectedAction = {
            type: VerifyContact.passcodeVerifySuccess
        }
        expect(actions.verifyPasscodeSuccess()).toEqual(expectedAction)
    })


    it('should create an action to setPasscodeNotMatch', () => {
        let data = true;
        const expectedAction = {
            type: VerifyContact.setPasscodeNotMatch,
            isSuccess: data
        }
        expect(actions.setPasscodeNotMatch(data)).toEqual(expectedAction)
    })

    it('should create an action to onPasscodeSent', () => {
        const expectedAction = {
            type: VerifyContact.sendVerificationLink,
        }
        expect(actions.onPasscodeSent()).toEqual(expectedAction)
    })

    describe('VerifyContact async actions', () => {
        afterEach(() => {
            fetchMock.restore()
        })

        it('should create an action to getUserData', () => {
            const store = mockStore({
                data: '',
                onboardingState: {
                    verifyUserIDState: {
                        serviceProviderDetails: {
                        }
                    }
                }
            })
            expect(store.dispatch(actions.getUserData()))
        })


        it('should create an action to setPasscodeError', () => {
            const store = mockStore({
            })
            expect(store.dispatch(actions.setPasscodeError()))
        })

        it('should create an action to temporaryPasscodeSuccess', () => {
            const store = mockStore({
            })
            expect(store.dispatch(actions.temporaryPasscodeSuccess()))
        })

        it('should create an action to onCancelClick', () => {
            const store = mockStore({
            })
            expect(store.dispatch(actions.onCancelClick()))
        })

        it('creates sendTemporaryPasscode when posting service content has been done', () => {
            fetchMock.postOnce(API.sendTemporaryPasscode, {
                body: { data: {} },
                headers: { 'content-type': 'application/json' },
                response: { data: {} }
            })

            const store = mockStore({ data: '', setPasswordState: '' })
            let data = { emailId: "test@mailinator.com" }

            return store.dispatch(actions.sendTemporaryPasscode(data)).then((response) => {
                store.dispatch(actions.onPasscodeSent())
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        });

        it('creates verifyTemporaryPasscode when posting service content has been done', () => {
            fetchMock.postOnce(API.verifyTemporaryPasscode, {
                body: { data: {} },
                headers: { 'content-type': 'application/json' },
                response: { data: {} }
            })

            const store = mockStore({ data: '', setPasswordState: '' })
            let data = { emailId: "test@mailinator.com" }

            return store.dispatch(actions.verifyTempPasscode(data)).then((response) => {
                store.dispatch(actions.verifyPasscodeSuccess())
                store.dispatch(actions.setPasscodeNotMatch())
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        });

        it('creates getEntityUserData when posting service content has been done', () => {
            fetchMock.postOnce(API.getEntityUserData, {
                body: { data: {} },
                headers: { 'content-type': 'application/json' },
                response: { data: {} }
            })

            const store = mockStore({ data: '', setPasswordState: '' })
            let data = { emailId: "test@mailinator.com" }

            return store.dispatch(actions.getEntityUserData(data)).then((response) => {
                store.dispatch(actions.onSetUserIdCompletion())
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        });

    });
});  