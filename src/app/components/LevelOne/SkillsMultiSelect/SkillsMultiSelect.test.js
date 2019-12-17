import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { SkillsMultiSelect } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    onselect: jest.fn()
}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <SkillsMultiSelect {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })


    it('Check the getInitialState function', () => {
        wrapper.instance().getInitialState()
    });

    it('Check the setValue  function', () => {
        wrapper.instance().setValue()
    });

    it('Check the componentDidMount part', () => {
        wrapper.instance().componentDidMount()
    });
});

