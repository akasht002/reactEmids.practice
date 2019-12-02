import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import {ImageInstruction} from './ImageInstruction';

Enzyme.configure({ adapter: new Adapter() })

describe('ImageInstruction ', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <ImageInstruction >
            </ImageInstruction >,
        )
        expect(wrapper).toBeDefined();
    })
});

