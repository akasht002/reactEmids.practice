import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Languages, mapDispatchToProps, mapStateToProps } from './index.js';

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    selectedLanguagesList: {
        languages: [{ id: '1', name: 'TEST' }]
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getSelectedLanguages: jest.fn()
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

    it('Check the Empty languageList', () => {
        shallowWrapper.setProps({ selectedLanguagesList: [] })
    });

    it('Check the languageList', () => {
        shallowWrapper.setProps({
            selectedLanguagesList: {
                languages: [{ id: '1', name: 'TEST' }]
            }
        })
    });

    it('Check maptoprops', () => {
        const initialState = {
            patientProfileState:
            {
                languageList: []
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps getSelectedLanguages', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getSelectedLanguages();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 