import { Skills } from './bridge';

const defaultState = {
    SkillsList: [],
    selectedSkillsList:[]
};

const SkillsState = (state = defaultState, action) => {
    switch (action.type) {

        case Skills.getSkillsSuccess:
            return {
                ...state,
                SkillsList: action.data
            }; 

        case Skills.getSelectedSkillsDetails:
            return {
                ...state,
                selectedSkillsList: action.data
            }; 

        default:
            return state;
    }
}

export default SkillsState;
