import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { ServiceOffered } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    serviceOfferedList: [],
    serviceOfferedDetails: [],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getServiceOffered: jest.fn(),
    addServiceOfferd: jest.fn(),
    editServiceOffered: jest.fn(),
    toggleCollapseCategory: jest.fn(),
    toggleCollapseDetails: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceOffered dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("ServiceOffered", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <ServiceOffered dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the ServiceOffered form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

     it('Check the toggleServiceOffered', () => {
        shallowWrapper.instance().toggleServiceOffered();
    });

     it('Check the addIconServiceOffered', () => {
        shallowWrapper.instance().addIconServiceOffered();
    });

     it('Check the editServiceOffered', () => {
        shallowWrapper.instance().editServiceOffered();
    });

     it('Check the oncheckedServices', () => {
        shallowWrapper.instance().oncheckedServices([]);
    });

     it('Check the addServiceOfferd', () => {
        shallowWrapper.instance().addServiceOfferd();
    });

 }); 