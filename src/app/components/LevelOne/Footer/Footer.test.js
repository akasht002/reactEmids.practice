import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { Footer } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <Footer>
            </Footer>,
        )
        expect(wrapper).toBeDefined();
    })
});

