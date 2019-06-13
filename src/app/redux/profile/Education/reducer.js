import { Education } from './bridge';

const defaultState = {
    educationList: [],
    educationalDetails: '',
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
                educationalDetails: action.data
            };

        case Education.addEducationSuccess:
            return {
                ...state,
                addEducationSuccess: action.isSuccess,
                educationalDetails:{
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
