import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Individuals, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        careTeamId: 12
    })
}))

jest.mock('../../../../utils/comparerUtility', () => ({
    caseInsensitiveComparer: () => ({
        str1: 'Feedback',
        str2: 'Feedback'
    })
}))

jest.mock('../Components/Grid/Grid', () => ({
    Grid: 'mockGrid'
}))

jest.mock('../Components/StatCard', () => ({
    StatCard: 'mockStatCard'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    dashboardState: {
        individualsListState: {
            individualsList: [],
            individualsVisitList: [],
            attributedProviders: [],
            cohorts: [],
            contracts: [],
            paginationCount: 0,
            states: [],
            isLoaded: true,
            activeSubTab: 1,
            individualsFeedbackList: [{
                pageCount: 12
            }]
        }
    },
    spSearchState: {
        FilterState: {
            getServiceArea: [],
            genderType: [],
            skillType: [],
            clincalCondition: []
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getIndividualsCountList: jest.fn(),
    getIndividualsList: jest.fn(),
    getServiceArea: jest.fn(),
    getGender: jest.fn(),
    getSkill: jest.fn(),
    getClinicalCondition: jest.fn(),
    getAttributedProviders: jest.fn(),
    getAllCohorts: jest.fn(),
    getAllContracts: jest.fn(),
    clearClinicalCondition: jest.fn(),
    clearGenderType: jest.fn(),
    resetFilter: jest.fn(),
    impersinateIndividual: jest.fn(),
    createNewConversation: jest.fn(),
    createVideoConference: jest.fn(),
    getStates: jest.fn(),
    clearState: jest.fn(),
    setActiveSubTab: jest.fn(),
    impersinateCareTeamIndividual: jest.fn(),
    createDataStore: jest.fn(),
    setContext: jest.fn(),
    individualsCountList: [{
        statusName: 'Open',
        totalCount: 40
    }],
    individualsList: [{
        statusName: 'Open',
        dataCount: 40,
        contracts: [{
            contractName: 'adasd'
        }],
        gender: 'Others'
    }],
    individualsVisitList: [],
    attributedProviders: [],
    cohorts: [],
    contracts: [],
    serviceAreaList: [],
    genderType: [],
    skillType: [],
    clinicalConditionList: [],
    loggedInUser: [],
    paginationCount: 0,
    states: [],
    isLoaded: false,
    activeSubTab: 1,
    replace: jest.fn(),
    savePaginationNumber: jest.fn(),
    getIndividualsFeedbackList: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    individualsFeedbackList: [{
        pageCount: 12
    }],
    setActiveStatusForAllTab: jest.fn(),
    setServiceProviderFeedbackTab: jest.fn(),
    setGenderId: jest.fn(),
    setAgeRange: jest.fn(),
    isImpersinated: false,
    setPatient: jest.fn(),
    setClinicalConditions: jest.fn(),
    setMemberContractId: jest.fn(),
    setImpersinated: jest.fn(),
    getServiceRequestId: jest.fn(),
    goToVisitServiceDetails: jest.fn(),
    setActiveTab: jest.fn(),
    setEntityDashboard: jest.fn(),
    setVisitDate: jest.fn(),
    checkClinicalCondition: jest.fn()
};

store = mockStore(defaultState);

describe("Individuals", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Individuals dispatch={dispatch} store={store} {...defaultState} />
        )
    });
    it('Check the individuals section', () => {
        expect(shallowWrapper.find('.parent-fullblock').length).toEqual(1);
    });

    it('Check the getTable function', () => {
        const e = {
            target: {
                value: 'Open'
            }
        }
        shallowWrapper.setProps({
            individualsCountList: [
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

    it('Check the pageNumberChangeFeedback function', () => {
        shallowWrapper.instance().pageNumberChangeFeedback(1)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the toggleFeedbackAlert  function', () => {
        shallowWrapper.instance().toggleFeedbackAlert()
    });

    it('Check the toggleFilter  function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the impersinateIndividual  function', () => {
        let data = {
            patientId: 12   
        }
        shallowWrapper.setState({
            status: 'Visit'
        })
        shallowWrapper.instance().impersinateIndividual(data)
    });

    it('Check the handleClinicalConditions  function', () => {
        let item = {
            attributeId: 12   
        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleClinicalConditions(item, e)
    });

    it('Check the handleContracts  function', () => {
        let data = {
            membershipName: 'asd',
            membershipId: 12313
        }
        shallowWrapper.instance().handleContracts(data)
    });

    it('Check the onChangeSlider  function', () => {
        let data = {
            min: 10,
            max: 50
        }
        shallowWrapper.instance().onChangeSlider(data)
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

    it('Check the handleGenderType  function', () => {
        let data = {
            name: 'male',
            id: 1
        }
        shallowWrapper.instance().handleGenderType(data)
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the applyReset  function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the toggleFeedbacAlert  function', () => {
        shallowWrapper.instance().toggleFeedbacAlert()
    });

    it('Check the goToPgVisitSummary function', () => {
        let data = {
            servicePlanVisitId: 12
        }
        shallowWrapper.instance().goToPgVisitSummary(data)
    });

    it('Check the handleSearchData function', () => {
        let e = {
            preventDefault () {}
        }
        shallowWrapper.instance().handleSearchData(e)
    });

    it('Check the handleSearchkeyword function', () => {
        shallowWrapper.instance().handleSearchkeyword({e:{target:{value:'sfddsf'}}})
    });

    it('Check the toggleSearch function', () => {
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the getHeaderBasedOnStatus function', () => {
        shallowWrapper.instance().getHeaderBasedOnStatus('Feedback')
        shallowWrapper.instance().getHeaderBasedOnStatus('Visit')
        shallowWrapper.instance().getHeaderBasedOnStatus('')
    });

    it('Check the goToPgVisitSummary function', () => {
        shallowWrapper.instance().goToPgVisitSummary({
            data: {
                serviceRequestVisitId: 123
            }
        })
    });

    it('Check the getFilterData function', () => {
        let data = {
            state: {
                memberContractId: 12,
                cohorts: [],
                attributedProviders: [],
                clinicalConditions: [],
                ageRange: {
                    isChanged: true
                },
                genderId: 12,
                street: 'dzdzd',
                stateName: 'czcsz',
                zip: '123123'
            },
            resetFilter: false
        }
        shallowWrapper.instance().getFilterData(data)
        data.resetFilter = true
        shallowWrapper.instance().getFilterData(data)
    });

    it('Check mapStateToProps', () => {
        const initialState = {
            dashboardState: {
                individualsListState: {
                    individualsList: [],
                    individualsVisitList: [],
                    attributedProviders: [],
                    cohorts: [],
                    contracts: [],
                    paginationCount: 0,
                    states: [],
                    isLoaded: true,
                    activeSubTab: 1,
                    individualsFeedbackList: [],
                    individualsCountList: [],
                    isLoadingFeedbackList: true,
                    savedPaginationNumber: 12,
                    genderType: [],
                    genderId: 1,
                    filterApplied: true,
                    memberContractId: 12,
                    ageRange: {},
                    clinicalConditions: [],
                    activeTab: 1,
                    isImpersinated: true
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
        mapDispatchToProps(dispatch).getIndividualsCountList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getIndividualsList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveSubTab('1');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).savePaginationNumber({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveStatusForAllTab({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveTab(1);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToVisitServiceDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getIndividualsFeedbackList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getClinicalCondition();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAllContracts();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearClinicalCondition([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getGender();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearGenderType([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).resetContracts([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearStates();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setVisitDate({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setEntityDashboard(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceProviderFeedbackTab(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setGenderId(6);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setFilterApplied(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setMemberContractId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setClinicalConditions({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).checkClinicalCondition([{isChecked: true, attributeId: 1}], 1, true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setImpersinated(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).resetFilter();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setAgeRange({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})