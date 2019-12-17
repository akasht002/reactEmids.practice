import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { VisitNotificationSettings, mapDispatchToProps, mapStateToProps } from './index.js';

 jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    pushNotification: [{applicationModuleDescription: 'TEST', moduledescription : 'TEST', isChecked: false, userPrefrencesApplicationModuleID: 1, userId: 1}],
    emailNotification: [{applicationModuleDescription: 'TEST', moduledescription : 'TEST', isChecked: false, userPrefrencesApplicationModuleID: 1, userId: 1}],
    isLoading: true,
    authState: {
        userState: {
            userData: {
                userInfo: {serviceProviderId: 12}
            }
        }
    },
    visitNotificationState: {
        VisitNotificationSettingsState: {
            pushNotification: [],
            emailNotification: [],
            isLoading: true 
        }  
    },
    getVisitNotificationSettings: jest.fn(),
    updateVisitNotificationSettings: jest.fn(),
    handlePushChange: jest.fn(),
    handleEmailChange: jest.fn(),
    setIsFormDirty: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VisitNotificationSettings dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("VisitServiceDetails", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VisitNotificationSettings dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the VisitNotificationSettings form body', () => {
        expect(wrapper.find('.ProfileCardBody').length).toEqual(1);
    });

     it('Check the toggle', () => {
        shallowWrapper.instance().toggle()
        expect(shallowWrapper.instance().state.isOpen).toEqual(true);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the handlePushChange', () => {
        shallowWrapper.instance().handlePushChange([]);
    });

     it('Check the handleEmailChange', () => {
        shallowWrapper.instance().handleEmailChange([]);
    });

     it('Check the onClickSave', () => {
        shallowWrapper.instance().onClickSave();
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitNotificationSettings();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateVisitNotificationSettings({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).handlePushChange([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).handleEmailChange([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setIsFormDirty({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

 }); 