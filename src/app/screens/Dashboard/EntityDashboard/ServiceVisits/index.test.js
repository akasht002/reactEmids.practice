import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ServiceVisits, mapDispatchToProps, mapStateToProps } from './index';

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

let store;
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
    activeSubTab: 'LowTask',
    getServiceRequestStatus: jest.fn(),
    setActiveStatusForAllTab: jest.fn(),
    setImpersinated: jest.fn(),
    setServiceCategory: jest.fn(),
    setServicePlanVisitId: jest.fn(),
    setServiceType: jest.fn(),
    setEntityDashboard: jest.fn(),
    serviceTypeIds: [1,2,3],
    setVisitDate: jest.fn(),
    serviceRequestStatus: [2,4,6],
    checkServiceRequestStatus: jest.fn(),
    setServiceRequestStatus: jest.fn(),
    checkServiceType: jest.fn(),
    setFilterApplied: jest.fn(),
    resetFilter: jest.fn()
};

store = mockStore(defaultState);

describe("ServiceVisits", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ServiceVisits dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceVisitis section', () => {
        expect(shallowWrapper.find('.parent-fullblock').length).toEqual(1);
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

    
    it('Check the componentDidUpdate  function', () => {
        let prevProps = {
            rowCount: 10,
            fromDate: '11/12/2019'
        }
        shallowWrapper.setState({
            rowCount: 20,
            pageSize: 20
        })
        shallowWrapper.setProps({
            paginationCount: 10
        })
        shallowWrapper.instance().componentDidUpdate(prevProps)
        prevProps.rowCount = 20
        shallowWrapper.instance().componentDidUpdate(prevProps)
        shallowWrapper.setProps({
            fromDate: '10/11/2020'
        })
        shallowWrapper.instance().componentDidUpdate(prevProps)
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

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });
    
    it('Check the handleServiceRequestStatus function', () => {
        const item = {
            id: 15
        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
    });

    it('Check the handleChangeServiceCategory function', () => {
        const selectedOption  = {
            value: 'sadsa'
        }
        shallowWrapper.instance().handleChangeServiceCategory(selectedOption)
    });

    it('Check the handleServiceType  function', () => {
        const item = {
            serviceTypeId: 15
        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceType(item, e)
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the handleSearchData function', () => {
        let e = {
            preventDefault() {}
        }
        shallowWrapper.instance().handleSearchData(e)
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
        shallowWrapper.setProps({
            isImpersinated: true
        })
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the onSuccess function', () => {
        shallowWrapper.instance().onSuccess()
    });

    it('Check the handleSearchkeyword function', () => {
        shallowWrapper.instance().handleSearchkeyword({target:{value: 'sdassd'}})
    });

    it('Check the getHeaderBasedOnStatus function', () => {
        shallowWrapper.instance().getHeaderBasedOnStatus('LowTaskCompletions')
        shallowWrapper.instance().getHeaderBasedOnStatus('Cancelled')
        shallowWrapper.instance().getHeaderBasedOnStatus('LowRating')
        shallowWrapper.instance().getHeaderBasedOnStatus('Overdue')
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            dashboardState: {
                VisitServiceCountListState: {
                    visitServiceTableList: [],
                    attributedProviders: [],
                    paginationCount: 0,
                    states: [],
                    isLoaded: true,
                    activeSubTab: 1,
                    ServiceCategory: [],
                    visitServiceCountList: [],
                    isLoadingFeedbackList: true,
                    savedPaginationNumber: 12,
                    serviceRequestStatusList: [],
                    genderId: 1,
                    filterApplied: true,
                    memberContractId: 12,
                    minExperience: 20,
                    scheduleType: [],
                    activeTab: 1,
                    typeList: [],
                    isImpersinated: true,
                    serviceTypeIds: [],
                    scheduleTypes: [],
                    selectedOption: null,
                    serviceRequestStatus: []
                },
                individualsListState: {
                    genderType: []
                },
                VisitServiceRequestState: {
                    serviceRequestStatusList: []
                }
            },
            visitSelectionState: {
                ServiceRequestFilterState: {
                    ServiceCategory: []
                }    
            },
            visitHistoryState: {
                vistServiceHistoryState: {
                    typeList: []
                }
            },
            serviceRequestStatusList: {
                serviceRequestStatusList: []
            },
            authState: {
                userState: {
                    userData: {
                        userInfo: {}
                    }
                }
            }
        };
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitServiceCountList({}, true, ()=>{});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceTableList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToVisitServiceDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveSubTab(2);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveTab('1');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(21);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestStatus();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveStatusForAllTab('All');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearRequestStatus([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearServiceTypes([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceCategory();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setImpersinated(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceCategory([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).checkServiceType([{isChecked: true, serviceTypeId: 1}], 1, true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceType([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setFilterApplied(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).checkServiceRequestStatus([{isChecked: true, id: 1}], 1, true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceRequestStatus([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).resetFilter();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServicePlanVisitId(122);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setVisitDate('11/12/2019');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setEntityDashboard(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})