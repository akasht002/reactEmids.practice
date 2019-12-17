import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CoreoCheckBox } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('CheckBox', () => {
    it('should return correct component', () => {
        const wrapper = shallow(
            <CoreoCheckBox
                id={1}
                name={'name'}
                value={'Open'}
                defaultChecked={false}
                className={'className'}
                checked={'true'}>
            </CoreoCheckBox>,
        )
        expect(wrapper.find('[type="checkbox"]')).toBeDefined();

    })

});

