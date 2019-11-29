import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

 import { VisitNotification, mapDispatchToProps, mapStateToProps } from './index.js';

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
    visitNotificationState: {
        VisitNotificationState: {
            VisitNotification: [],
            dataCount: 20
        }
    },
    getVisitNotification: jest.fn(),
    getVisitNotificationCount: jest.fn()
}

 store = mockStore(defaultState);

 describe("VisitNotification", function () {
    let shallowWrapper;

     beforeEach(() => {
        shallowWrapper = shallow(
            <VisitNotification dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the VisitNotification form body', () => {
        expect(shallowWrapper.find('.NotificationsWidget').length).toEqual(1);
    });

     it('Check the pageNumberChange', () => {
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the componentWillReceiveProps', () => {
        shallowWrapper.instance().componentWillReceiveProps({nextProps: {dataCount: 20}})
    });
    
    it('Check mapStateToProps', () => {
        shallowWrapper.setState({
            rowCount: 20 
         })
        expect(shallowWrapper.find('[test-pageChange="test-pageChange"]').props().onClick());
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitNotification({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitNotificationCount();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

 }); 