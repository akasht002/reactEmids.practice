import { USER } from './actions';

const defaultState = {
    userData: {},
    loading: false,
    error: {
        message: '',
        code: ''
    },
    autoLogoutTime: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER.setUser:
            return {
                ...state,
                userData: action.userData,
            };

        case USER.deleteUser:
            return {
                ...state,
                userData: null,
            };
        case USER.setAutoLogout:
            return {
                ...state,
                autoLogoutTime: action.data
            };
        case USER.clearData:
            return defaultState;

        default:
            return state;
    }
}