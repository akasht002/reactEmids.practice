import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { AvailabilityEdit, mapStateToProps } from './AvailabilityEdit';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('./BlackoutDays', () => ({
    BlackoutDays: 'mockBlackoutDays'
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
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
    existingAvailableDays: { days: [{}] },
    getBlackOutDays: jest.fn(),
    addBlackOutDay: jest.fn(),
    updateBlackOutDay: jest.fn(),
    deleteBlackoutDay: jest.fn()
}

store = mockStore(defaultState);
describe("AvailabilityEdit", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AvailabilityEdit dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AvailabilityEdit Details body', () => {
        expect(shallowWrapper).toBeDefined()
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the toggleCheckbox function', () => {
        shallowWrapper.setState({
            lookupDays: [
                {
                    dayId: 1,
                    dayName: 'mon'
                }
            ],
            updatedAvailableDays: [{
                dayName: 'mon',
                dayId: 1
            }]
        })
        shallowWrapper.instance().toggleCheckbox([{ slotName: 'g' }], [{ slotName: 'g' }], { target: { checked: true } })
    })

    it('Check the getSlots  function', () => {
        let day = {
            slots: [{
                isActive: true
            },
            {
                isActive: false
            }
            ]
        }
        shallowWrapper.instance().getSlots(day, 2)
    })

    it('Check the componentWillMount function', () => {
        shallowWrapper.instance().componentWillMount()
    })

    it('Check the checkBoxValue function', () => {
        let day = {
            slots: [{
                isActive: true
            },
            {
                isActive: false
            }
            ]
        }
        shallowWrapper.instance().checkBoxValue(day)
    })

    it('Check the getAllAvailableDays function', () => {
        shallowWrapper.setState({
            updatedAvailableDays: [
                {
                    slots: [{
                        isActive: true
                    },
                    {
                        isActive: false
                    }
                    ]
                }
            ]
        })
        shallowWrapper.instance().getAllAvailableDays()
        shallowWrapper.setState({
            updatedAvailableDays: []
        })
        shallowWrapper.instance().getAllAvailableDays()
    })

    it('Check the combineExistingAvailableData function', () => {
        shallowWrapper.setState({
            updatedAvailableDays: [
                {
                    slots: [{
                        isActive: true,
                        slotName: 'morning'
                    },
                    {
                        isActive: false,
                        slotName: 'evening'
                    }
                    ],
                    dayName: 'Monday'
                }
            ],
            isSetData: true
        })
        shallowWrapper.setProps({
            existingAvailableDays: {
                days:
                    [{
                        dayName: 'Monday',
                        slotName: 'morning'
                    }]
            }
        })
        shallowWrapper.instance().combineExistingAvailableData()
    })
}); 