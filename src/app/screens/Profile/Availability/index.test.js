import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Availability, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    blackoutDays: [],
    profileState: {
        AvailabilityState: {
            availableDays: 30,
            blackoutDays: 20
        },
        PersonalDetailState: {
            isUser: true
        }
    },
    updateAvailabilityDays: jest.fn(),
    getAvailableDays: jest.fn(),
    getBlackOutDays: jest.fn(),
    availableDays: {
        days: [{
            slots: [],
            dayName: 'Wed'
        }]
    }
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Availability dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Availability", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Availability dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Availability form body', () => {
        shallowWrapper.setState({
            availableDays: {
                days: [{
                    slots: ['mor', 'even'],
                    dayName: 'Wed'
                }],
                slots: ['mor', 'even']
            }
        })
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).updateAvailabilityDays([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAvailableDays();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getBlackOutDays();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('check the events', () => {
        expect(shallowWrapper.find('[className="modal-sm"]').props().onConfirm())
        expect(shallowWrapper.find('[className="modal-sm"]').props().onCancel())
    })

    it('Check the componentWillReceiveProps', () => {
        shallowWrapper.instance().componentWillReceiveProps({ availableDays: 30 });
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

    it('Check the toggleAvailability true', () => {
        shallowWrapper.instance().toggleAvailability('closeButton');
    });

    it('Check the toggleAvailability false', () => {
        shallowWrapper.instance().toggleAvailability('');
    });

    it('Check the closeModal', () => {
        shallowWrapper.instance().closeModal('closeButton');
    });

    it('Check the onSubmit', () => {
        shallowWrapper.instance().onSubmit();
    });

    it('Check the storeData', () => {
        shallowWrapper.instance().storeData('TEST');
    });

    it('Check the toggleCheck', () => {
        shallowWrapper.instance().toggleCheck();
        shallowWrapper.instance().disabled = 'asa'
        shallowWrapper.instance().toggleCheck();
    });

    it('Check the getAvailableDays', () => {
        shallowWrapper.setState({
            availableDays: {
                days: [{
                    slots: [],
                    dayName: 'Wed'
                }]
            }
        })
        shallowWrapper.instance().getAvailableDays();
        shallowWrapper.instance().slotList = 2
        shallowWrapper.instance().getAvailableDays();
    });

    it('Check the getSlots', () => {
        let slots = [{
            isActive: true,
        }]
        shallowWrapper.instance().getSlots(slots);
        slots[0].isActive = false
        shallowWrapper.instance().getSlots(slots);
    });

    it('Check the toggleBlackoutModal', () => {
        shallowWrapper.instance().toggleBlackoutModal();
    });

}); 