import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { VitalDetails, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    patientProfileState: {
        imageData:{
            image:''
        },
        vitalDetails: {
            phoneNumber:3245345345,
            emergencyContact:3456345345345
        },
        profileImgData: {
            image: ''
        },
        patientProfilePercentage: 100
    },
    profileImgData: {
        image: ''
    },
    vitalDetails: {
        phoneNumber:3245345345,
        emergencyContact:3456345345345,
        gender:{
            genderName:'sdfdsf'
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getPatientVitals: jest.fn(),
    updatePatientVitals:jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <VitalDetails dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("VitalDetails", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <VitalDetails dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VitalDetails form body', () => {
        expect(wrapper).toBeDefined()
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the onSubmit', () => {
        shallowWrapper.setState({
            height :''
        })
        shallowWrapper.instance().onSubmit();
    });

    it('Check the onSubmit', () => {
        shallowWrapper.setState({
            height :456,
            heightInvalid :false,
            weight: 456,
            phoneNumber: 45645645645645,
            weightInvalid : false,
            phoneNumberInvalid: false
        })
        shallowWrapper.instance().onSubmit();
    });

    it('Check maptoprops', () => {        
        const initialState = {
            patientProfileState: {
                vitalDetails: {}
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPatientVitals();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 