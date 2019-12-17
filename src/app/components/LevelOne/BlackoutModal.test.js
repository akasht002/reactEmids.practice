import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import BlackoutModal from './BlackoutModal';

Enzyme.configure({ adapter: new Adapter() })

let props = {}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <BlackoutModal {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

