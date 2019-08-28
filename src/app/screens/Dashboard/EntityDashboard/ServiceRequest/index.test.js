import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { ServiceRequest } from './index';

jest.mock('../Components/Grid/Grid', () => ({
    Grid: 'mockGrid'
}))

jest.mock('../Components/StatCard', () => ({
    StatCard: 'mockStatCard'
}))

jest.mock('../../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        careTeamId: 12
    })
}))


Enzyme.configure({ adapter: new Adapter() })

let wrapper, store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    getServiceCategory: jest.fn(),
    getServiceRequestCountList: jest.fn(),
    getServiceRequestTableList: jest.fn(),
    getServiceRequestStatus: jest.fn(),
    getServiceType: jest.fn(),
    clearServiceTypes: jest.fn(),
    clearRequestStatus: jest.fn(),
    getScheduleType: jest.fn(),
    clearScheduleType: jest.fn(),
    getServiceRequestDetails: jest.fn(),
    getDiagnosisCode: jest.fn(),
    postDiagnosisCode: jest.fn(),
    impersinateIndividual: jest.fn(),
    getDiagnosisCodeText: jest.fn(),
    getServiceRequestId: jest.fn(),
    goToVisitServiceDetails: jest.fn(),
    setTab: jest.fn(),
    getStates: jest.fn(),
    setActiveSubTab: jest.fn(),
    visitServiceRequestTableList: [],
    serviceCategory: [],
    serviceType: [],
    serviceRequestStatusList: [],
    careteamDashboard: {
        VisitServiceRequestState: {
            visitServiceRequestCountList: [],
            visitServiceRequestTableList: [],
            serviceRequestStatusList: [],
            scheduleType: [],
            requestDetails: [],
            diagnosisCode: [],
            paginationCount: 0,
            activeSubTab: 1
        }
    },
    servicerequestState: {
        requirementsState: {
            requirementList: []
        }
    },
    spSearchState: {
        FilterState: {
            serviceType: []
        }
    }
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceRequest dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("ServiceRequest", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <ServiceRequest dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequest section', () => {
        expect(wrapper.find('.parent-fullblock').length).toEqual(1);
    });

    it('Check the getTable function', () => {
        const e = {
            target: {
                value: 'Open'
            }
        }
        shallowWrapper.setProps({
            visitServiceRequestCountList: [
                {
                    totalCount: 40,
                    statusName: 'Open'
                }
            ]
        })
        shallowWrapper.setState({
            pageSize: 50
        })
        shallowWrapper.instance().getTable(e)
        shallowWrapper.setState({
            pageSize: 30
        })
        shallowWrapper.instance().getTable(e)
    });

    it('Check the componentDidUpdate function', () => {
        shallowWrapper.setProps({
            fromDate: '03/24/2019',
            toDate: '04/24/2019',
            visitServiceRequestTableList: [{
                dataCount: 32
            }]
        })
        shallowWrapper.instance().componentDidUpdate({}, {})
    });

    it('Check the pageNumberChange function', () => {
        shallowWrapper.setState({
            pageSize: 10,
            rowCount: 5
        })
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the pageSizeChange function', () => {
        shallowWrapper.setState({
            rowCount: 5
        })
        shallowWrapper.instance().pageSizeChange(10)
    });
})