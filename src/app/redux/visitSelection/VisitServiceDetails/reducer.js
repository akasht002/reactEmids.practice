import {
    VisitServiceDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceSchedule: [],
    ServiceRequestId: '',
    VisitServiceElibilityStatus: '',
    daysType: [],
    updateServiceRequestMsgStatus: 0,
    entityServiceProviderId: 0,
    canInitiateConversation: false
};

const VisitServiceDetailsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceDetails.getVisitServiceDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };

        case VisitServiceDetails.setEntityServiceProviderSuccess:
            return {
                ...state,
                entityServiceProviderId: action.data
            };

        case VisitServiceDetails.updateServiceRequestByServiceProviderSuccess:
            return {
                ...state,
                updateServiceRequestMsg: action.data
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

        case VisitServiceDetails.getDaysSuccess:
            return {
                ...state,
                daysType: action.data
            };

        case VisitServiceDetails.canInitiateConversationSuccess:
            return {
                ...state,
                canInitiateConversation: action.data
            };

        default:
            return state;
    }
}

export default VisitServiceDetailsState;
