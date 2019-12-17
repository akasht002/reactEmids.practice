import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { MyConnections, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    myConnectionList: [{ userType: 'I' }],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getManageConnection: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <MyConnections dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Languages", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <MyConnections dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Languages form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the Empty selectedClinicalConditionsList', () => {
        shallowWrapper.setProps({ myConnectionList: [] })
    });

    it('Check the getManageConnection', () => {
        shallowWrapper.setProps({
            myConnectionList: [{ userType: 'G' }],
        })
    });

    it('Check maptoprops', () => {
        const initialState = {
            patientProfileState:
            {
                myConnectionList: [{ userType: 'I' }],

            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps getManageConnection', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getManageConnection();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 