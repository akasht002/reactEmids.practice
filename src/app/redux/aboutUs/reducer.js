import { AboutUs } from './actions'

const defaultState = {
    aboutUsContent: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case AboutUs.getAboutUsContentSuccess:
            return {
                ...state,
                aboutUsContent: action.data.value,
            };
        default:
            return state;
    }
}