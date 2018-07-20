import {
    Profile
} from './actions'

const defaultState = {
    certificationList: [],
    addCertificationSuccess: false
};

const ProfileState = (state = defaultState, action) => {
    switch (action.type) {

        case Profile.getCertificationSuccess:
            return {
                ...state,
                certificationList: action.data
            };

        case Profile.addCertificationSuccess:
            return {
                ...state,
                addCertificationSuccess: action.isSuccess
            };

        default:
            return state;
    }
}

export default ProfileState;
