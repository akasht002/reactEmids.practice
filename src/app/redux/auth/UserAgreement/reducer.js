import { UserAgreement } from './bridge'

const defaultState = {
    isEulaUpdated: false,
    eulaContent: '',
    emailId: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UserAgreement.getUserInfoSuccess:
            return {
                ...state,
                isEulaUpdated: action.data.IsEulaUpdated === 'False' ? true : false,
                emailId: action.data.sub
            };
        case UserAgreement.getEulaContentSuccess:
            return {
                ...state,
                eulaContent: action.data.value,
            };
        case UserAgreement.updateEulaSuccess:
            return {
                ...state,
                isEulaUpdated: false,
            };
        default:
            return state;
    }
}