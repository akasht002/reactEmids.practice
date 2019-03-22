import {
    paymentsCardList
} from './actions'

const defaultState = {
    CardList: '',
    serviceRequestId: null,
    isLoading: false,
    errorMessage: ''
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

        default:
            return state;
    }
}

export default PaymentsState;
