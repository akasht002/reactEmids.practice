import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { Progressbar } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    totaltask : 10,
    taskCompleted : 5
}

describe('LoginCover', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Progressbar {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

