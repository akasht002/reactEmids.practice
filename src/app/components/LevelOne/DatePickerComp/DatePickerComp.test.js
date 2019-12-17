import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import { DatePickerComp } from './index'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    isOpen: false
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <DatePickerComp dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("DatePickerComp", function () {
    let wrapper, shallowWrapper;
    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <DatePickerComp dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the DatePickerComp section', () => {
        expect(wrapper.find('.DatePickerLabel').length).toEqual(1);
    });

    it('Check the EnableDatePicker function', () => {
        shallowWrapper.instance().EnableDatePicker()
    });

    it('Check the DisableDatePicker function', () => {
        shallowWrapper.instance().DisableDatePicker()
    });

    it('Check the DisableDatePicker function', () => {
        shallowWrapper.instance().setState({
            startDate: ''
        })
        shallowWrapper.instance().DisableDatePicker()
    });

    it('Check the onFocusInput function', () => {
        shallowWrapper.instance().onFocusInput()
    });

    it('Check the onBlurInput function', () => {
        shallowWrapper.instance().onBlurInput()
    });

    it('Check the DateChange function', () => {
        shallowWrapper.instance().DateChange()
    });
});