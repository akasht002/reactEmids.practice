import { USER } from './actions';

const defaultState = {
    userData: {},
    loading: false,
    error: {
        message: '',
        code: ''
    },
    roles: {},
    menuClicked: null,
    isFormDirty: false
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
        case USER.menuClicked:
            return {
                ...state,
                menuClicked: action.data
            }
        case USER.setIsFormDirty:
            return {
                ...state,
                isFormDirty: action.data
            }
        default:
            return state;
    }
}