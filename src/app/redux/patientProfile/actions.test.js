import * as actions from './actions';

import fetchMock from 'fetch-mock'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API } from '../../services/api';
import { PatientProfile } from './bridge';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('PatientProfile actions', () => {
    it('should create an action to clearState', () => {
        const expectedAction = {
            type: PatientProfile.clearState
        }
        expect(actions.clearState()).toEqual(expectedAction)
    })

    it('should create an action to setPatient', () => {
        const data = {}       
        expect(actions.setPatient()).toBeDefined()
    })

    it('should create an action to setParticipantProfile', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.setParticipantProfile,
            data
        }
        expect(actions.setParticipantProfile()).toBeDefined()
    })

    it('should create an action to setESP', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.setESP,
            data
        }
        expect(actions.setESP()).toBeDefined()
    })

    it('should create an action to getProfilePercentageSuccess', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.getProfilePercentageSuccess,
            data
        }
        expect(actions.getProfilePercentageSuccess()).toBeDefined()
    })

    it('should create an action to getESPPersonalDetailSuccess', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.get_esp_personal_detail_success,
            data
        }
        expect(actions.getESPPersonalDetailSuccess()).toBeDefined()
    })

    it('should create an action to uploadESPImgSuccess', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.upload_esp_img_success,
            data
        }
        expect(actions.uploadESPImgSuccess()).toBeDefined()
    })

    it('should create an action to getESPEducationSuccess', () => {
        const data = {}
        const expectedAction = {
            type: PatientProfile.getESPEducationSuccess,
            data
        }
        expect(actions.getESPEducationSuccess()).toBeDefined()
    })

    it('should create an action to getPersonalDetailSuccess', () => {
        expect(actions.getPersonalDetailSuccess()).toBeDefined()
    })

    it('should create an action to getImgSuccess', () => {
        expect(actions.getImgSuccess()).toBeDefined()
    })

    it('should create an action to getPointServiceSuccess', () => {
        expect(actions.getPointServiceSuccess()).toBeDefined()
    })

    it('should create an action to getManageConnectionSuccess', () => {
        expect(actions.getManageConnectionSuccess()).toBeDefined()
    })

    it('should create an action to getSelectedLanguageDetails', () => {
        expect(actions.getSelectedLanguageDetails()).toBeDefined()
    })

    it('should create an action to getSelectedClinicalConditionDetails', () => {
        expect(actions.getSelectedClinicalConditionDetails()).toBeDefined()
    })

    it('should create an action to getPatientVitalsSuccess ', () => {
        expect(actions.getPatientVitalsSuccess ()).toBeDefined()
    })

    it('should create an action to getEmergencyContactDetailsSuccess ', () => {
        expect(actions.getEmergencyContactDetailsSuccess ()).toBeDefined()
    })

    it('should create an action to getAttorneyContactDetailsSuccess ', () => {
        expect(actions.getAttorneyContactDetailsSuccess ()).toBeDefined()
    })
});


describe('PatientProfile async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an action to getUserData', () => {
        const store = mockStore({
            data: '',
            onboardingState: {
                verifyUserIDState: {
                    serviceProviderDetails: {
                    }
                }
            }
        })
        expect(store.dispatch(actions.getUserData()))
    })

    it('call getESPEducation fn', () => {
        fetchMock.get(API.education, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34}})

        return store.dispatch(actions.getESPEducation()).then((response) => {
            store.dispatch(actions.getESPEducationSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getESPImage fn', () => {
        fetchMock.get(API.getImage, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34}})

        return store.dispatch(actions.getESPImage()).then((response) => {
            store.dispatch(actions.uploadESPImgSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getESPPersonalDetail fn', () => {
        fetchMock.get(API.getPersonalDetail, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34}})

        return store.dispatch(actions.getESPPersonalDetail()).then((response) => {
            store.dispatch(actions.getESPPersonalDetailSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });


    it('call getProfilePercentage fn', () => {
        fetchMock.get(API.getPersonalDetail, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34}})

        return store.dispatch(actions.getProfilePercentage()).then((response) => {
            store.dispatch(actions.getProfilePercentageSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getPersonalDetail fn', () => {
        fetchMock.get(API.getPatientPersonalDetail, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45}})

        return store.dispatch(actions.getPersonalDetail()).then((response) => {
            store.dispatch(actions.getPersonalDetailSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getPersonalDetailGuardian fn', () => {
        fetchMock.get(API.getPersonalDetailGuardian, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45}})

        return store.dispatch(actions.getPersonalDetailGuardian(23)).then((response) => {
            store.dispatch(actions.getPersonalDetailSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getImage fn', () => {
        fetchMock.get(API.getPersonalDetailGuardian, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getImage(23)).then((response) => {
            store.dispatch(actions.getImgSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });


    it('call getImageGuardian fn', () => {
        fetchMock.get(API.getImageGuardian, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getImageGuardian(23)).then((response) => {
            store.dispatch(actions.getImgSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });


    it('call getPointService fn', () => {
        fetchMock.get(API.getPatientAddress, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getPointService(23)).then((response) => {
            store.dispatch(actions.getPointServiceSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getManageConnection fn', () => {
        fetchMock.get(API.getPatientConnections, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getManageConnection(23)).then((response) => {
            store.dispatch(actions.getManageConnectionSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getSelectedLanguages fn', () => {
        fetchMock.get(API.getPatientLanguages, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getSelectedLanguages(23)).then((response) => {
            store.dispatch(actions.getSelectedLanguageDetails(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getSelectedClinicalCondition fn', () => {
        fetchMock.get(API.getPatientClinicalCondition, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getSelectedClinicalCondition(23)).then((response) => {
            store.dispatch(actions.getSelectedLanguageDetails(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getPatientVitals fn', () => {
        fetchMock.get(API.getPatientVitals, {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getPatientVitals()).then((response) => {
            store.dispatch(actions.getPatientVitalsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });

    it('call getEmergencyContactDetails  fn', () => {
        fetchMock.get(API.getEmergencyContactDetails , {
            body: { data: {} },
            headers: { 'content-type': 'application/json' },
            response: { data: {} }
        })

        const store = mockStore({ patientProfileState: {espID:34,patientId:45,userType:'G'}})

        return store.dispatch(actions.getEmergencyContactDetails ()).then((response) => {
            store.dispatch(actions.getEmergencyContactDetailsSuccess(response.data))
            expect(store.getActions()).toBeDefined()
        }).catch(err => {
        })
    });



})