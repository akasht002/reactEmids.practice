import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { AssessmentSummary } from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    })
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
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    saveAnswers: jest.fn(),
    goVisitServiceList: jest.fn(),
    SummaryDetails: {
        totalTaskCompleted: 20,
        totalTask: 40
    },
    patientDetails: {
        visitDate: '30-05-2019'
    },
    CalculationsData: {
        totalChargableTime: 1323
    },
    signatureImage: {
        signature: 'data:image/jpeg;base64,'
    },
    goBackToFeedback: jest.fn(),
    ServiceRequestVisitId: 132,
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    getSummaryDetail: jest.fn(),
    getSavedSignature: jest.fn(),
    calculationActualData: jest.fn()
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - AssessmentSummary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AssessmentSummary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Summary contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the goBackToFeedback', () => {
        shallowWrapper.instance().goBackToFeedback()
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount()
        shallowWrapper.setProps({
            ServiceRequestVisitId: undefined
        })
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            signatureImage: {
                signature : 'sdadfaf'
            },
            SummaryDetails: {},
            CalculationsData: {
                totalHours: 2,
                totalMinutes: 30,
                totalSeconds: 15 
            }  
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the handlePatientProfile', () => {
        shallowWrapper.instance().handlePatientProfile()
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle()
    });

    it('Check the togglePopup', () => {
        shallowWrapper.instance().togglePopup()
    });

    it('Check the adjustTime', () => {
        shallowWrapper.instance().adjustTime()
    });

    it('Check the signaturePad', () => {
        shallowWrapper.instance().signaturePad()
    });

    it('Check the saveSignature', () => {
        shallowWrapper.instance().saveSignature()
    });

    it('Check the resetSignature', () => {
        shallowWrapper.instance().resetSignature()
    });

    it('Check the onClickSignaturePad', () => {
        shallowWrapper.instance().onClickSignaturePad()
    });

    it('Check the onClickNext', () => {
        shallowWrapper.instance().onClickNext()
    });
});