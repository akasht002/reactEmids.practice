import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { PersonalDetail } from './index.js';

 jest.mock('../../../components', () => ({
    ScreenCover: 'mockScreenCover'
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    personalDetail: [],
    updatePersonalDetailSuccess: false,
    cityDetail: [],
    imageData: '',
    genderList: [],
    affiliationList: [],
    spBusyInVisit: null,
    sbModeClicked: false,
    serviceProviderId: null,
    isUser: true,
    serviceProviderTypeId: 0,
    isEntityServiceProvider: false,
    entityId: null,
    profileState: {
        PersonalDetailState: {
            personalDetail: [],
            updatePersonalDetailSuccess: false,
            cityDetail: [],
            imageData: '',
            genderList: [],
            affiliationList: [],
            spBusyInVisit: null,
            sbModeClicked: false,
            serviceProviderId: null,
            isUser: true,
            serviceProviderTypeId: 0,
            isEntityServiceProvider: false,
            entityId: null
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getPersonalDetail: jest.fn(),
    getAffiliationDetail: jest.fn(),
    updatePersonalDetail: jest.fn(),
    getCityDetail: jest.fn(),
    uploadImg: jest.fn(),
    getImage: jest.fn(),
    getGender: jest.fn()
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

 describe("PersonalDetail", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <PersonalDetail dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the handleChange', () => {
        shallowWrapper.instance().handleChange();
    });

     it('Check the reUpload', () => {
        shallowWrapper.instance().reUpload({ target: { files: 1 } });
    });

     it('Check the onSubmit', () => {
        shallowWrapper.instance().onSubmit();
    });

     it('Check the closeImageUpload', () => {
        shallowWrapper.instance().closeImageUpload();
    });

     it('Check the resetImage', () => {
        shallowWrapper.instance().resetImage();
    });

     it('Check the saveImageUpload', () => {
        shallowWrapper.instance().saveImageUpload();
    });

     it('Check the togglePersonalDetails', () => {
        shallowWrapper.instance().togglePersonalDetails();
    });

     it('Check the checkAffiliationValue true', () => {
        shallowWrapper.instance().checkAffiliationValue('TEST');
    });

     it('Check the checkAffiliationValue false', () => {
        shallowWrapper.instance().checkAffiliationValue('');
    });

     it('Check the textChangeContactNumber', () => {
        shallowWrapper.instance().textChangeContactNumber({ target: { value: 1 } });
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

 }); 