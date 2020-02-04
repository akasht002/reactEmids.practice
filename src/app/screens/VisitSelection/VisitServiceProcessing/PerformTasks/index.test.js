import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { PerformTasks, mapDispatchToProps, mapStateToProps } from './index.js';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    }),
}))

jest.mock('../../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
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
    },
    SummaryDetails: {
        originalTotalDuration: 500
    },
    isLoading: true,
    goBack: jest.fn()
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
        shallowWrapper.setProps({
            PerformTasksList: {
                serviceRequestTypeVisits: [{
                    serviceRequestTypeTaskVisits: [{
                        serviceTypeId: 123,
                        checked: true,
                        statusId: 90
                    }],
                    collapse: true
                }]
            }
        })
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
        expect(shallowWrapper.instance().state.isOpen).toEqual(true);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            ServiceRequestVisitId: 21321,
            PerformTasksList: {
                visitStatus: "COMPLETED",
                serviceRequestTypeVisits: []
            }
        })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            PerformTasksList: {
                serviceRequestTypeVisits: [{
                    serviceRequestTypeTaskVisits: [{
                        statusId: 90,
                        checked: true
                    }]
                }]
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
        nextProps.PerformTasksList.serviceRequestTypeVisits = [{
            serviceRequestTypeTaskVisits: [{
                statusId: 80,
                checked: true
            }]
        }]
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile(1);
    });

    it('Check the handleChange', () => {
        shallowWrapper.instance().handleChange('', { target: { checked: true } });
        shallowWrapper.instance().handleChange('', { target: { checked: false } });
    });

    it('Check the startService', () => {
        shallowWrapper.instance().startService(1, 2);
        shallowWrapper.instance().startService(2, 2);
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setState({
            taskList: {
                totalTask: 20
            }
        })
        shallowWrapper.instance().checkedTask = [{}]
        shallowWrapper.instance().onClickNext();
        shallowWrapper.setState({
            taskList: {
                totalTask: 1
            }
        })
        shallowWrapper.instance().checkedTask = [{}]
        shallowWrapper.instance().onClickNext();
    });

    it('Check the saveData', () => {
        shallowWrapper.instance().saveData(true);
    });

    it('Check the events', () => {
        shallowWrapper.setState({
            taskList: {
                patient: {
                    patientId: 1213,
                    imageString: 'asdas/afasf/afs'
                }
            }
        })
        expect(shallowWrapper.find('.backProfileIcon').props().onClick());
        expect(shallowWrapper.find('.requestImageContent').props().onClick());
        expect(shallowWrapper.find('[test-endModal="test-endModal"]').props().onConfirm());
        expect(shallowWrapper.find('[test-proceedModal="test-proceedModal"]').props().onCancel());
        expect(shallowWrapper.find('[test-endModal="test-endModal"]').props().onCancel());
        expect(shallowWrapper.find('[test-proceedModal="test-proceedModal"]').props().onConfirm());
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            PerformTasksList: {
                visitStatus: "YET_TO_START"
            }
        })
        expect(shallowWrapper).toBeDefined();
    });

    
    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            PerformTasksList: {
                visitStatus: "IN_PROGRESS"
            }
        })
        expect(shallowWrapper).toBeDefined();
    });

    it('Check the mapDispatchToProps fn()', () => {
        let data = { serviceRequestTypeTaskVisits: [{ id: 1, name: 'test' }] }
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPerformTasksList(123, true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).addPerformedTask(
            data
            , 0);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSummaryDetails(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).startOrStopService({}, 12, 23);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(1000);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        // mapDispatchToProps(dispatch).goBack();
        // expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });


}); 