import {
    SummaryDetails
} from './actions'
import { getServiceTasks } from '../PerformTasks/actions'

const defaultState = {
    SummaryDetails: {},
    CalculationsData: {},
    actualTimeDiff: '',
    signature: '',
    VisitServiceElibilityStatus: '',
    isLoading: false,
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
        case SummaryDetails.getSavedSignatureSuccess:
            return {
                ...state,
                signature: action.data
            }
        case SummaryDetails.formDirtySummaryDetails:
            return {
                ...state,
                SummaryDetails: {},
                CalculationsData: {},
                signature: ''
            }
            case SummaryDetails.getVisitServiceEligibityStatusSuccess:
            return {
                ...state,
                VisitServiceElibilityStatus: action.data
            };
            case SummaryDetails.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case SummaryDetails.endLoading:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default SummaryState;