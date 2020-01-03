import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import NotificationCheckBox from './NotificationCheckBox';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    nList: [{
        isChecked: true,
        userPrefrencesApplicationModuleID: 1,
        userId: 13
        }],
    handleChange: jest.fn()    
};

store = mockStore(defaultState);

describe("NotificationCheckBox", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <NotificationCheckBox dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the NotificationCheckBox contains NotificationsSettingsContents', () => {
        expect(shallowWrapper.find('.NotificationsSettingsContents').length).toEqual(1);
    });

    it('Check the NotificationDetails contains NotificationsMiddleContent', () => {
        let e = {
            target: {
                checked: true
            }
        }
        expect(shallowWrapper.find('[name="ServiceStatus"]').props().onChange(e))
    });

})