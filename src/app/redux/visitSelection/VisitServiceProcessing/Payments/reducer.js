import {
    paymentsCardList
} from './actions'

const defaultState = {
    CardList: '',
    serviceRequestId: null
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

        default:
            return state;
    }
}

export default PaymentsState;
