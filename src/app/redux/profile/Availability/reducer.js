import { AvailabilityActions } from './actions'

const defaultState = {
    availableDays: {},
    blackoutDays: [],
    allAvailableSlots: []
};

const AvailabilityState = (state = defaultState, action) => {
    switch (action.type) {
        case AvailabilityActions.setAvailabilityDays:
            return {
                ...state,
                availableDays: action.data
            }
        case AvailabilityActions.setBlackoutDays:
            return {
                ...state,
                blackoutDays: action.data
            }
        case AvailabilityActions.setAllAvailabilitySlots:
            return {
                ...state,
                allAvailableSlots: action.data
            }
        default:
            return state;
    }
};

export default AvailabilityState;
