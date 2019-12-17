import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

 import { Welcome, mapDispatchToProps } from './index.js';

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
    onLogin: jest.fn()
}

 store = mockStore(defaultState);

 describe("Welcome", function () {
    let shallowWrapper;

     beforeEach(() => {
        shallowWrapper = shallow(
            <Welcome dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Welcome body', () => {
        expect(shallowWrapper.find('[test-welcome="test-welcome"]').length).toEqual(1);
    });

    // it('Check the prevSlide', () => {
    //     shallowWrapper.setState({
    //         activeIndex: 1
    //     })
    //     shallowWrapper.instance().prevSlide();
    // });

    it('Check the nextSlide', () => {
        shallowWrapper.setState({
            activeIndex: 1,
            slider: [{}]
        })
        shallowWrapper.instance().nextSlide();
    });

    
    it('Check the clickIndicator', () => {
        let e = {
            target: {
                textContent: 'asdsa'
            }
        }
        shallowWrapper.instance().clickIndicator(e);
    });

    it('Check the componentWillUnmount', () => {
        shallowWrapper.instance().componentWillUnmount();
    });

    it('Check the onLoginPress', () => {
        shallowWrapper.instance().onLoginPress();
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onLogin();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
 }); 