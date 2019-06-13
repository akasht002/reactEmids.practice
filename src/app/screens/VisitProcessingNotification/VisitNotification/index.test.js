import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { VisitNotification } from './index.js';

 jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    visitNotification: [{customDate: '04-24-2019', messageContent : 'TEST', createDate: '04-24-2019'}],
    dataCount: 30,
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getVisitNotification: jest.fn(),
    getVisitNotificationCount: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VisitNotification dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("VisitNotification", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VisitNotification dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the VisitNotification form body', () => {
        expect(wrapper.find('.NotificationsWidget').length).toEqual(1);
    });

     it('Check the pageNumberChange', () => {
        shallowWrapper.instance().pageNumberChange(1)
    });

 }); 