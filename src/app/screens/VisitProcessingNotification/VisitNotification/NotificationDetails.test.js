import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import NotificationDetails from './NotificationDetails';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    onChangeSlider: jest.fn(),
    visitNotification : [{
        customDate: '11/12/2019',
        messageContent: 'sadassdsdf'
    }]
};

store = mockStore(defaultState);

describe("NotificationDetails", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <NotificationDetails dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the NotificationDetails contains NotificationsMiddleContent', () => {
        expect(shallowWrapper.find('.NotificationsMiddleContent').length).toEqual(1);
    });

})