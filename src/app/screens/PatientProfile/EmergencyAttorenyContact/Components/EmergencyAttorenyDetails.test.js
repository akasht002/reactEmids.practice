import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import EmergencyAttorenyDetails from './EmergencyAttorenyDetails';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    details: { firstName: 'Test', lastName: 'Test', phoneNumber: '9902040950', relationship: "Test", address: { "streetAddress": "", "city": "string", "zipCode": 45630, "stateName": "Georgia", "stateId": 10 } },
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

    it('should return correct component1', () => {
        wrapper.setProps({ details: "" })
        expect(wrapper).toBeDefined();
    })
});

