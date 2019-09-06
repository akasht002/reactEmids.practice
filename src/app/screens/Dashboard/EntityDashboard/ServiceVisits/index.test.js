import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { ServiceVisits } from './index';

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
    getVisitServiceCountList: jest.fn(),
    getVisitServiceTableList: jest.fn(),
    getServiceRequestVisitStatus: jest.fn(),
    getServiceType: jest.fn(),
    clearServiceTypes: jest.fn(),
    clearRequestStatus: jest.fn(),
    impersinateIndividual: jest.fn(),
    getServiceProviderVisitStatus: jest.fn(),
    getServiceRequestId: jest.fn(),
    goToVisitServiceDetails: jest.fn(),
    setTab: jest.fn(),
    setActiveSubTab: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    setPatient: jest.fn(),
    setActiveTab: jest.fn(),
    visitServiceTableList: [],
    dashboardState: {
        VisitServiceCountListState: {
            visitServiceCountList: [],
            visitServiceTableList: [],
            serviceType: [],
            activeSubTab: 1
        }
    },
    serviceCategory: [{
        serviceCategoryDescription: 'sdfsdf',
        serviceCategoryId: 1
    }],
    serviceType: [{
        serviceTypeId: 1
    }],
    activeSubTab: 'LowTask'
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceVisits dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("ServiceVisits", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <ServiceVisits dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceVisitis section', () => {
        expect(wrapper.find('.parent-fullblock').length).toEqual(1);
    });

    it('Check the componentDidMount function', () => {
        shallowWrapper.setProps({
            activeSubTab: '',
            visitServiceTableList: [{
                serviceRequestId: 1,
                serviceRequestVisitId: 23,
                serviceCategoryDescription: 'sdfsddgs',
                patientName: 'Akash',
                statusName: 'Open',
                schedule: '02-12-2019',
                totalTask: 50,
                providerName: 'Girish',
                
            }]
        })
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the componentWillReceiveProps function', () => {
        shallowWrapper.setProps({
            activeSubTab: '',
            fromDate: '03/24/2019',
            toDate: '04/24/2019'
        })
        const nextProps = {
            visitServiceTableList: [{
                dataCount: 20
            }],
            fromDate: '04/24/2019',
            toDate: '05/24/2019'
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
        shallowWrapper.setProps({
            activeSubTab: 'LowTask',
            fromDate: '03/24/2019',
            toDate: '04/24/2019'
        })
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the getTable function', () => {
        const e = {
            target: {
                value: 'Open'
            }
        }
        shallowWrapper.setProps({
            visitServiceCountList: [
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

    it('Check the pageNumberChange function', () => {
        shallowWrapper.setState({
            pageSize: 10,
            rowCount: 5
        })
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().pageNumberChange(1)
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the impersinateServiceVisit function', () => {
        const data = {
            serviceRequestId: 15
        }
        shallowWrapper.instance().impersinateServiceVisit(data)
    });

    it('Check the pageSizeChange function', () => {
        shallowWrapper.setState({
            rowCount: 5
        })
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().pageSizeChange(10)
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().pageSizeChange(10)
    });

})