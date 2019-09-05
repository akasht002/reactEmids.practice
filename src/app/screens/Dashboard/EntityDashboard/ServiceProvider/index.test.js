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
    savePaginationNumber: jest.fn()
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

    it('Check the componentWillReceiveProps function', () => {
        const nextProps = {
            fromDate: '04/24/2019',
            toDate: '05/24/2019',
            individualsList: [{
                dataCount: 32
            }]
        }
        shallowWrapper.setProps({
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

})