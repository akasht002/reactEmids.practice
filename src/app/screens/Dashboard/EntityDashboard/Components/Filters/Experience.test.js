import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import Experience  from './Experience';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    onChangeExperinceSlider: jest.fn(),
    minExperience: 20,
    maxExperience: 50
};

store = mockStore(defaultState);

describe("Experience", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Experience dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Experience contains RangeSliderWidget', () => {
        expect(shallowWrapper.find('.RangeSliderWidget').length).toEqual(1);
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('[test-input="test-input"]').props().onChange())
        expect(shallowWrapper.find('[test-input="test-input"]').props().onChangeComplete())
        expect(shallowWrapper.find('[test-input="test-input"]').props().formatLabel())
    })
})