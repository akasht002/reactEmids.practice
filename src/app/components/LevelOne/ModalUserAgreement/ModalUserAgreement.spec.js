import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { ModalUserAgreement } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('ModalPopupWithoutFooter', () => {
    it('should return correct component', () => {
        const wrapper = mount(
            <ModalUserAgreement
                isOpen={false}
                className={'test'}
                toggle={true}
                modalTitle={'test'}
                ModalBody={<span>Test</span>}
                buttonLabel={'Yes'}
            />
        )
        expect(wrapper).toBeDefined();
    })
}); 