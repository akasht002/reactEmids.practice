import {
    LOGIN
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
        case LOGIN.start:
            return {
                ...state,
                loading: true
            };

        case LOGIN.end:
            return {
                ...state,
                loading: false
            };

        case LOGIN.success:
            return {
                ...state,
                userData: action.userData,
            };


        case LOGIN.failed:
            return {
                ...state,
                error: {
                    message: '',
                    code: ''
                }
            };

            case LOGIN.service_provider_id:
            return {
                ...state,
                serviceProviderID: action.data,
            };

        default:
            return state;
    }
}
