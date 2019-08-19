import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { VisitServiceDetails } from './index';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    }),
    isEntityServiceProvider: () => ({})
}))

jest.mock('../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    VisitServiceElibilityStatus: {
        authorizationRequired: true,
        amount: 200,
        coInAuthorizationRequired: true,
        benefitPercent: 10,
        active: false
    },
    VisitServiceDetails: {
        statusId: 38
    },
    visitSelectionState: {
        VisitServiceDetailsState: {
            VisitServiceDetails: [],
            VisitServiceSchedule: [],
            ServiceRequestId: '',
            showMoreVisits: '',
            tab: '1',
            isLoaded: false,
            disableShowMore: false,
        }
    },
    servicerequestState: {
        schedulepreferencesState: {
            daysType: []
        }
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    getVisitServiceDetails: jest.fn(),
    getVisitServiceSchedule: jest.fn(),
    visitService: jest.fn(),
    getPerformTasksList: jest.fn(),
    createVisits: jest.fn(),
    getVisitServiceEligibilityStatus: jest.fn(),
    cancelServiceRequest: jest.fn(),
    getDays: jest.fn(),
    createNewConversation: jest.fn(),
    createVideoConference: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    goBack: jest.fn(),
    getSummaryDetails: jest.fn(),
    getServiceVisitId: jest.fn(),
    formDirtyFeedback: jest.fn(),
    formDirtySubmittedFeedback: jest.fn(),
    setServiceProvider: jest.fn(),
    goToSpProfile: jest.fn(),
    clearState: jest.fn(),
    clearVisitServiceSchedule: jest.fn(),
    push: jest.fn(),
    createDataStore: jest.fn(),
    clearServiceDetails: jest.fn(),
    cancelVisit: jest.fn(),
    clearScheduleListState: jest.fn(),
    setLoader: jest.fn(),
    history: {
        push: jest.fn()
    },
    getVisitList: jest.fn(),
    getServiceCategory: jest.fn(),
    ServiceRequestStatus: jest.fn(),
    getVisitStatus: jest.fn()
}

store = mockStore(defaultState);

describe("VisitServiceDetails", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <VisitServiceDetails dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VisitServiceDetails form body', () => {
        expect(shallowWrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the componentDidMount section', () => {
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the selectedServiceType', () => {
        shallowWrapper.instance().selectedServiceType({ target: { id: 10 } })
        expect(shallowWrapper.instance().state.serviceType).toEqual(10);
    });

    it('Check the onCancelVisit', () => {
        shallowWrapper.instance().onCancelVisit()
        expect(shallowWrapper.instance().state.isCancelVistModalOpen).toEqual(true);
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            location: 'asd'
        }
        shallowWrapper.setProps({
            location: 'dsd'
        })
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('Check the clickShowMore', () => {
        shallowWrapper.instance().clickShowMore();
    });

    it('Check the getSlotName', () => {
        let slot = {
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening",
            night: 'Night'
        }
        shallowWrapper.instance().getSlotName(slot.morning);
        shallowWrapper.instance().getSlotName(slot.afternoon);
        shallowWrapper.instance().getSlotName(slot.evening);
        shallowWrapper.instance().getSlotName(slot.night);
    });

    it('Check the visitService', () => {
        shallowWrapper.instance().visitService();
    });

    it('Check the showPhoneNumber', () => {
        shallowWrapper.instance().showPhoneNumber();
    });

    it('Check the visitSummary', () => {
        shallowWrapper.instance().visitSummary({});
    });

    it('Check the pageNumberChange', () => {
        shallowWrapper.instance().pageNumberChange(1);
    });

    it('Check the applyReset', () => {
        shallowWrapper.instance().applyReset();
    });

    it('Check the clickShowMore', () => {
        shallowWrapper.instance().clickShowMore();
    });

    it('Check the onClickConversation', () => {
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 0  
            }
        })
        shallowWrapper.instance().onClickConversation();
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 1  
            }
        })
        shallowWrapper.setState({
            visitServiceDetails: {
                serviceProvider: {
                    coreoHomeUserId: 12
                },
                serviceProviderId: 12  
            }
        })
        shallowWrapper.instance().onClickConversation();
    });

    it('Check the onClickVideoConference', () => {
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 0  
            }
        })
        shallowWrapper.instance().onClickVideoConference();
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 1  
            }
        })
        shallowWrapper.setState({
            visitServiceDetails: {
                serviceProvider: {
                    coreoHomeUserId: 12
                },
                serviceProviderId: 12  ,
                providerFirstName: 'asda',
                providerLastName: 'ssfs',
                providerThumbnail: 'asd/afasf/saf'
            }
        })
        shallowWrapper.instance().onClickVideoConference();
    });
});