import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Summary, mapDispatchToProps, mapStateToProps} from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('react-signature-pad-wrapper', () => ({
    SignaturePad: 'mockSignaturePad '
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
    visitSelectionState: {
        VisitServiceProcessingState: {
            SummaryState: {
                isLoading: true,
                SummaryDetails: [],
                CalculationsData: {},
                actualTimeDiff: 1232,
                signature: 'asdasdsa'
            },
            PerformTasksState: {
                PerformTasksList: [],
                startedTime: 1230,
                ServiceRequestVisitId: 121231
            }
        },
        VisitServiceDetailsState: {
            VisitServiceElibilityStatus: ''
        }
    },
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
        totalTask: 40,
        originalTotalDuration: '32:33:20',
        serviceRequestTypeVisits: {},
        hourlyRate: 23.555
    },
    patientDetails: {
        visitDate: '30-05-2019',
        serviceRequestVisitNumber: 'ssa12123d',
        patient: {
            patientId: 213123,
            imageString: 'asdasd/fsdfs',
            firstName: 'Akash',
            lastName: 'Tirole'
        }
    },
    CalculationsData: {
        totalChargableTime: 1323
    },
    getSummaryDetail: jest.fn(),
    onUpdateTime: jest.fn(),
    saveSummaryDetails: jest.fn(),
    saveSignature: jest.fn(),
    getSavedSignature: jest.fn(),
    goBackToFeedback: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    calculationActualData: jest.fn(),
    updateVisitProcessingUpdateBilledDuration: jest.fn(),
    goBack: jest.fn(),
    signaturePad: {
        toDataURL: jest.fn()
    },
    isLoading: true,
    signatureImage: {
        signature: 'asafsa'
    }
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - Summary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Summary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Summary contains ProfileContentWidget', () => {
        shallowWrapper.setProps({
            patientDetails: {
                visitDate: '30-05-2019',
                serviceRequestVisitNumber: 'ssa12123d',
                patient: {
                    patientId: 213123,
                    firstName: 'Akash',
                    lastName : 'Tirole'
                }
            },
            SummaryDetails: {
                totalTaskCompleted: 20,
                totalTask: 40,
                originalTotalDuration: '32131123',
                serviceRequestTypeVisits: {},
                hourlyRate: 0
            },
            signatureImage: {}
        })
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the goBackToFeedback', () => {
        shallowWrapper.instance().goBackToFeedback()
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            ServiceRequestVisitId: 12
        })
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            signatureImage: {
                signature: 'asafsa'
            },
            SummaryDetails: {},
            CalculationsData: {
                totalHours: 5,
                totalMinutes: 30,
                totalSeconds: 40
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile({})
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle()
    });

    it('Check the togglePopup', () => {
        shallowWrapper.instance().togglePopup()
    });

    it('Check the AdjustTime', () => {
        shallowWrapper.instance().AdjustTime()
    });

    it('Check the saveSignature', () => {
        shallowWrapper.instance().saveSignature()
    });

    it('Check the onClickSignaturePad', () => {
        shallowWrapper.instance().onClickSignaturePad()
    });

    it('Check the resetSignature', () => {
        shallowWrapper.instance().resetSignature()
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setState({
            summaryDetails: {
                originalTotalDuration: '122:32:33'
            }
        })
        shallowWrapper.instance().onClickNext()
        shallowWrapper.setState({
            summaryDetails: {
                originalTotalDuration: '122:32:33'
            },
            signatureImage: 'zdasd/asfsaf'
        })
        shallowWrapper.instance().onClickNext()
    });

    it('Check the onClickNextBtn', () => {
        shallowWrapper.instance().onClickNextBtn()
    });

    it('Check the timerErrMessage', () => {
        shallowWrapper.setProps({
            summaryDetails: {
                originalTotalDuration: '5:32:33'
            }
        })
        shallowWrapper.setState({
            updatedHour: '1',
            updatedMin: '60',
            updatedSec: '60'
        })
        shallowWrapper.instance().timerErrMessage()
        shallowWrapper.setState({
            updatedHour: '6',
            updatedMin: '50',
            updatedSec: '50'
        })
        shallowWrapper.instance().timerErrMessage()
        shallowWrapper.setState({
            updatedHour: '',
            updatedMin: '',
            updatedSec: ''
        })
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
        shallowWrapper.setState({
            disableSignatureBtn: false,
            isSaveBtnShown: true
        })
        shallowWrapper.instance().onPreviousClick()
    });

    it('Check for patient not defined', () => {
        shallowWrapper.setProps({
            patientDetails: {
                visitDate: '30-05-2019',
                serviceRequestVisitNumber: 'ssa12123d'
            }
        })
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the events', () => {
        shallowWrapper.setState({
            SummaryDetails: {
                originalTotalDuration: '32:33:20'
            }
        })
        expect(shallowWrapper.find('[test-proceedModal="test-proceedModal"]').props().onConfirm());
        expect(shallowWrapper.find('[test-proceedModal="test-proceedModal"]').props().onCancel());
        expect(shallowWrapper.find('[test-signModal="test-signModal"]').props().onConfirm());
        expect(shallowWrapper.find('[test-discardModal="test-discardModal"]').props().onConfirm());
        expect(shallowWrapper.find('[test-discardModal="test-discardModal"]').props().onCancel());
    });

    it('Check the mapDispatchToProps fn()', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getSummaryDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).onUpdateTime({}, 12);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveSignature({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSavedSignature({});
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

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });    
});