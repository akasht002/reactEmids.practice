import { USER } from './bridge'

const defaultState = {
    userData: {},
    loading: false,
    error: {
        message: '',
        code: ''
    },
    roles: {},
    menuClicked: null,
    isFormDirty: false,
    isSecureLogin: false,
    thresholdRadius: 0,
    sessionTime: 1198000
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
        case USER.isSecureLogin:
            return {
                ...state,
                isSecureLogin: action.data
            }
        case USER.getThresholdRadiusSuccess:
        return {
            ...state,
            thresholdRadius: action.data && action.data.value
        };
        case USER.getsessionTimeOutSuccess:
        return {
            ...state,
            sessionTime: action.data && action.data
        };
        default:
            return state;
    }
}