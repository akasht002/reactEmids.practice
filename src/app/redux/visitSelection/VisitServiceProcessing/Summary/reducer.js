import {
    SummaryDetails
} from './actions'

const defaultState = {
    SummaryDetails: {},
    CalculationsData : {},
    actualTimeDiff: ''
};

const SummaryState = (state = defaultState, action) => {
    switch (action.type) {

        case SummaryDetails.getSummaryDetailsSuccess:
            return {
                ...state,
                SummaryDetails: action.data
            };

        case SummaryDetails.getCalculationsData:
            return {
                ...state,
                CalculationsData: action.data
            };
        case SummaryDetails.saveOriginalTimeDiff:
            return {
                ...state,
                originalTimeDiff: action.data.timediffms,
                actualTimeDiff: action.data.timediffms,
                hourlyRate: action.data.hourlyRate,
                taxPaid: action.data.taxPaid
            };
        case SummaryDetails.saveActualTimeDiff:
            return {
                ...state,
                actualTimeDiff: action.data
            }
        default:
            return state;
    }
}

export default SummaryState;