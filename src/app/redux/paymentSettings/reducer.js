import {
    paymentsSettings
} from './actions'

const defaultState = {
    CardList: '',
};

const paymentsSettingsState = (state = defaultState, action) => {
    switch (action.type) {

        case paymentsSettings.getPaymentsCardListSuccess:
            return {
                ...state,
                CardList: action.data
            };

        default:
            return state;
    }
}

export default paymentsSettingsState;
