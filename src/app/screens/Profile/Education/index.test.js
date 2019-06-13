import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Education } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    educationList: [],
    educationalDetails: {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: ''
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getEducation: jest.fn(),
    addEducation: jest.fn(),
    editEducation: jest.fn(),
    updateEducation: jest.fn(),
    deleteEducation: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Education dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("Education", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Education dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Education form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

     it('Check the toggleEducation', () => {
        shallowWrapper.instance().toggleEducation();
    });

     it('Check the checkValidation true', () => {
        shallowWrapper.instance().checkValidation(true, 'SAIT', 'BE', 'CSE', '04-22-2019', '04-23-2019');
    });

     it('Check the checkValidation false', () => {
        shallowWrapper.instance().checkValidation(true, '', '', '', '', '');
    });

     it('Check the addEducation', () => {
        shallowWrapper.instance().addEducation();
    });

     it('Check the showModalOnDelete', () => {
        shallowWrapper.instance().showModalOnDelete({ target: { id: 1 } });
    });

     it('Check the editEducation', () => {
        shallowWrapper.instance().editEducation({ target: { id: 1 } });
    });

     it('Check the updateEducation', () => {
        shallowWrapper.instance().updateEducation();
    });

     it('Check the deleteEducation', () => {
        shallowWrapper.instance().deleteEducation();
    });

     it('Check the YearList', () => {
        shallowWrapper.instance().YearList();
    });

     it('Check the YearListCal', () => {
        shallowWrapper.instance().YearListCal();
    });

     it('Check the selectChange', () => {
        shallowWrapper.instance().selectChange({ target: { id: 1, value: 1 } });
    });

     it('Check the selectToYearChange', () => {
        shallowWrapper.instance().selectToYearChange({ target: { id: 1, value: 1 } });
    });

 }); 