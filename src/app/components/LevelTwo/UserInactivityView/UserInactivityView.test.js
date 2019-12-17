import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { UserInactivityView } from './index';

Enzyme.configure({ adapter: new Adapter() })

let props = {
    timeForInactivity: 1000,
    inactiveUser: jest.fn()
}

describe('UserInactivityView ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <UserInactivityView  {...props} />
        )
    })
    it('should return correct component', () => {
        expect(wrapper).toBeDefined();
    })

    it('Check the onInactivity  function', () => {
        wrapper.instance().onInactivity()
    });

    it('Check the onInactivity  function', () => {
        expect(wrapper.find('.modal-sm').props().onConfirm());
    });
});

