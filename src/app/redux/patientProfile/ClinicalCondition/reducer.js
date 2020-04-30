import {
    ClinicalCondition
} from './bridge'

const defaultState = {
    ClinicalConditionList: [],
    selectedClinicalConditionList:[],
    selectedClinicalConditionsList:[]
};

const ClinicalConditionState = (state = defaultState, action) => {
    switch (action.type) {

        case ClinicalCondition.getClinicalConditionSuccess:
            return {
                ...state,
                ClinicalConditionList: action.data
            }; 

        case ClinicalCondition.getSelectedClinicalConditionDetails:
            return {
                ...state,
                selectedClinicalConditionsList: action.data
            }; 
        case ClinicalCondition.GET_SELECTED_CLINICAL_CONDITION_SUCCESS:           
            return {
                ...state,
                selectedClinicalConditionsList: action.data
            }; 
        case ClinicalCondition.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default ClinicalConditionState;
