import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Feedback } from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
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
    profileImgData: {
        image: 'asda/daasd/dasd'
    },
    patientDetails: {
        visitDate: '30-05-2019',
        serviceRequestVisitNumber: 'ssa12123d'
    },
    VisitFeedback: [],
    QuestionsList: [],
    SummaryDetails: {
        originalTotalDuration: 12312,
        visitStartTime: 123
    },
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    saveAnswers: jest.fn()
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - Feedback", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Feedback dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Feedback contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the toggle section', () => {
        shallowWrapper.instance().toggle()
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the handleSelected', () => {

        shallowWrapper.instance().handleSelected({}, '123')
    });

    it('Check the handleTextarea', () => {
        let e = {
            target: {
                value: 'dasda'
            }
        }
        shallowWrapper.instance().handleTextarea(e, '123')
    });

    it('Check the onClickNext', () => { 
        shallowWrapper.instance().onClickNext();
    });

    it('Check the goBackToPerformTask', () => { 
        shallowWrapper.instance().goBackToPerformTask();
    });
});