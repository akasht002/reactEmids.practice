import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { ModalTemplate } from './index';

Enzyme.configure({ adapter: new Adapter() })

describe('ModalPopupWithoutFooter', () => {
    it('should return correct component', () => {
        const wrapper = mount(
            <ModalTemplate
                isOpen={false}
                className={'test'}
                toggle={true}
                modalTitle={'test'}
                ModalBody={<span>Test</span>}
                footerBody={<span>FooterBody</span>}
                headerClass={'headerClass'}
            />
        )
        expect(wrapper).toBeDefined();
    })
}); 