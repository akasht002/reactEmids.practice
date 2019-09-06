import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import {ServiceProvider} from '../ServiceProvider/index';

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
    feedbackServiceVisits: [],
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
    goToESPProfile: jest.fn()
};

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
            servicePlanVisitId: 12
        }
        shallowWrapper.instance().goToSpVisitSummary(data)
    });

    it('Check the impersinateServiceProvider function', () => {
        let data = {
            serviceProviderId: 12
        }
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
})