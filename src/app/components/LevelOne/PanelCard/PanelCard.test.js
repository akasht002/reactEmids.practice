import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import PanelCard  from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    children: 'Test'
}

describe('LoginCover', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <PanelCard {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

