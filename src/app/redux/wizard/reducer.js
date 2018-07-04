import {
    Wizard
} from './actions'

const defaultState = {
    isDirty: false
};

const wizardState = (state = defaultState, action) => {
    switch (action.type) {
        case Wizard.setWorkflowDirty:
            return {
                ...state,
                isDirty: true
            };
        case Wizard.resetWorkFlow:
            return {
                ...state,
                isDirty: false
            };
        default:
            return state;
    }
}

export default wizardState;
