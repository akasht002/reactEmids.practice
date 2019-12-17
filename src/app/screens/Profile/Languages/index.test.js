import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { Languages } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    LanguagesList: [],
    selectedLanguagesList: [],
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getLanguages: jest.fn(),
    getSelectedLanguages: jest.fn(),
    addLanguages: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Languages dispatch={dispatch} store={store} {...props} />
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
            <Languages dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Languages form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

     it('Check the toggleLanguages', () => {
        shallowWrapper.instance().toggleLanguages();
    });

     it('Check the onChangeLanguage', () => {
        shallowWrapper.instance().onChangeLanguage('TEST');
    });

     it('Check the addLanguages', () => {
        shallowWrapper.instance().addLanguages();
    });

     it('Check the editLanguages', () => {
        shallowWrapper.instance().editLanguages();
    });

     it('Check the updateLanguages', () => {
        shallowWrapper.instance().updateLanguages();
    });

 }); 