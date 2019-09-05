import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';
import { calenderDetails } from './CalendarDetails'


Enzyme.configure({ adapter: new Adapter() })

let store;
const dispatch = sinon.spy();

const defaultState = {
    handleClick: jest.fn(),
    togglePersonalDetails: jest.fn(),
    goToESPProfile: jest.fn(),
    goToPatientProfile: jest.fn(),

}

describe("calenderDetails", function () {
    let wrapper;

    wrapper = shallow(
        <calenderDetails dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the calenderDetails Details body', () => {
        expect(wrapper).toBeDefined()
    });
});