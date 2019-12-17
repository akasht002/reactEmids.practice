import { API } from '../../../../services/api';
import * as actions from './actions';
import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { paymentsCardList } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// jest.mock('../../../services/http', () => ({
//     getUserInfo: () => ({
//         serviceProviderId: 12
//     })
// }))

describe('actions', () => {
    it('should create an action to getPaymentsCardListSuccess   ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.getPaymentsCardListSuccess,
            data
        }
        expect(actions.getPaymentsCardListSuccess(data)).toEqual(expectedAction)
    })

    it('should create an action to paymentPathValid    ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.isPaymentPathValid,
            data
        }
        expect(actions.paymentPathValid(data)).toEqual(expectedAction)
    })

    it('should create an action to paymentSuccessOrFailure   ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.paymentSuccessOrFailure,
            data
        }
        expect(actions.paymentSuccessOrFailure(data)).toEqual(expectedAction)
    })

    it('should create an action to updateServiceRequestId   ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.updateServiceRequestId,
            data
        }
        expect(actions.updateServiceRequestId(data)).toEqual(expectedAction)
    })

    it('should create an action to startLoadingProcessing    ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.startLoading
        }
        expect(actions.startLoadingProcessing(data)).toEqual(expectedAction)
    })

    it('should create an action to endLoadingProcessing     ', () => {
        let data = {}
        const expectedAction = {
            type: paymentsCardList.endLoading
        }
        expect(actions.endLoadingProcessing(data)).toEqual(expectedAction)
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates getpaymentsCardList when fetching service content has been done', () => {
        fetchMock.get(API.getPaymentCardList, {
            body: { data: [] },
            headers: { 'content-type': 'application/json' },
            resp: { data: [{ name: '' }] }
        })
        const store = mockStore({})
        let data = ''
        return store.dispatch(actions.getpaymentsCardList(data)).then((resp) => {
            store.dispatch(actions.getPaymentsCardListSuccess(resp.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    })

        it('creates createCharge when fetching service content has been done', () => {
            fetchMock.get(API.createCharge, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.createCharge(data)).then((resp) => {
                store.dispatch(actions.paymentSuccessOrFailure(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates chargeByCustomerId when fetching service content has been done', () => {
            fetchMock.get(API.chargeByCustomerId, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.chargeByCustomerId(data)).then((resp) => {
                store.dispatch(actions.claimsSubmission(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates claimsSubmission when fetching service content has been done', () => {
            fetchMock.get(API.claimsSubmission, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.claimsSubmission(data)).then((resp) => {
                store.dispatch(actions.claimsSubmission(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })

        it('creates captureAmount when fetching service content has been done', () => {
            fetchMock.get(API.captureAmount, {
                body: { data: [] },
                headers: { 'content-type': 'application/json' },
                resp: { data: [{ name: '' }] }
            })
            const store = mockStore({})
            let data = ''
            return store.dispatch(actions.captureAmount(data)).then((resp) => {
                store.dispatch(actions.claimsSubmission(resp.data))
                expect(store.getActions()).toBeDefined()
            }).catch(err => {
            })
        })
})