import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import ProfileHeader from './ProfileHeader';
import { mapDispatchToProps } from './ProfileHeader'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    isOpen: false,
    dBlock: "",
    dropdownOpen: false,
    headerMenu: [
        {
            name: 'notification',
            status: 'Test'
        },
        {
            name: 'messages',
            status: 'Test'
        }
    ],
    onLogout: jest.fn()
}

store = mockStore(defaultState);


describe("ScreenCover", function () {
    let shallowWrapper;
    beforeEach(() => {
        shallowWrapper = shallow(
            <ProfileHeader dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ScreenCover', () => {
        expect(shallowWrapper).toBeDefined();
    });

    it('Check the componentDidUpdate', () => {
        let prevProps = {
            dropdownOpen: true
        }
        let prevState = {
            dropdownOpen: false
        }
        shallowWrapper.instance().componentDidUpdate(prevProps, prevState);
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onLogout({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    })
});