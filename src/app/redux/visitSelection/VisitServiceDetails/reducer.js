import {
    VisitServiceDetails
} from './actions'

const defaultState = {
    VisitServiceDetails: [],
    VisitServiceSchedule: []
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

        default:
            return state;
    }
}

export default VisitServiceDetailsState;
