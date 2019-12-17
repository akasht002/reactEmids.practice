import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { DashboardCarousel } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('CheckBox', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <DashboardCarousel>
            </DashboardCarousel>
        )
        expect(wrapper).toBeDefined();
    })
});

