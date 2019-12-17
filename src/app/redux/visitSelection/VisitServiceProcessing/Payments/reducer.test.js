import reducer from './reducer'
import { paymentsCardList } from './bridge'


describe('paymentsCardList reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                CardList: '',
                serviceRequestId: null,
                isLoading: false,
                errorMessage: '',
                isPaymentPathValid: false
            }
        );
    });

    it("should return the getPaymentsCardListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.getPaymentsCardListSuccess,
            data: data
        })).toEqual(
            {
                CardList: data,
                serviceRequestId: 1
            }
        )
    });

    it("should return the updateServiceRequestId state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.updateServiceRequestId,
            data: data
        })).toEqual(
            {
                serviceRequestId: data
            }
        )
    });

    it("should return the paymentSuccessOrFailure state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.paymentSuccessOrFailure,
            data: data
        })).toEqual(
            {
                errorMessage: data
            }
        )
    });

    it("should return the startLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.startLoading,
            data: data
        })).toEqual(
            {
                isLoading: true
            }
        )
    });

    it("should return the endLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: false
            }
        )
    });

    it("should return the isPaymentPathValid state", () => {
        let data = {}
        expect(reducer(data, {
            type: paymentsCardList.isPaymentPathValid,
            data: data
        })).toEqual(
            {
                isPaymentPathValid: data
            }
        )
    });
});