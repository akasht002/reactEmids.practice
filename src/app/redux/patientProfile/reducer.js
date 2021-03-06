import { PatientProfile } from './bridge'

const defaultState = {
  patientId: null,
  profilePercentage: '',
  personalDetail: {},
  imageData: {},
  pointOfServiceList: [],
  myConnectionList: [],
  languageList: [],
  clinicalConditionList: [],
  espID: null,
  espPatient: {},
  espimageData: {},
  espEducation: [],
  userType: '',
  patientProfilePercentage: 0,
  vitalDetails: {},
  emergencyContactDetails: {},
  attorneyContactDetails: {},
  coreoInformationDetails: '',
  riskScore:''
}

const patientProfileState = (state = defaultState, action) => {
  switch (action.type) {
    case PatientProfile.get_esp_personal_detail_success:
      return {
        ...state,
        espPatient: action.data
      }
    case PatientProfile.getESPEducationSuccess:
      return {
        ...state,
        espEducation: action.data
      }
    case PatientProfile.upload_esp_img_success:
      return {
        ...state,
        espimageData: action.data
      }
    case PatientProfile.setESP:
      return {
        ...state,
        espID: action.data
      }
    case PatientProfile.setPatient:
      return {
        ...state,
        patientId: action.data
      }
    case PatientProfile.setParticipantProfile:
      return {
        ...state,
        patientId: action.data.userId,
        userType: action.data.userType,
      }
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
    case PatientProfile.getProfilePercentageSuccess:
      return {
        ...state,
        patientProfilePercentage: action.data
      }
    case PatientProfile.getPatientVitalsSuccess:
      return {
        ...state,
        vitalDetails: action.data
      }
    case PatientProfile.getEmergencyContactDetailsSuccess:
      return {
        ...state,
        emergencyContactDetails: action.data
      };
    case PatientProfile.getAttorneyContactDetailsSuccess:
      return {
        ...state,
        attorneyContactDetails: action.data
      };
    case PatientProfile.clearState:
      return {
        ...state,
        profilePercentage: '',
        personalDetail: {},
        imageData: {},
        pointOfServiceList: [],
        myConnectionList: [],
        languageList: [],
        clinicalConditionList: [],
        espID: null,
        espPatient: {},
        espimageData: {},
        espEducation: [],
        userType: '',
        patientProfilePercentage: 0,
        vitalDetails: {},
        emergencyContactDetails: {},
        attorneyContactDetails: {}
      }
    case PatientProfile.getPatientCoreoDetailsSuccess:
        return {
            ...state,
            coreoInformationDetails: action.data
        };
    case PatientProfile.getPatientRiskScoreSuccess:
        return {
            ...state,
            riskScore: action.data
        };
    default:
      return state
  }
}

export default patientProfileState
