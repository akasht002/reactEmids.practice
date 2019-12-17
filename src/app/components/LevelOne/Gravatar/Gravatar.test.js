import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { Gravatar } from './index';

jest.mock('react-select', () => ({
    Select: 'mockSelect'
}))

Enzyme.configure({ adapter: new Adapter() })

describe('Gravatar ', () => {
    const props = {
        base: '/lll/leaw/',
        extension: '.png',
        className: 'Test',
        value: "Test"
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Gravatar {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should return correct component', () => {
        wrapper.setProps({
            className: null
        })
        expect(wrapper).toBeDefined();
    });
});
