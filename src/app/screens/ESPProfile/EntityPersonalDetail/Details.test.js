import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Details from './Details';

jest.mock('../../../constants/constants', () => ({
    SCREENS: 'mockSCREENS',
    PERMISSIONS: 'mockPERMISSIONS'
}));

jest.mock('../../../utils/formatName', () => ({
    formatPhoneNumber: 'mockformatPhoneNumber'
}));

jest.mock('../../../components', () => ({
    ProfileImage: 'mockProfileImage'
}));

Enzyme.configure({ adapter: new Adapter() })

describe('Details', () => {
    let wrapper;
    let personalDetail = { "serviceProviderId": 14, "serviceProviderTypeId": 1, "firstName": "Adam F", "middleName": null, "lastName": "Fisher ", "age": "27", "genderId": 6, "genderName": "Male", "affiliationName": "AABB", "categoryId": 7, "affiliationId": 1, "yearOfExperience": 6, "description": "Meals on Wheels AVAILABLE", "hourlyRate": 0.00, "address": [{ "addressId": 33, "serviceProviderId": 0, "addressTypeId": 2, "streetAddress": "91-1600 Wahane St", "city": "Kapolei", "state": { "id": 11, "name": "Hawaii" }, "zipCode": 96707, "isActive": true, "rowversionId": null, "coverageArea": 500.0, "lat": 21.34941, "lon": -158.067337, "addressExternalId": null, "stateId": 0 }], "isActive": false, "phoneNumber": "789-973-7820", "rating": 5.00, "organization": null, "entity": { "entityExternalId": 0, "entityId": 7, "name": null, "email": null, "phoneNumber": "789-973-7820", "websiteUrl": "www.mealsonwheels.com", "logoByte": null, "logo": null, "shortDescription": null, "isActive": false, "autoInvite": null, "modeOfInvite": 0, "invitesCount": 0, "createDate": "0001-01-01T00:00:00", "modifiedDate": "0001-01-01T00:00:00", "yearsOfExperience": 0, "organization": null, "assignedBy": "Meals on Wheels", "rating": 5.00 }, "serviceProviderType": "EntityServiceProvider", "standByMode": false, "entityName": null, "url": "www.mealsonwheels.com" }
    beforeEach(() => {
        wrapper = shallow(
            <Details
                personalDetail={personalDetail}
                image={'aa'}
                profilePercentage={50}
                streetAddress={'TEST'}
                city={'TEST'}
                states={'TEST'}
                zipCode={'000000'}
            />
        )
    })

    it('should return Details', () => {
        expect(wrapper).toBeDefined()
    })
}); 	
