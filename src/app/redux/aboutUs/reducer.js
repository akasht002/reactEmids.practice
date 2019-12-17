import { AboutUs } from './bridge'

const defaultState = {
    aboutUsContent: '',
    buildVersion: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case AboutUs.getAboutUsContentSuccess:
            return {
                ...state,
                aboutUsContent: action.data.value,
            };
        case AboutUs.getBuildVersionSuccess:
            return {
                ...state,
                buildVersion: action.data.value,
            };
        default:
            return state;
    }
}