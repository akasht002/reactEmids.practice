import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import ScheduleType from './ScheduleType';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleScheduleType: jest.fn(),
    scheduleType: [{
        genderId: 1,
        name: 'OneTime'
    }]
};

store = mockStore(defaultState);

describe("ScheduleType", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ScheduleType dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ScheduleType contains FeedbackAnswerWidget', () => {
        expect(shallowWrapper.find('.FeedbackAnswerWidget').length).toEqual(1);
    });

    it('Check the events', () => {
        shallowWrapper.setProps({
            genderType: [{
                genderId: 1,
                name: 'Other'
            }] 
        })
        expect(shallowWrapper.find('.form-radio-input').props().onChange({target:{checked: true}}))
    })
})