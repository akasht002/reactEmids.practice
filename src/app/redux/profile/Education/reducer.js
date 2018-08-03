import {
    Education
} from './actions'

const defaultState = {
    educationList: [],
    educationFieldDetails: '',
    addeducationSuccess: false
};

const EducationState = (state = defaultState, action) => {
    switch (action.type) {

        case Education.getEducationSuccess:
            return {
                ...state,
                educationList: action.data
            };

        case Education.getEducationFieldDetails:
            return {
                ...state,
                educationFieldDetails: action.data
            };

        case Education.addEducationSuccess:
            return {
                ...state,
                addEducationSuccess: action.isSuccess,
                educationFieldDetails:{
                    school: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                    
                }
            };

        default:
            return state;
    }
}

export default EducationState;
