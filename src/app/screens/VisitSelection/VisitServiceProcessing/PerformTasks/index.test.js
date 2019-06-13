import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

 import { PerformTasks } from './index.js';

 jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

 jest.mock('../../../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

 Enzyme.configure({ adapter: new Adapter() })

 let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    PerformTasksList: [],
    visitSelectionState: {
        VisitServiceProcessingState: {
            PerformTasksState: {
                PerformTasksList: []
            }
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getPerformTasksList: jest.fn(),
    addPerformedTask: jest.fn(),
    getSummaryDetails: jest.fn(),
    startOrStopService: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    push: jest.fn(),
    history: {
        push: jest.fn()
    }
}

 store = mockStore(defaultState);

 const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PerformTasks dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

 describe("PerformTasks", function () {
    let wrapper, shallowWrapper;

     beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <PerformTasks dispatch={dispatch} store={store} {...defaultState} />
        )
    });

     it('Check the Perform Task form body', () => {
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

     it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
        expect(shallowWrapper.instance().state.isOpen).toEqual(true);
    });

     it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

     it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile(1);
    });

     it('Check the handleChange', () => {
        shallowWrapper.instance().handleChange('', { target: { checked: true } });
    });

     it('Check the startService', () => {
        shallowWrapper.instance().startService(1, 2);
    });

     it('Check the onClickNext', () => {
        shallowWrapper.instance().onClickNext();
    });

     it('Check the saveData', () => {
        shallowWrapper.instance().saveData(true);
    });

 }); 