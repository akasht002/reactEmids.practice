import {
    PatientProfile
} from './actions'

const defaultState = {
    patientId: null,
    profilePercentage: '',
    personalDetail: {},
    imageData: {},
    pointOfServiceList: [],
    myConnectionList: [],
    languageList: [],
    clinicalConditionList: []
};

const patientProfileState = (state = defaultState, action) => {
    switch (action.type) {
        case PatientProfile.setPatient: 
            return {
                ...state,
                patientId: action.data
            };
        case PatientProfile.getPersonalDetailSuccess:
            return {
              ...state,
              personalDetail: action.data
            }
        case PatientProfile.getImgSuccess:
            return {
              ...state,
              imageData: action.data
            }   
        case PatientProfile.getPointServiceSuccess:
            return {
                ...state,
                pointOfServiceList: action.data
            }
        case PatientProfile.getManageConnectionSuccess:
            return {
                ...state,
                myConnectionList: action.data
            }
        case PatientProfile.getSelectedLanguageDetails:
            return {
                ...state,
                languageList: action.data
            }
        case PatientProfile.getSelectedClinicalConditionDetails:
            return {
                ...state,
                clinicalConditionList: action.data
            }
        case PatientProfile.clearState:
            return defaultState;
        default:
            return state;
    }
}

export default patientProfileState;
