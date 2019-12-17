import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CheckBox } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('CheckBox', () => {
    it('should return correct component', () => {
        const wrapper = mount(
            <CheckBox name={[1, 2]} />
        )
        expect(wrapper.find('.CheckboxIcon').length).toEqual(1)
    })

});  