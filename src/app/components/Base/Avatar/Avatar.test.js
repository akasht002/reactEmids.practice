import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { Avatar } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('CheckBox', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <Avatar
                alt={'Img'}
                className={'Test'}
                src={'Test'}
                key={10}>
            </Avatar>,
        )
        expect(wrapper).toBeDefined();
    })
});

