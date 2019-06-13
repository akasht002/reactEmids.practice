import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CheckBox } from './checkbox';

Enzyme.configure({ adapter: new Adapter() })

describe('CheckBox', () => {
    let props = {
        participant: {userId: 1, isChecked: true, thumbNail: '', firstName: 'TEST', lastName: 'TEST'},
        onCheckParticipant: jest.fn(),

    }
    it('should return correct component', () => {
        const wrapper = mount(
            <CheckBox
            {...props}
            />
        )
        expect(wrapper.find('.form-check').length).toEqual(1)
    })

});  