import { paymentsCardList } from './bridge';

const defaultState = {
    CardList: '',
    serviceRequestId: null,
    isLoading: false,
    errorMessage: '',
    isPaymentPathValid: false
};

const PaymentsState = (state = defaultState, action) => {
    switch (action.type) {

        case paymentsCardList.getPaymentsCardListSuccess:
            return {
                ...state,
                CardList: action.data,
                serviceRequestId: 1
            };

        case paymentsCardList.updateServiceRequestId:
            return {
                ...state,
                serviceRequestId: action.data
            };

        case paymentsCardList.paymentSuccessOrFailure:
            return {
                ...state,
                errorMessage: action.data
            };

        case paymentsCardList.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case paymentsCardList.endLoading:
            return {
                ...state,
                isLoading: false
            };
        case paymentsCardList.isPaymentPathValid:
            return {
                ...state,
                isPaymentPathValid: action.data
            };

        default:
            return state;
    }
}

export default PaymentsState;
