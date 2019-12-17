import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { StarRating } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = { 
    rating:5,
    handleSelectedRating: jest.fn()
}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <StarRating {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return rating', () => {
        expect(wrapper.find('.rating').props().onChange())
    })
});

