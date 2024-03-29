import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import AgeRange from './AgeRange';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    onChangeSlider: jest.fn(),
    ageRange: {
        minimumAge: 0,
        maximumAge: 50 
    }
};

store = mockStore(defaultState);

describe("AgeRange", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AgeRange dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AgeRange contains RangeSliderWidget', () => {
        expect(shallowWrapper.find('[test-ageRange="test-ageRange"]').length).toEqual(1);
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('[test-input="test-input"]').props().onChange())
    })

})