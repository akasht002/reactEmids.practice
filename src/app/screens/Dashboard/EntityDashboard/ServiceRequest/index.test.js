import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { ServiceRequest, mapDispatchToProps, mapStateToProps } from './index';

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
    },
    setPatient: jest.fn(),
    setActiveTab: jest.fn(),
    setImpersinated: jest.fn(),
    setServiceCategory: jest.fn(),
    setServiceType: jest.fn(),
    resetFilter: jest.fn(),
    setActiveStatusForAllTab: jest.fn(),
    checkServiceType: jest.fn(),
    checkServiceRequestStatus: jest.fn(),
    setServiceRequestStatus: jest.fn(),
    serviceTypeIds: [1,2,3],
    serviceRequestStatus: [2,4,6],
    setFilterApplied: jest.fn()
};

store = mockStore(defaultState);

describe("ServiceRequest", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <ServiceRequest dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the ServiceRequest section', () => {
        expect(shallowWrapper.find('.parent-fullblock').length).toEqual(1);
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

    it('Check the impersinateServiceRequest function', () => {
        let data ={
            serviceRequestId: 12
        }
        shallowWrapper.instance().impersinateServiceRequest(data)
    });
    
    it('Check the handleChangeServiceCategory function', () => {
        let selectedOption ={
            value: 12
        }
        shallowWrapper.instance().handleChangeServiceCategory(selectedOption)
    });

    it('Check the handleScheduleType function', () => {
        let item ={
            id: 32
        }
        shallowWrapper.instance().handleScheduleType(item, {})
    });

    it('Check the handleServiceType function', () => {
        let item ={
            serviceTypeId: 32
        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceType(item, e)
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });
    
    it('Check the handleServiceRequestStatus function', () => {
        let item ={
            id: 32
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleServiceRequestStatus(item, e)
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the handleSearchData function', () => {
        let e = {
            preventDefault() {}  
        }
        shallowWrapper.instance().handleSearchData(e)
    });

    it('Check the handleSearchkeyword function', () => {
        let e = {
            target: {
                value: 'asdasd'
            }  
        }
        shallowWrapper.instance().handleSearchkeyword(e)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
        shallowWrapper.setProps({
            isImpersinated: true
        })
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the getHeaderBasedOnStatus function', () => {
        shallowWrapper.instance().getHeaderBasedOnStatus('Open')
        shallowWrapper.instance().getHeaderBasedOnStatus('Cancelled')
        shallowWrapper.instance().getHeaderBasedOnStatus('LowRating')
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            dashboardState: {
                VisitServiceRequestState: {
                    visitServiceRequestTableList: [],
                    attributedProviders: [],
                    paginationCount: 0,
                    states: [],
                    isLoaded: true,
                    activeSubTab: 1,
                    ServiceCategory: [],
                    visitServiceRequestCountList: [],
                    isLoadingFeedbackList: true,
                    savedPaginationNumber: 12,
                    serviceRequestStatus: [],
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
                    selectedOption: null
                },
                individualsListState: {
                    genderType: []
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
        mapDispatchToProps(dispatch).getServiceRequestCountList({}, true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestTableList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveSubTab(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveTab(2);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(21);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearServiceTypes([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveStatusForAllTab('All');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceCategory();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getScheduleType();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestStatus();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearRequestStatus([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearScheduleType([]);
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
        mapDispatchToProps(dispatch).setScheduleType([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setImpersinated(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceCategory([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToVisitServiceDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});