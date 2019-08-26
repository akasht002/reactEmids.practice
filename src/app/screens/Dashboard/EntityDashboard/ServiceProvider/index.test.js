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

jest.mock('../StatCard', () => ({
    StatCard: 'mockStatCard'
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    careteamDashboard: {
        VisitServiceProviderState: {
            visitServiceProviderCountList: [],
            visitServiceProviderTableList: [],
            paginationCount: 0,
            activeSubTab: 1
        }
    },
    spSearchState: {
        FilterState: {
            serviceCategory: [],
            serviceType: [],
            getServiceArea: [],
            genderType: []
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
    getFeedbackAlertDetails: jest.fn()
};

store = mockStore(defaultState);

describe("ServiceProvider", function () {
    let shallowWrapper;
    shallowWrapper = shallow(
        <ServiceProvider dispatch={dispatch} store={store} {...defaultState} />
    )

    it('Check the ServiceProvider section', () => {
        expect(shallowWrapper.find('.CTDashboardTabContent').length).toEqual(1);
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

    it('Check the handleGenderType function', () => {
        shallowWrapper.instance().handleGenderType({})
    });

    it('Check the onChangeSlider function', () => {
        shallowWrapper.instance().onChangeSlider({})
    });

    it('Check the onChangeExperinceSlider function', () => {
        shallowWrapper.instance().onChangeExperinceSlider({})
    });

    it('Check the getServicesTypeId function', () => {
        shallowWrapper.setProps({
            serviceType: [{
                serviceTypeId: 12
            }]
        })
        shallowWrapper.instance().getServicesTypeId()
    });

    it('Check the handleChangeServiceCategory  function', () => {
        // let selectedOption = {

        // }
        shallowWrapper.instance().handleChangeServiceCategory({})
    });

    it('Check the handleSelectedRating function', () => {
        let item = {
            target: {
                value: 5
            }
        }
        shallowWrapper.instance().handleSelectedRating(item)
    });

    it('Check the handleServiceArea function', () => {
        shallowWrapper.instance().handleServiceArea({})
    });

    it('Check the toggleFilter function', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the applyFilter function', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the applyReset function', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the pageNumberChange function', () => {
        shallowWrapper.setState({
            pageSize: 10,
            rowCount: 5
        })
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the onClickConversation function', () => {
        const item = {
            coreoHomeUserId: 1,
            individualId: 10,
        }
        shallowWrapper.instance().onClickConversation({}, item)
    });

    it('Check the showPhoneNumber function', () => {
        const data = {
            phoneNumber: 9165648715
        }
        shallowWrapper.instance().showPhoneNumber(data)
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

    it('Check the pageSizeChange function', () => {
        shallowWrapper.setState({
            rowCount: 5
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

    it('Check the handleSearchData function', () => {
        const event = {
            preventDefault() {}
        }
        shallowWrapper.instance().handleSearchData(event)
    });

    it('Check the closeSearch function', () => {
        shallowWrapper.instance().closeSearch()
    });

    it('Check the goToSp  function', () => {
        let data = {
            serviceProviderId: 1
        }
        shallowWrapper.instance().goToSp(data)
    });

    it('Check the handleserviceType function', () => {
        let item = {
            serviceTypeDescription: 'asaasd',
            serviceTypeId: 2121,

        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleserviceType(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleserviceType(item, e)
    });

    it('Check the handleskillType function', () => {
        let item = {
            name: 'asaasd',
            id: 2121,

        }
        let e = {
            target: {
                checked: true
            }
        }
        shallowWrapper.instance().handleskillType(item, e)
        e.target.checked = false
        shallowWrapper.instance().handleskillType(item, e)
    });

    it('Check the handleSearchkeywordPress function', () => {
        const event = {
            charCode: 13
        }
        shallowWrapper.instance().handleSearchkeywordPress(event)
        event.charCode = 0
        shallowWrapper.instance().handleSearchkeywordPress(event)
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

    it('Check the fetchData function', () => {
        shallowWrapper.instance().fetchData()
    });

    it('Check the statehandleChange function', () => {
        shallowWrapper.instance().statehandleChange({})
    });

    it('Check the pageNumberChangeFeedback function', () => {
        shallowWrapper.instance().pageNumberChangeFeedback(1)
    });

    it('Check the streethandleChange function', () => {
        let e = {
            target: {
                value: 'sdfsfs'
            }
        }
        shallowWrapper.instance().streethandleChange(e)
    });

    it('Check the cityhandleChange function', () => {
        let e = {
            target: {
                value: 'sdfsfs'
            }
        }
        shallowWrapper.instance().cityhandleChange(e)
    });

    it('Check the ziphandleChange function', () => {
        let replace = jest.fn()
        let e = {
            target: {
                value: replace
            }
        }
        shallowWrapper.instance().ziphandleChange(e)
    });

    it('Check the onClickHandleDecr function', () => {
        shallowWrapper.instance().onClickHandleDecr()
        shallowWrapper.setState({
            coverageArea: 0
        })
        shallowWrapper.instance().onClickHandleDecr()
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
})