import { ServiceOffered } from './bridge';

const defaultState = {
    serviceOfferedList: [],
    serviceOfferedDetails: ''
};

const serviceOfferedState = (state = defaultState, action) => {
    switch (action.type) {

        case ServiceOffered.getServicesOfferedSuccess:
            return {
                ...state,
                serviceOfferedList: action.data
            };

        case ServiceOffered.getServiceOfferedDetails:
            return {
                ...state,
                serviceOfferedDetails: action.data
            };

        default:
            return state;
    }
}

export default serviceOfferedState;
