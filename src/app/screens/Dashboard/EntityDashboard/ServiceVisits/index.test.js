import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { ServiceVisits } from './index';

jest.mock('../StatCard', () => ({
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
    // serviceCategory: [],
    // serviceType: [],
    // serviceRequestStatusList: [],
    visitServiceTableList: [],
    careteamDashboard: {
        VisitServiceCountListState: {
            visitServiceCountList: [],
            visitServiceTableList: [],
            serviceType: [],
            activeSubTab: 1
        }
    },
    servicerequestState: {
        requirementsState: {
            requirementList: [],
            serviceRequestStatus: []
        }
    },
    spSearchState: {
        FilterState: {
            serviceType: []
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
        expect(wrapper.find('.CTDashboardTabContent').length).toEqual(1);
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

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
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

    it('Check the handleServiceRequestStatus function', () => {
        const item = {
            id: 12
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
    });

    it('Check the handleserviceType function', () => {
        const item = {
            id: 12
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleserviceType(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleserviceType(item, e)
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().applyFilter()
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().applyFilter()
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the handleChangeServiceCategory function', () => {
        shallowWrapper.instance().handleChangeServiceCategory({})
    });

    it('Check the applyReset function', () => {
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().applyReset()
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().applyReset()
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

    it('Check the impersinateIndividual function', () => {
        const data = {
            serviceRequestId: 15
        }
        shallowWrapper.instance().impersinateIndividual(data)
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

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the handleSearchkeyword function', () => {
        const e = {
            target: {
                value: 'zsdasd'
            }
        }
        shallowWrapper.instance().handleSearchkeyword(e)
    });

    it('Check the handleSearchkeywordPress function', () => {
        const event = {
            charCode: 13
        }
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().handleSearchkeywordPress(event)
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().handleSearchkeywordPress(event)
        event.charCode = 0
        shallowWrapper.instance().handleSearchkeywordPress(event)
    });

    it('Check the handleSearchData function', () => {
        const event = {
            preventDefault() {}
        }
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().handleSearchData(event)
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().handleSearchData(event)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.setProps({
            activeSubTab: ''
        })
        shallowWrapper.instance().closeSearch()
        shallowWrapper.setProps({
            activeSubTab: 'LowTask'
        })
        shallowWrapper.instance().closeSearch()
    });

    it('Check the onSortedChange function', () => {
        const value = [
            {
                desc: 'desc',
                id: 1
            },
            {
                asc: 'asc',
                id: 2
            }
        ]
        shallowWrapper.instance().onSortedChange(value)
    });

    it('Check the getServicesTypeId function', () => {
        shallowWrapper.instance().getServicesTypeId()
    });
})