import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { ModalPopup } from './index';

jest.mock('reactstrap', () => ({	
    Modal: 'mockSelectField',
    ModalHeader: 'mockSelect',
    ModalBody: 'mockItem',
    ModalFooter: 'ModalFooter'
}))	

Enzyme.configure({ adapter: new Adapter() })

describe('ModalPopup', () => {
    it('should return correct component', () => {
        const wrapper = mount(
            <ModalPopup
                isOpen={false}
                toggle={true}
                ModalBody={<span>Do you want to discard the changes?</span>}
                btn1='YES'
                btn2='NO'
                className='modal-sm'
                headerFooter='d-none'
                footer='d-none'
                centered
            />,
        )
        expect(wrapper).toBeDefined();
    })
}); 