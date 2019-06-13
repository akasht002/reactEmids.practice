import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { PointService, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    PointServiceList: [{ addressId: '1', addressTypeId: 'TEST', street: 'TEST', city: 'TEST', stateName: 'AAA', zip: 555555 }],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getPointService: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PointService dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("PointService", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <PointService dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the PointService form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the Empty selectedClinicalConditionsList', () => {
        shallowWrapper.setProps({ PointServiceList: [] })
    });

    it('Check maptoprops', () => {
        const initialState = {
            patientProfileState:
            {
                PointServiceList: []
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps getPointService', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPointService();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
}); 