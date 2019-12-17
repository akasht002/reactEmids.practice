import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { AlertPopup } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    isOpen: true,
    okButtonAlignment: '',
    OkButtonTitle: '',
    CancelButtonTitle: '',
    isCancel: true
}

describe('StarRating', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <AlertPopup {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })


    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            isOpen: true
        }
        wrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the closePopup  function', () => {
        wrapper.instance().closePopup()
    });

    it('Check the okButtonAlignment  part', () => {
        wrapper.setProps({
            okButtonAlignment: 'test'
        })
        expect(wrapper.find('.test').length).toEqual(0);
    });

    it('Check the OkButtonTitle part', () => {
        wrapper.setProps({
            OkButtonTitle: 'test'
        })
        expect(wrapper.find('.test').length).toEqual(0);
    });

    it('Check the CancelButtonTitle  part', () => {
        wrapper.setProps({
            CancelButtonTitle: 'CancelButtonTitle '
        })
        expect(wrapper.find('.CancelButtonTitle').length).toEqual(0);
    });
});

