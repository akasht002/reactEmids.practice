import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Questions } from './Questions';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    handleAssignServiceProvider: jest.fn(),
    showPhoneNumber: jest.fn()
}

describe('Questions', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Questions
                {...props}
                questionsLists={[{ "serviceProviderId": 14, "selected": true, "serviceProviderTypeId": 0, "firstName": "Adam F", "middleName": null, "lastName": "Fisher ", "age": "27", "genderId": 0, "name": null, "yearOfExperience": 6, "affiliationId": 0, "names": null, "entityId": 0, "description": null, "hourlyRate": 0.00, "phoneNumber": "789-973-7820", "addresses": null, "isActive": false, "rowversionId": null, "rating": 5.00, "organizationName": null, "organizationPhoneNumber": null, "websiteUrl": null, "logoByte": null, "logo": null, "shortDescription": null, "serviceProviderType": null, "standByMode": false, "assignedBy": null, "entityName": null, "url": null, "thumbnailByte": null, "thumbnail": "data:image/png;base64," }]}
            />
        )
    })

    it('should return Questions', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return Questions', () => {
        wrapper.setProps({
            entityServiceProvidersList: []
        })
        expect(wrapper).toBeDefined();
    })

   
}); 	
