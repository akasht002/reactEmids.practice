import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';

import { ClinicalCondition } from './index'

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    ClinicalConditionList: [],
    selectedClinicalConditionList:[],
    selectedClinicalConditionsList:[],
    profileState:{        
        progressIndicatorState:0,
        PersonalDetailState:{
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: [],
            genderDetail: [],
            imageData: '',
            patientId: null,
            userId: null,
            userType: '',
            isUser: false
        }
    },
    userState:{
        isUser:false
    },
    getClinicalCondition: jest.fn(),
    getSelectedClinicalCondition:jest.fn(),
    addClinicalCondition: jest.fn()
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ClinicalCondition dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("ClinicalCondition", function () {
    let wrapper, shallowWrapper;
    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <ClinicalCondition dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the table body', () => {
        expect(wrapper.find('.col-md-12 card CardWidget SPSkills').length).toEqual(0);
    });

    it('Check the componentWillReceiveProps  function', () => {
        const nextProps = {
            selectedClinicalConditionsList: [{
                attributeId: 1
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the toggleSkills  function', () => {
        shallowWrapper.instance().toggleSkills()
    });

    it('Check the onChangeLanguage  function', () => {
        shallowWrapper.instance().onChangeLanguage(9)
    });

    it('Check the addSkills  function', () => {
        shallowWrapper.instance().addSkills()
    });

    it('Check the editSkills  function', () => {
        shallowWrapper.instance().editSkills()
    });

    it('Check the updateSkills  function', () => {
        shallowWrapper.instance().updateSkills()
    });

    it('Check the reset  function', () => {
        shallowWrapper.instance().reset()
    });

});