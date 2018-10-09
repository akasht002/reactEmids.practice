import { USER } from './actions';

const defaultState = {
    userData: {},
    loading: false,
    error: {
        message: '',
        code: ''
    },
    roles: {}
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
        case USER.setUserRoles:
            return {
                ...state,
                roles: action.data
            }
        case USER.clearData:
            return defaultState;

        default:
            return state;
    }
}