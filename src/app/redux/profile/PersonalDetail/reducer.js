import {
    PersonalDetails
} from './actions'

const defaultState = {
    personalDetail: [],
    updatePersonalDetailSuccess: false,

};

const PersonalDetailState = (state = defaultState, action) => {
    switch (action.type) {

        case PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS:
            return {
                ...state,
                personalDetail: action.data
            };       

        case PersonalDetails.UPDATE_PERSONAL_DETAIL_SUCCESS:
            return {
                ...state,
                updatePersonalDetailSuccess: action.isSuccess
            };

        default:
            return state;
    }
}

export default PersonalDetailState;
