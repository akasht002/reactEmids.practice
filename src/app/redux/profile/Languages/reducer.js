import {
    Languages
} from './actions'

const defaultState = {
    LanguagesList: [],
    selectedLanguagesList:[]
};

const LanguagesState = (state = defaultState, action) => {
    switch (action.type) {

        case Languages.getLanguagesSuccess:
            return {
                ...state,
                LanguagesList: action.data
            }; 

        case Languages.getSelectedLanguageDetails:
            return {
                ...state,
                selectedLanguagesList: action.data
            }; 

        default:
            return state;
    }
}

export default LanguagesState;
