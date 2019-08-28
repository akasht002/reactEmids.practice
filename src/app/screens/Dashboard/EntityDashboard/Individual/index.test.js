import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import {Individuals, mapDispatchToProps, mapStateToProps} from './index';

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

jest.mock('../StatCard', () => ({
    StatCard: 'mockStatCard'
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    careteamDashboard: {
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
        expect(wrapper.find('.CTDashboardTabContent').length).toEqual(1);
    });

    it('Check the componentWillUnmount function', () => {
        shallowWrapper.setProps({individualsList: []})
        shallowWrapper.setState({phoneNumber: null})
        shallowWrapper.instance().componentWillUnmount()
    });

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            fromDate: '04/24/2019',
            toDate: '05/24/2019',
            individualsList: [{
                dataCount: 32,
                gender: ''
            }]
        }
        shallowWrapper.setProps({
            fromDate: '03/24/2019',
            toDate: '04/24/2019',
            individualsList: []
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

    
    it('Check the handleCohorts function', () => {
        const e = {
            target: {
                checked: true
            }
        }
        const item = {
             id: 12,

        }
        shallowWrapper.instance().handleCohorts(item,e)
        e.target.checked = false
        shallowWrapper.instance().handleCohorts(item,e)
    });

    it('Check the handleAttributedProviders function', () => {
        shallowWrapper.instance().handleAttributedProviders({})
    });

    it('Check the handleClinicalConditions function', () => {
        const item = {
            attributeId: 12 
        }
        const e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleClinicalConditions(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleClinicalConditions(item,e)
    });

    it('Check the handleGenderType function', () => {
        shallowWrapper.instance().handleGenderType({})
    });

    it('Check the handleContracts function', () => {
        const data = {
            membershipName: 'sdas',
            membershipId: 12
        }
        shallowWrapper.instance().handleContracts(data)
    });

    it('Check the handleState function', () => {
        shallowWrapper.instance().handleState({})
    });

    it('Check the onChangeSlider function', () => {
        shallowWrapper.instance().onChangeSlider({})
    });

    it('Check the handleServiceArea function', () => {
        shallowWrapper.instance().handleServiceArea({})
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the closeFIlter function', () => {
        shallowWrapper.instance().closeFIlter()
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the onClickConversation function', () => {
        const item = {
            coreoHomeUserId: 1,
            individualId: 10,
        }
        shallowWrapper.instance().onClickConversation({}, item)
    });

    it('Check the onClickVideoConference function', () => {
        const item = {
            coreoHomeUserId: 1,
            individualId: 10,
            individualName: 'sasa',
            thumbNail: 'asdsa'
        }
        shallowWrapper.instance().onClickVideoConference({}, item)
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

    it('Check the onClickHandleIncr function', () => {
        shallowWrapper.setState({
            coverageArea: 20
        })
        shallowWrapper.instance().onClickHandleIncr()
        shallowWrapper.setState({
            coverageArea: 0
        })
        shallowWrapper.instance().onClickHandleIncr()
    });

    it('Check the onClickHandleDecr function', () => {
        shallowWrapper.setState({
            coverageArea: 20
        })
        shallowWrapper.instance().onClickHandleDecr()
        shallowWrapper.setState({
            coverageArea: 0
        })
        shallowWrapper.instance().onClickHandleDecr()
    });

    it('Check the handleStreet function', () => {
        const e = {
            target: {
                valu: 'sdsd'
            }
        }
        shallowWrapper.instance().handleStreet(e)
    });

    it('Check the handleCity function', () => {
        const e = {
            target: {
                valu: 'sdsd'
            }
        }
        shallowWrapper.instance().handleCity(e)
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

    it('Check the showPhoneNumber function', () => {
        const data = {
            phoneNumber: 9165648715
        }
        shallowWrapper.instance().showPhoneNumber(data)
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
        shallowWrapper.instance().handleSearchkeywordPress(event)
        event.charCode = 0
        shallowWrapper.instance().handleSearchkeywordPress(event)
    });

    it('Check the handleSearchData function', () => {
        const event = {
            preventDefault() {}
        }
        shallowWrapper.instance().handleSearchData(event)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the goToPg function', () => {
        let data = {
            individualId: 12312
        }
        shallowWrapper.instance().goToPg(data)
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the applyReset function', () => {
        shallowWrapper.setState({
            searchOpen: false
        })
        shallowWrapper.instance().applyReset()
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
        shallowWrapper.instance().goToPgVisitSummary({data: {
            serviceRequestVisitId: 123
        }})
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
        careteamDashboard: {
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
        mapDispatchToProps(dispatch).getServiceArea();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getGender();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSkill();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getClinicalCondition();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAttributedProviders();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAllCohorts();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getAllContracts();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearClinicalCondition([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearGenderType([]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).resetFilter([],[],[]);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).impersinateIndividual({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createNewConversation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createVideoConference({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getStates();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearState();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setActiveSubTab('1');
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).impersinateCareTeamIndividual({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setContext({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getIndividualsFeedbackList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).savePaginationNumber({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})