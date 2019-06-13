import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { WorkHistory } from './index.js';

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    workhistoryList: [],
    workhistoyFieldDetails: {
        designation: '',
        company: '',
        location: '',
        fromDate: '',
        toDate: '',
        description: '',
        isWorking: '',
        currentlyWorking: ''
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getWorkHistory: jest.fn(),
    addWorkHistory: jest.fn(),
    editWorkHistory: jest.fn(),
    updateWorkHistory: jest.fn(),
    deleteWorkHistory: jest.fn()
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <WorkHistory dispatch={dispatch} store={store} {...props} />
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
            <WorkHistory dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Certification form body', () => {
        expect(wrapper.find('.SPCardTitle').length).toEqual(1);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

     it('Check the toggleWorkHistory', () => {
        shallowWrapper.instance().toggleWorkHistory();
    });

     it('Check the checkValidation true', () => {
        shallowWrapper.instance().checkValidation(true, 'SE', 'EMIDS', 'BLORE', '04-23-2019', '04-23-2019', 'UTC');
    });

     it('Check the checkValidation false', () => {
        shallowWrapper.instance().checkValidation(true, '', '', '', '', '', '');
    });

     it('Check the addWorkhistory', () => {
        shallowWrapper.instance().addWorkhistory();
    });

     it('Check the isOnDeleteModalOpen', () => {
        shallowWrapper.instance().isOnDeleteModalOpen({ target: { id: 1 } });
    });

     it('Check the editWorkHistory', () => {
        shallowWrapper.instance().editWorkHistory({ target: { id: 1 } });
    });

     it('Check the updateWorkHistory', () => {
        shallowWrapper.instance().updateWorkHistory();
    });

     it('Check the deleteWorkHistory', () => {
        shallowWrapper.instance().deleteWorkHistory();
    });

     it('Check the dateChanged', () => {
        shallowWrapper.instance().dateChanged('04-23-2019');
    });

     it('Check the dateChangedRaw', () => {
        const e = {
            target: { value: '04-23-2019' }
        }
        shallowWrapper.instance().dateChangedRaw(e);
    });

     it('Check the todateChanged', () => {
        shallowWrapper.instance().todateChanged('04-23-2019');
    });

     it('Check the todateChangedRaw', () => {
        const e = {
            target: { value: '04-23-2019' }
        }
        shallowWrapper.instance().todateChangedRaw(e);
    });
}); 