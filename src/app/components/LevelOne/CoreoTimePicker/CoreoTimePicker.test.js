import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { CoreoTimePicker } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    mandatory: true,
    label: 'From Date',
    clickOutside: jest.fn(),
    setOpen: jest.fn(),
    event: { preventDefault: () => { } },
    dateFormat : 'MM/DD/YYYY'
}

describe('Calendar', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <CoreoTimePicker {...props} />
        )
    })

    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('should return width100', () => {
        wrapper.instance().calendar = {
            state: {
                open: true
            }
        }
        expect(wrapper.find('.width100').props().onClick({
            preventDefault: () => {
            }
        }))
    })

    it('Check the clickOutside  function', () => {
        wrapper.instance().calendar = { cancelFocusInput: () => { }, setOpen: () => { } }
        wrapper.instance().clickOutside()
    });

    it('Check the toBeDefined  function', () => {
        wrapper.setProps({
            dateFormat: null
        })
        expect(wrapper).toBeDefined();
    });


    it('Check the calendar  function', () => {
        wrapper.instance().calendar = {
            state: {
                open: true
            }
        }
    });
});

