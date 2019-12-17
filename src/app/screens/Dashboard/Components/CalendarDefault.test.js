import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { CalendarDefault }  from './CalendarDefault'


Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();

const defaultState = {
    minValue :0,
    maxValue :45,
    onChangeSlider:jest.fn(),
    onChange:jest.fn()
}

describe("RangeSlider", function () {
    let wrapper;
    
    it('Check the CalendarDefault Details body', () => {
        expect(CalendarDefault(defaultState)).toBeDefined()
    });  
});