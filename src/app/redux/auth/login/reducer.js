import { LOGIN } from './actions'

const defaultState = {
    loading: false,
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

        case LOGIN.failed:
            return {
                ...state,
                error: {
                    message: '',
                    code: ''
                }
            };

        default:
            return state;
    }
}
