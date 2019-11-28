import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Gender from './Gender';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleGenderType: jest.fn(),
    genderType: [{
        genderId: 1,
        name: 'male'
    }]
};

store = mockStore(defaultState);

describe("Gender", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Gender dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Gender contains FeedbackAnswerWidget', () => {
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