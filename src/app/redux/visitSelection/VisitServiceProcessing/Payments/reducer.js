import {
    paymentsCardList
} from './actions'

const defaultState = {
    CardList: '',
};

const PaymentsState = (state = defaultState, action) => {
    switch (action.type) {

        case paymentsCardList.getPaymentsCardListSuccess:
            return {
                ...state,
                CardList: action.data
            };

        default:
            return state;
    }
}

export default PaymentsState;
