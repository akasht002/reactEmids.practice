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
        str1: 'feedback',
        str2: 'feedback'
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
    }]
};

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Individuals dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Individuals", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState
        wrapper = setUp(props)
        shallowWrapper = shallow(
            <Individuals dispatch={dispatch} store={store} {...defaultState} />
        )
    });
    it('Check the individuals section', () => {
        expect(wrapper.find('.parent-fullblock').length).toEqual(1);
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

    it('Check the toggleFeedbaclAlert function', () => {
        shallowWrapper.instance().toggleFeedbaclAlert()
    });

    it('Check the getSortNameAndOrderBasedOnStatus function', () => {
        shallowWrapper.instance().getSortNameAndOrderBasedOnStatus('Feedback')
        shallowWrapper.instance().getSortNameAndOrderBasedOnStatus('')
    });

    it('Check the pageNumberChangeFeedback function', () => {
        shallowWrapper.instance().pageNumberChangeFeedback(1)
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
                    individualsFeedbackList: []
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
    });
})