import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {ServiceProvider, mapDispatchToProps, mapStateToProps} from '../ServiceProvider/index';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        careTeamId: 12
    })
}))

jest.mock('../Components/Grid/Grid', () => ({
    Grid: 'mockGrid'
}))

jest.mock('../Components/StatCard', () => ({
    StatCard: 'mockStatCard'
}))
let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    dashboardState: {
        VisitServiceProviderState: {
            visitServiceProviderCountList: [],
            visitServiceProviderTableList: [],
            paginationCount: 0,
            activeSubTab: 1
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    servicerequestState: {
        schedulepreferencesState: {
            statesType: []
        }
    },
    feedbackServiceVisits: [{pageCount: 40}],
    visitServiceTableList: [],
    getVisitServiceProviderCountList: jest.fn(),
    getVisitServiceProviderTableList: jest.fn(),
    getServiceCategory: jest.fn(),
    getServiceType: jest.fn(),
    getServiceArea: jest.fn(),
    getGender: jest.fn(),
    getSkill: jest.fn(),
    createNewConversation: jest.fn(),
    createVideoConference: jest.fn(),
    getStates: jest.fn(),
    setServiceProvider: jest.fn(),
    goToSpProfile: jest.fn(),
    clearSkillTypes: jest.fn(),
    clearServiceTypes: jest.fn(),
    setActiveSubTab: jest.fn(),
    getPointofServicedata: jest.fn(),
    createDataStore: jest.fn(),
    getFeedbackAlertDetails: jest.fn(),
    savePaginationNumber: jest.fn(),
    setActiveStatusForAllTab: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    setESP: jest.fn(),
    goToESPProfile: jest.fn(),
    setExperience: jest.fn(),
    setGenderId: jest.fn(),
    setImpersinated: jest.fn(),
    setServiceProviderFeedbackTab: jest.fn(),
    saveScheduleType: jest.fn(),
    resetFilter: jest.fn(),
    setFilterApplied: jest.fn(),
    clearGenderType: jest.fn(),
    getAssessmentQuestionsList: jest.fn(),
}

store = mockStore(defaultState);

describe("ServiceProvider", function () {
    let shallowWrapper;
    shallowWrapper = shallow(
        <ServiceProvider dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the ServiceProvider section', () => {
        expect(shallowWrapper.find('.parent-fullblock').length).toEqual(1);
    });

    it('Check the getTable function', () => {
        const e = {
            target: {
                value: 'Open'
            }
        }
        shallowWrapper.setProps({
            visitServiceProviderCountList: [
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

    it('Check the pageSizeChange function', () => {
        shallowWrapper.setState({
            rowCount: 5
        })
        shallowWrapper.instance().pageSizeChange(10)
    });

    it('Check the pageNumberChangeFeedback function', () => {
        shallowWrapper.instance().pageNumberChangeFeedback(10)
    });

    it('Check the getHeaderBasedOnStatus function', () => {
        shallowWrapper.instance().getHeaderBasedOnStatus('Feedback')
        shallowWrapper.instance().getHeaderBasedOnStatus('Visit')
        shallowWrapper.instance().getHeaderBasedOnStatus('LowRating')
        shallowWrapper.instance().getHeaderBasedOnStatus('LowTaskCompletions')
    });

    it('Check the toggleFeedbackAlert function', () => {
        shallowWrapper.instance().toggleFeedbackAlert()
    });

    it('Check the goToSpVisitSummary function', () => {
        let data = {
            scheduleTypeId: 12
        }
        shallowWrapper.instance().goToSpVisitSummary(data)
        data.scheduleTypeId = 114
        shallowWrapper.instance().goToSpVisitSummary(data)
    });

    it('Check the impersinateServiceProvider function', () => {
        let data = {
            serviceProviderId: 12
        }
        shallowWrapper.instance().impersinateServiceProvider(data)
        shallowWrapper.setState({
            status: 'Feedback'
        })
        shallowWrapper.instance().impersinateServiceProvider(data)
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the handleGenderType function', () => {
        let data = {
            name: 'male',
            id: 1
        }
        shallowWrapper.instance().handleGenderType(data)
    });

    
    it('Check the onChangeExperinceSlider function', () => {
        let data = {
            min: 0,
            max: 50
        }
        shallowWrapper.instance().onChangeExperinceSlider(data)
    });

    it('Check the handleSelectedRating function', () => {
        let item = {
            target: {
                value: '5'
            }
        }
        shallowWrapper.instance().handleSelectedRating(item)
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
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

    it('Check the handleSearchkeyword function', () => {
        let e = {
            target: {
                value: 'adasd'
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

    it('Check mapStateToProps', () => {
        const initialState = {
            dashboardState: {
                VisitServiceProviderState: {
                    visitServiceProviderTableList: [],
                    attributedProviders: [],
                    cohorts: [],
                    contracts: [],
                    paginationCount: 0,
                    states: [],
                    isLoaded: true,
                    activeSubTab: 1,
                    feedbackServiceVisits: [],
                    visitServiceProviderCountList: [],
                    isLoadingFeedbackList: true,
                    savedPaginationNumber: 12,
                    genderType: [],
                    genderId: 1,
                    filterApplied: true,
                    memberContractId: 12,
                    minExperience: 20,
                    maxExperience: 50,
                    activeTab: 1,
                    isImpersinated: true,
                    rating: 5
                },
                individualsListState: {
                    genderType: []
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
        mapDispatchToProps(dispatch).getVisitServiceProviderCountList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceProviderTableList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createVideoConference({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToSpProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveSubTab(2);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getPointofServicedata({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail(21);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getFeedbackAlertDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).savePaginationNumber(10);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveStatusForAllTab('All');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToESPProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setESP(23);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getGender();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearGenderType([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setServiceProviderFeedbackTab(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveScheduleType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setGenderId(6);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setExperience({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setRating(4);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).resetFilter();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setImpersinated(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setFilterApplied(true);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAssessmentQuestionsList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})