import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import EmergencyAttorenyDetails from './EmergencyAttorenyDetails';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    details: { "patientEmergencyContactId": 1, "patientId": 1083, "firstName": "Abhi", "lastName": "Sathya333", "relationship": "Spouse", "relationshipId": 4, "phoneNumber": "9990202020", "address": { "streetAddress": "", "city": "string", "zipCode": 45630, "stateName": "Georgia", "stateId": 10 } },
    header: 'Emergency'
}

describe('EmergencyAttorenyDetails', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <EmergencyAttorenyDetails {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

