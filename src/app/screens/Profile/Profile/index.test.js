import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Profile } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    profilePercentage: [],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getProfilePercentage: jest.fn(),
    navigateProfileHeader: jest.fn(),
    clearInvitaion: jest.fn(),
    joinVideoConference: jest.fn(),
    goToDashboard: jest.fn(),
    rejectConference: jest.fn(),
    goBack: jest.fn(),
    clearServiceProviderId: jest.fn(),
    getPersonalDetail: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Profile dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("Profile", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Profile dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Profile form body', () => {
        expect(wrapper.find('.container-fluid').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     // it('Check the reset', () => {
    //     shallowWrapper.instance().reset();
    // });

     // it('Check the toggleServiceArea', () => {
    //     shallowWrapper.instance().toggleServiceArea();
    // });

     // it('Check the onClose', () => {
    //     shallowWrapper.instance().onClose();
    // });

     // it('Check the addServiceArea', () => {
    //     shallowWrapper.instance().addServiceArea();
    // });

     // it('Check the showModalOnDelete', () => {
    //     shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    // });

     // it('Check the editServiceArea', () => {
    //     shallowWrapper.instance().editServiceArea({ target: { id: 1 } });
    // });

     // it('Check the updateServiceArea', () => {
    //     shallowWrapper.instance().updateServiceArea();
    // });

     // it('Check the deletePointService', () => {
    //     shallowWrapper.instance().deletePointService();
    // });

     // it('Check the textChangeValue', () => {
    //     shallowWrapper.instance().textChangeValue({ target: { value: 1 } });
    // });

     // it('Check the rangeChangeValue', () => {
    //     shallowWrapper.instance().rangeChangeValue({ target: { value: 1 } });
    // });

     // it('Check the onClickHandleIncr', () => {
    //     shallowWrapper.instance().onClickHandleIncr();
    // });

     // it('Check the onClickHandleDecr', () => {
    //     shallowWrapper.instance().onClickHandleDecr();
    // });

     // it('Check the checkLength', () => {
    //     shallowWrapper.instance().checkLength([]);
    // });

     // it('Check the checkZipLength', () => {
    //     shallowWrapper.instance().checkZipLength([]);
    // });

     // it('Check the checkFieldsOnEdit true', () => {
    //     shallowWrapper.instance().checkFieldsOnEdit([1,2]);
    // });

     // it('Check the checkFieldsOnEdit false', () => {
    //     shallowWrapper.instance().checkFieldsOnEdit();
    // });

     // it('Check the checkFiledLengths', () => {
    //     shallowWrapper.instance().checkFiledLengths([]);
    // });

 }); 