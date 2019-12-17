import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { VisitSummary, mapDispatchToProps, mapStateToProps } from './VisitSummary';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../utils/userUtility', () => ({
    getPatientData: () => ({
        patientId: 12
    })
}))

jest.mock('../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('./Summary', () => ({
    Summary: 'mockSummary'
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    getVisitServiceHistoryByIdDetail: jest.fn(),
    push: jest.fn(),
    getVisitFeedBack: jest.fn(),
    setServiceProvider: jest.fn(),
    goBack: jest.fn(),
    setUser: jest.fn(),
    paymentPathValid: jest.fn(),
    goToDetailsPage: jest.fn(),
    goToPatientProfile: jest.fn(),
    setPatient: jest.fn(),
    Visits: {
        VisitServiceDetails: {
            serviceProvider: {
                image: 'asd/afsaf/afsaf'
            },
            patient: {
                firstName: 'Akash',
                lastName: 'Tirole'
            }
        },
        visitHistoryState: {
            vistServiceHistoryState: {
                ServiceRequestId: 1,
                VisitFeedback: [],
                submittedResponse: [],
                VisitServiceDetails: [{
                    serviceProvider: {
                        image: 'asd/afsaf/afsaf'
                    }
                }]
            }
        }
    },
    careteamDashboard: {
        individualsListState: {
            activeTab: '2'
        }
    },
    activeTab: '2',
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    }
};

store = mockStore(defaultState);

describe("VisitSummary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <VisitSummary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VisitSummary contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the toggle function', () => {
        shallowWrapper.instance().toggle();
    });

    it('Check the FeedbackModal function', () => {
        shallowWrapper.instance().FeedbackModal();
    });

    it('Check the handelBack function', () => {
        shallowWrapper.instance().handelBack();
    });

    it('Check the onSubmitFeedback function', () => {
        shallowWrapper.instance().onSubmitFeedback();
    });

    it('Check the ServiceRequestId empty', () => {
        shallowWrapper.setProps({
            ServiceRequestId: null
        })
        shallowWrapper.instance().componentWillMount();
    });

    it('Check the ServiceRequestId empty', () => {
        shallowWrapper.setProps({
            isPaymentPathValid: true
        })
        shallowWrapper.instance().handelBack();
    });

    it('Check the handelPatientProfile  function', () => {
        shallowWrapper.instance().handelPatientProfile();
    });

    it('Check maptoprops', () => {
        const initialState = {
            visitHistoryState:
            {
                vistServiceHistoryState: [],
                ServiceRequestId: 10
            },
            visitSelectionState: {
                VisitServiceProcessingState: {
                    PaymentsState: {
                        isPaymentPathValid: true
                    }
                }
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail();
        mapDispatchToProps(dispatch).getVisitFeedBack();
        mapDispatchToProps(dispatch).setPatient();
        mapDispatchToProps(dispatch).goToPatientProfile();
        mapDispatchToProps(dispatch).goToDetailsPage();
        mapDispatchToProps(dispatch).paymentPathValid();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
})