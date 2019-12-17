import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import PointOfService  from './PointOfService';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    pointofservice: {
        addressTypeId : 1,
        streetAddress: "Test",
        city: "Test",
        stateName: "Test",
        zipCode: 12345   
    }
}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <PointOfService {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

