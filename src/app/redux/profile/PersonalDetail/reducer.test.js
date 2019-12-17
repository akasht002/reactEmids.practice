import reducer from './reducer'
import { PersonalDetails } from './bridge'


describe('PersonalDetails  reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                personalDetail: [],
                updatePersonalDetailSuccess: false,
                cityDetail: [],
                imageData: '',
                genderList: [],
                affiliationList: [],
                spBusyInVisit: null,
                sbModeClicked: false,
                serviceProviderId: null,
                isUser: true,
                serviceProviderTypeId: 0,
                isEntityServiceProvider: false,
                entityId: null
            }
        );
    });

    it("should return the get_personal_detail_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.get_personal_detail_success,
            data: data
        })).toEqual(
            {
                personalDetail: data
            }
        )
    });

    it("should return the get_gender_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.get_gender_success,
            data: data
        })).toEqual(
            {
                genderList: data
            }
        )
    });

    it("should return the get_affiliation_detail_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.get_affiliation_detail_success,
            data: data
        })).toEqual(
            {
                affiliationList: data
            }
        )
    });

    it("should return the update_personal_detail_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.update_personal_detail_success,
            data: data
        })).toEqual(
            {
                updatePersonalDetailSuccess: {}
            }
        )
    });


    it("should return the get_city_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.get_city_success,
            data: data
        })).toEqual(
            {
                cityDetail: data
            }
        )
    });

    it("should return the upload_img_success state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.upload_img_success,
            data: data
        })).toEqual(
            {
                imageData: data
            }
        )
    });

    it("should return the get_sp_busy_in_visit_success state", () => {
        let data = {}
        let sbModeClicked = true
        expect(reducer(data, {
            type: PersonalDetails.get_sp_busy_in_visit_success,
            data: data,
            sbModeClicked: true
        })).toEqual(
            {
                spBusyInVisit: data,
                sbModeClicked: sbModeClicked
            }
        )
    });

    it("should return the clearSbMode state", () => {
        let data = false
        expect(reducer(data, {
            type: PersonalDetails.clearSbMode,
            data: data
        })).toEqual(
            {
                sbModeClicked: data
            }
        )
    });

    it("should return the setServiceProviderId state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.setServiceProviderId,
            serviceProviderId: 1,
            isUser: false,
            isEntityServiceProvider: true,
            serviceProviderTypeId: 'I',
            entityId: 2
        })).toEqual(
            {
                serviceProviderId: 1,
                isUser: false,
                isEntityServiceProvider: true,
                serviceProviderTypeId: 'I',
                entityId: 2
            }
        )
    });

    it("should return the clearServiceProviderId state", () => {
        let data = {}
        expect(reducer(data, {
            type: PersonalDetails.clearServiceProviderId,
            serviceProviderId: null,
            isUser: true,
            isEntityServiceProvider: false,
            serviceProviderTypeId: 0,
            entityId: null
        })).toEqual(
            {
                serviceProviderId: null,
                isUser: true,
                isEntityServiceProvider: false,
                serviceProviderTypeId: 0,
                entityId: null
            }
        )
    });
});