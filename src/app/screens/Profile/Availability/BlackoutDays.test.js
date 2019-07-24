import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { BlackoutDays,mapStateToProps,mapDispatchToProps } from './BlackoutDays';

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
                <BlackoutDays dispatch={dispatch} store={store} {...props} />
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
            <BlackoutDays dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the BlackoutDays Details body', () => {
        expect(shallowWrapper).toBeDefined()
    }); 

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getBlackOutDays();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).addBlackOutDay();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateBlackOutDay();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).deleteBlackoutDay();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the toggleBlackout function', () => {
        shallowWrapper.instance().toggleBlackout([{slotName:'g'}],{},[{slotName:'g'}],{target:{checked:true}})
    })

    it('Check the saveBlackoutData function', () => {
        shallowWrapper.setState({
            modalTypeValue : 'add'
        })
        shallowWrapper.instance().saveBlackoutData({})
    })

    it('Check the saveBlackoutData function', () => {
        shallowWrapper.setState({
            modalTypeValue : ''
        })
        shallowWrapper.instance().saveBlackoutData({})
    })

    it('Check the deleteBlackoutDays function', () => {
        shallowWrapper.instance().deleteBlackoutDays({})
    })

    it('Check the delete function', () => {
        shallowWrapper.instance().delete()
    })

    it('Check the closeBlackoutModal function', () => {
        shallowWrapper.instance().closeBlackoutModal()
    })

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = { 
            blackoutDays : { blockOutDates: [{ isActive:true, startDate:'', endDate:'', remarks:''}]}

        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    })
});