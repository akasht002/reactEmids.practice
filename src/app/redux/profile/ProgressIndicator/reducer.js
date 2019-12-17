import {
    ProgressIndicator
} from './bridge'

const defaultState = {
    profilePercentage: ''
};

const progressIndicatorState = (state = defaultState, action) => {
    switch (action.type) {
        case ProgressIndicator.getProfilePercentageSuccess:
            return {
                ...state,
                profilePercentage: action.data
            };
        default:
            return state;
    }
}

export default progressIndicatorState;
