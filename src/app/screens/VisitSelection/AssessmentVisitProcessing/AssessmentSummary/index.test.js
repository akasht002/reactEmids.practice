import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { AssessmentSummary, mapDispatchToProps, mapStateToProps } from './index';

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
    visitSelectionState: {
        VisitServiceProcessingState: {
            SummaryState: {
                isLoading: true,
                SummaryDetails: {},
                CalculationsData: {},
                actualTimeDiff: 3221,
                signature: 'sadsda/sadsd'
            },
            AssessmentState: {
                planDetails: {},
                requestDetails: {},
                taskPercentage: 50
            },
            PerformTasksState: {
                startedTime: 1332,
                ServiceRequestVisitId: 12
            }
        },
        VisitServiceDetailsState: {
            VisitServiceElibilityStatus: 'dsad'
        }
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
    calculationActualData: jest.fn(),
    saveSignature: jest.fn(),
    saveSummaryDetails: jest.fn(),
    onUpdateTime: jest.fn()
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
        shallowWrapper.instance().signaturePad = {
            toDataURL: jest.fn(),
            off: jest.fn()
        }
        shallowWrapper.setState({
            summaryDetails: {
                patient: {
                    patientId: 12  
                },
                servicePlanVisitId: 11,
                serviceRequestId: 10
            }
        })
        shallowWrapper.instance().saveSignature()
    });

    it('Check the resetSignature', () => {
        shallowWrapper.instance().signaturePad = {
            clear: jest.fn()
        }
        shallowWrapper.instance().resetSignature()
    });

    it('Check the onClickSignaturePad', () => {
        shallowWrapper.instance().onClickSignaturePad()
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setState({
            summaryDetails: {
                originalTotalDuration: '20:05:30'
            },
            signatureImage: 'adda/sds/sads'
        })
        shallowWrapper.instance().onClickNext()
        shallowWrapper.setState({
            signatureImage: undefined
        })
        shallowWrapper.instance().onClickNext()
    });

    it('Check the onClickSignaturePad', () => {
        shallowWrapper.instance().onClickNextBtn()
    });

    it('Check the timerErrMessage', () => {
        shallowWrapper.instance().timerErrMessage()
    });

    it('Check the onPreviousClick', () => {
        shallowWrapper.instance().onPreviousClick()
    });

    it('Check the updateTime', () => {
        shallowWrapper.instance().updateTime()
    });

    it('Check the onMouseUp', () => {
        shallowWrapper.instance().onMouseUp()
    });

    it('Check the onPreviousClick', () => {
        shallowWrapper.instance().onPreviousClick()
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getSummaryDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).onUpdateTime({}, 12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveSignature({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSavedSignature();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBackToFeedback();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).calculationActualData();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateVisitProcessingUpdateBilledDuration({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check the events', () => {
        shallowWrapper.setState({
            summaryDetails: {
                originalTotalDuration: '20:05:30',
            }
        })
        shallowWrapper.setProps({
            patientDetails: {
                patient: {
                    patientId: 12  
                }    
            }
        })
        expect(shallowWrapper.find('[test-paymentPopup="test-paymentPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-paymentPopup="test-paymentPopup"]').props().onCancel())
        expect(shallowWrapper.find('[test-discardPopup="test-discardPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-discardPopup="test-discardPopup"]').props().onCancel())
        expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onConfirm())
        expect(shallowWrapper.find('.requestImageContent').props().onClick())
        expect(shallowWrapper.find('[test-goBack="test-goBack"]').props().onClick())
    });

});