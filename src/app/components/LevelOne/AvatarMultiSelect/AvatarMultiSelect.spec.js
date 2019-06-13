import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MultiSelectAvatar from './index';

jest.mock('react-select', () => ({
    Select: 'mockSelect'
}))

Enzyme.configure({ adapter: new Adapter() })

describe('AvatarMultiSelect', () => {
    const props = {
        removeSelected: true,
        closeOnSelect: jest.fn(),
        multi: [],
        onChange: jest.fn(),
        optionComponent: {},
        options: [],
        placeholder: '',
        value: '',
        valueComponent: {}
    }
    it('should return correct component', () => {
        const wrapper = mount(
            <MultiSelectAvatar {...props} />
        )
        expect(wrapper.find('section SelectWithFlag').length).toEqual(1)
    })

});  