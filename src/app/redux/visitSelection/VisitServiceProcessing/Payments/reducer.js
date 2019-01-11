import {
    paymentsCardList
} from './actions'

const defaultState = {
    CardList: '',
    serviceRequestId: null,
    isLoading: false
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
