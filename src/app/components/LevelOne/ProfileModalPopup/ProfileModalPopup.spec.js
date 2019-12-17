import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { ProfileModalPopup } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('ProfileModalPopup', () => {
    it('should return correct component', () => {
        const wrapper = mount(
            <ProfileModalPopup
                isOpen={false}
                className={'test'}
                toggle={true}
                modalTitle={'test'}
                ModalBody={<span>Test</span>}
            />
        )
        expect(wrapper.find('.test').length).toEqual(2);
    })
}); 