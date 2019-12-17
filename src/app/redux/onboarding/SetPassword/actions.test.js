import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../../services/api';
import { SetPassword } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../utils/encryptPassword', () => ({
    encryptPassword: () => ({
    })
}))

describe('SetPassword actions', () => {
    it('should create an action to cancelClick', () => {
        const expectedAction = {
            type: SetPassword.cancelClick
        }
        expect(actions.cancelClick()).toEqual(expectedAction)
    })

    it('should create an action to clearState', () => {
        const expectedAction = {
            type: SetPassword.clearState
        }
        expect(actions.clearState()).toEqual(expectedAction)
    })

    it('should create an action to clearOnboardingState', () => {
        const expectedAction = {
            type: SetPassword.clearOnboardingState
        }
        expect(actions.clearOnboardingState()).toEqual(expectedAction)
    })

    it('should create an action to onSetUserIdCompletion', () => {
        let data = {}
        const expectedAction = {
            type: SetPassword.onSetUserDetailsCompletion,
            data
        }
        expect(actions.onSetUserIdCompletion(data)).toEqual(expectedAction)
    })

    it('should create an action to passwordSetSuccess', () => {
        const expectedAction = {
            type: SetPassword.serviceProviderOnboardSucess
        }
        expect(actions.passwordSetSuccess()).toEqual(expectedAction)
    })

    describe('SetPassword async actions', () => {
        afterEach(() => {
            fetchMock.restore()
        })

        it('should create an action to getUserData', () => {
            const store = mockStore({
                data: '',
                onboardingState: {
                    verifyContactState: {
                        serviceProviderDetails: {
                        }
                    }
                }
            })
         expect(store.dispatch(actions.getUserData()))
        })

        
        it('should create an action to setPassword for if part', () => {
            const store = mockStore({
                data: '',
                onboardingState: {
                    setPasswordState: {
                        serviceProviderDetails: {
                            userType: 'EU'
                        }
                    }
                }
            })
         expect(store.dispatch(actions.setPassword({})))
        })

        it('should create an action to setPassword for else part', () => {
            const store = mockStore({
                data: '',
                onboardingState: {
                    setPasswordState: {
                        serviceProviderDetails: {
                            userType: 'PG'
                        }
                    }
                }
            })
         expect(store.dispatch(actions.setPassword({})))
        })

        it('should create an action to onCancelClick', () => {
            const store = mockStore({
                data: ''
            })
         expect(store.dispatch(actions.onCancelClick()))
        })

        it('creates setPassword when posting service content has been done', () => {
            fetchMock.postOnce(API.setPassword, {
                body: { data: {} },
                headers: { 'content-type': 'application/json' },
                response: { data: {} }
            })

            const store = mockStore({ data: '', setPasswordState: '' })
            let data = { emailId: "test@mailinator.com" }

            return store.dispatch(actions.setPasswordIndividual(data)).then((response) => {
                store.dispatch(actions.onboardSucess())
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
                store.dispatch(actions.endLoading())
            })

        });

        it('creates setPasswordEntity when posting service content has been done', () => {
            fetchMock.postOnce(API.setPasswordEntityUser, {
                body: { data: {} },
                headers: { 'content-type': 'application/json' },
                response: { data: {} }
            })

            const store = mockStore({
                data: '',
                onboardingState: {
                    setPasswordState: {
                        serviceProviderDetails: {
                            token: '42332332asdasd'
                        }
                    }
                }
            })
            let data = { emailId: "test@mailinator.com" }

            return store.dispatch(actions.setPasswordEntity(data)).then((response) => {
                store.dispatch(actions.onboardSucess())
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
                store.dispatch(actions.endLoading())
            })

        });
    });
});  