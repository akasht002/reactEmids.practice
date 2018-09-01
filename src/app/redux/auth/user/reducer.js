import {
    USER
} from './actions'

const defaultState = {
    userData: {},
    loading: false,
    serviceProviderID: '',
    error: {
        message: '',
        code: ''
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER.setUser:
            return {
                ...state,
                userData: action.userData,
            };


        case USER.service_provider_id:
            return {
                ...state,
                serviceProviderID: action.data,
            };

        case USER.deleteUser:
            return {
                ...state,
                userData: null,
            };

        default:
            return state;
    }
}