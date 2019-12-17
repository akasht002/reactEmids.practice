import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { LoginCover } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    isLoading: false,
    children: 'Test'
}

describe('LoginCover', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <LoginCover {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

