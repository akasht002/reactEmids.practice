import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { PersonalDetail, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    patientProfileState: {
        personalDetail: {},
        profileImgData: {
            image: ''
        },
        patientProfilePercentage: 100
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getPersonalDetail: jest.fn(),
    getImage: jest.fn(),
    getProfilePercentage: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDetail dispatch={dispatch} store={store} {...props} />
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
            <PersonalDetail dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Languages form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the Empty', () => {
        shallowWrapper.setProps({
            personalDetail: {},
            profileImgData: '',
            patientProfilePercentage: ''
        })
    });

    it('Check the languageList', () => {
        shallowWrapper.setProps({
            personalDetail: {},
            profileImgData: 'TTTTTTEEEEEEEEEE',
            patientProfilePercentage: 100
        })
    });

    it('Check maptoprops', () => {
        const initialState = {
            patientProfileState: {
                personalDetail: {},
                profileImgData: '',
                patientProfilePercentage: 100
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPersonalDetail();
        mapDispatchToProps(dispatch).getImage();
        mapDispatchToProps(dispatch).getProfilePercentage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 