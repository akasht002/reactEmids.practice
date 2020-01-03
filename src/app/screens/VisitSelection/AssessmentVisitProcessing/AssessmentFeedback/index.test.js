import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { AssessmentFeedback, mapStateToProps, mapDispatchToProps } from './index';

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
    visitSelectionState: {
        VisitServiceDetailsState: {
            VisitServiceDetails: [],
            VisitServiceSchedule: [],
            ServiceRequestId: '',
            showMoreVisits: '',
            tab: '1',
            isLoaded: false,
            disableShowMore: false,
        },
        VisitServiceProcessingState: {
            FeedbackState: {
                QuestionsList: [],
                isLoading: true
            },
            PerformTasksState: {
                SummaryDetails: {},
                ServiceRequestVisitId: 23,
                PerformTasksList: [],
                startedTime: 12
            },
            SummaryState: {
                isLoading: true 
            }
        }
    },
    visitHistoryState: {
        vistServiceHistoryState: {
            VisitFeedback: {}
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
    goBackToPerformTask: jest.fn(),
    getQuestionsList: jest.fn(),
    getVisitFeedBack: jest.fn(),
    profileImgData: {
        image: 'asda/daasd/dasd'
    },
    patientDetails: {
        visitDate: '30-05-2019',
        serviceRequestVisitNumber: 'ssa12123d',
        patient: {
            patientId: 12
        }
    },
    VisitFeedback: [{
        feedbackQuestionnaireId: 1,
        selectedAnswer: 'Yes'
    }],
    QuestionsList: [],
    SummaryDetails: {
        originalTotalDuration: 12312,
        visitStartTime: 123
    },
    history: {
        push: jest.fn(),
        goBack: jest.fn()
    },
    saveAnswers: jest.fn(),
    questionsList: [{
        feedbackQuestionnaireId: 1,
        answerTypeDescription : 'ChoiceBased',
        selectedAnswer : 'Yes',
        answers: [{
            answerName: 'Yes'
        }]
    }],
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    goToSummary: jest.fn(),
    getSavedSignature: jest.fn(),
    goBackToAssessment: jest.fn(),
    eligibilityIsLoading: true,
    isLoading : true
}

store = mockStore(defaultState);

describe("VisitServiceProcessing - AssessmentFeedback", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <AssessmentFeedback dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the AssessmentFeedback contains ProfileContentWidget', () => {
        expect(shallowWrapper.find('.ProfileContentWidget').length).toEqual(1);
    });

    it('Check the toggle section', () => {
        shallowWrapper.instance().toggle()
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            ServiceRequestVisitId: 12
        })
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

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile();
    });

    it('Check the handleSelected', () => {
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 11
        }]
        shallowWrapper.instance().handleSelected();
    });

    it('Check the onClickSkip', () => {
        shallowWrapper.setState({ isModalOpen: true })
        shallowWrapper.instance().onClickSkip();
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setState({
            textareaData: 'asfsa'
        })
        shallowWrapper.setProps({
            questionsList: [{
                feedbackQuestionnaireId: 1,
                answerTypeDescription : 'Choice',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        })
        shallowWrapper.instance().onClickNext();
    });

    it('Check the onClickConfirm', () => {
        shallowWrapper.instance().onClickConfirm();
    });

    it('Check the onPreviousClick', () => {
        shallowWrapper.instance().onPreviousClick();
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 11
        }]
        shallowWrapper.instance().onPreviousClick();
    });

    it('Check the goBackToAssessment', () => {
        shallowWrapper.instance().goBackToAssessment();
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getQuestionsList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveAnswers({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitFeedBack({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBackToAssessment();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSavedSignature({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('cover the branch coverage in render method', () => {
        shallowWrapper.setProps({
            patientDetails: {
                patient: {
                    patientId: 12,
                    imageString: 'asdas/asdasda/daf',
                    firstName: 'Akash',
                    lastName: 'Tirole' 
                }
            }
        })
        shallowWrapper.setState({
            isSubmitButtonClicked: true
        })
        shallowWrapper.setProps({
            questionsList: [{
                feedbackQuestionnaireId: 1,
                answerTypeDescription : 'OpenText',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        })
        expect(shallowWrapper.find('.form-control').props().onChange({target:{value: 'dsda'}}))
        shallowWrapper.setState({
            isSubmitButtonClicked: false
        })
        shallowWrapper.setProps({
            questionsList: [{
                feedbackQuestionnaireId: 1,
                answerTypeDescription : 'Choice',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        })
        shallowWrapper.setProps({
            questionsList: []
        })
    });

    it('Check the events', () => {
        expect(shallowWrapper.find('[test-feedbackPopup="test-feedbackPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-feedbackPopup="test-feedbackPopup"]').props().onCancel())
        expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onCancel())
        expect(shallowWrapper.find('.form-radio-input').props().onChange({target:{checked: true}}))
        expect(shallowWrapper.find('.requestImageContent').props().onClick())
        expect(shallowWrapper.find('[test-goBack="test-goBack"]').props().onClick())
    });

});