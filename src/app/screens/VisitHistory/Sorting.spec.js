import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { Sorting } from './Sorting';

Enzyme.configure({ adapter: new Adapter() })

describe('Sorting', () => {
    let props = {}
    it('should return correct component', () => {
        const wrapper = mount(
            <Sorting
                {...props}
            />
        )
        expect(wrapper.find('.ListItem').length).toEqual(0)
    })

});  