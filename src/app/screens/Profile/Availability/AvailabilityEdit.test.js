import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { AvailabilityEdit,mapStateToProps } from './AvailabilityEdit';

 Enzyme.configure({ adapter: new Adapter() })

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
    existingAvailableDays:{days:[{}]},
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

    it('Check the AvailabilityEdit Details body', () => {
        expect(shallowWrapper).toBeDefined()
    }); 

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check the toggleCheckbox function', () => {
        shallowWrapper.instance().toggleCheckbox([{slotName:'g'}],[{slotName:'g'}],{target:{checked:true}})
    })

    it('Check the getSlots  function', () => {
        shallowWrapper.instance().getSlots([{isActive :true}],2)
    })

    it('Check the componentWillMount function', () => {
        shallowWrapper.instance().componentWillMount()
    })

    it('Check the checkBoxValue function', () => {
        shallowWrapper.instance().checkBoxValue([{isActive :true}])
    })

    it('Check the getAllAvailableDays function', () => {
        shallowWrapper.setState({
            updatedAvailableDays :[{}]
        })
        shallowWrapper.instance().getAllAvailableDays()
    })

    it('Check the combineExistingAvailableData function', () => {
        shallowWrapper.setState({
            updatedAvailableDays :[{}],
            isSetData:true
        })
        shallowWrapper.instance().combineExistingAvailableData()
    })   
 }); 