import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Skills } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    SkillsList: [],
    selectedSkillsList: [],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getSkills: jest.fn(),
    getSelectedSkills: jest.fn(),
    addSkills: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Skills dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("Certification", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Skills dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Skills form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

     it('Check the toggleSkills', () => {
        shallowWrapper.instance().toggleSkills();
    });

     it('Check the onChangeLanguage', () => {
        shallowWrapper.instance().onChangeLanguage('TEST');
    });

     it('Check the addSkills', () => {
        shallowWrapper.instance().addSkills();
    });

     it('Check the editSkills', () => {
        shallowWrapper.instance().editSkills();
    });

     it('Check the updateSkills', () => {
        shallowWrapper.instance().updateSkills();
    });

 }); 