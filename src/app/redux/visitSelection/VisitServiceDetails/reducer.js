import {
    VisitServiceDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceSchedule: [],
    ServiceRequestId: '',
    VisitServiceElibilityStatus: ''
};

const VisitServiceDetailsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceDetails.getVisitServiceDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };

        case VisitServiceDetails.getVisitServiceScheduleSuccess:
            return {
                ...state,
                VisitServiceSchedule: action.data
            };

        case VisitServiceDetails.getServiceRequestId:
            return {
                ...state,
                ServiceRequestId: action.data
            };

        case VisitServiceDetails.getVisitServiceEligibityStatusSuccess:
            return {
                ...state,
                VisitServiceElibilityStatus: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceDetailsState;
