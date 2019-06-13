import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { AvailabilityEdit } from './AvailabilityEdit.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    existingAvailableDays: [],
    blackoutDays: [],
    profileState: {
        AvailabilityState: {
            blackoutDays: []
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getBlackOutDays: jest.fn(),
    addBlackOutDay: jest.fn(),
    updateBlackOutDay: jest.fn(),
    deleteBlackoutDay: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <AvailabilityEdit dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("AvailabilityEdit", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <AvailabilityEdit dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the AvailabilityEdit form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    //  it('Check the componentWillMount', () => {
    //     shallowWrapper.instance().componentWillMount();
    // });

    //  it('Check the toggleCheckbox', () => {
    //     shallowWrapper.instance().toggleCheckbox([], [], { target: { checked: true } });
    // });

    //  it('Check the getSlots', () => {
    //     shallowWrapper.instance().getSlots([], 1);
    // });

    //  it('Check the checkBoxValue', () => {
    //     shallowWrapper.instance().checkBoxValue([]);
    // });

    //  it('Check the getAllAvailableDays', () => {
    //     shallowWrapper.instance().getAllAvailableDays();
    // });

    //  it('Check the combineExistingAvailableData', () => {
    //     shallowWrapper.instance().combineExistingAvailableData();
    // });

 }); 