import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Contracts  from './Contracts';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    handleContracts: jest.fn(),
    contracts: [{
        membershipName: 'avsdc',
        membershipId: 1
    }]
};

store = mockStore(defaultState);

describe("Contracts", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Contracts dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Contracts contains FeedbackAnswerWidget', () => {
        expect(shallowWrapper.find('.FeedbackAnswerWidget').length).toEqual(1);
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('.form-radio-input').props().onChange({target:{checked: true}}))
    })
})