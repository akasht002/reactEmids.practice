import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CoreoRadio } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('CoreoRadio', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <CoreoRadio
                defaultChecked={false}
                id={111}
                type='radio'
                className={'ServiceTypeInput'}
                name={'Test'}
                value={'Test'}>
            </CoreoRadio>
        )
        expect(wrapper.find('[type="radio"]')).toBeDefined();
    })
});

