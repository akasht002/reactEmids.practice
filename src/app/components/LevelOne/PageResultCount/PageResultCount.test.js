import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import {PageResultCount}  from './PageResultCount';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    rowMin: 10,
    rowMax: 100,
    rowCount: 10
}

describe('LoginCover', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <PageResultCount {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })
});

