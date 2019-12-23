import reducer from './reducer';
import {PatientProfile} from './bridge';

describe("PatientProfile reducer test case",()=>{
    
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
        patientProfilePercentage:0
      }
    it("should return the initial state",()=>{
        expect(reducer(undefined, {})).toEqual(
            defaultState
        )
    })

    it('Should handle the get_esp_personal_detail_success',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.get_esp_personal_detail_success,
            data
        })).toBeDefined()
    })

    it('Should handle the getESPEducationSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getESPEducationSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the upload_esp_img_success',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.upload_esp_img_success,
            data
        })).toBeDefined()
    })

    it('Should handle the setESP',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.setESP,
            data
        })).toBeDefined()
    })

    it('Should handle the setPatient',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.setPatient,
            data
        })).toBeDefined()
    })

    it('Should handle the setParticipantProfile',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.setParticipantProfile,
            data
        })).toBeDefined()
    })

    it('Should handle the getPersonalDetailSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getPersonalDetailSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getImgSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getImgSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getPointServiceSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getPointServiceSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getManageConnectionSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getManageConnectionSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getSelectedLanguageDetails',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getSelectedLanguageDetails,
            data
        })).toBeDefined()
    })

    it('Should handle the getSelectedClinicalConditionDetails',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getSelectedClinicalConditionDetails,
            data
        })).toBeDefined()
    })

    it('Should handle the getProfilePercentageSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getProfilePercentageSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the clearState',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.clearState,
            data
        })).toBeDefined()
    })

    it('Should handle the getEmergencyContactDetailsSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getEmergencyContactDetailsSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getAttorneyContactDetailsSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getAttorneyContactDetailsSuccess,
            data
        })).toBeDefined()
    })

    it('Should handle the getPatientVitalsSuccess',()=>{
        let data  ={}
        expect(reducer([],{
            type: PatientProfile.getPatientVitalsSuccess,
            data
        })).toBeDefined()
    })
});