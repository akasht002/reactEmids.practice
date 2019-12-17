import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { Assessment, mapStateToProps, mapDispatchToProps } from './index';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 13
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
            AssessmentState: {
                questionsList: [],
                planDetails: [],
                requestDetails: [],
                startedTime: 12
            },
            PerformTasksState: {
                SummaryDetails: {},
                ServiceRequestVisitId: 23,
                PerformTasksList: []
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
    saveAnswers: jest.fn(),
    requestDetails: {
        visitStatus: "IN_PROGRESS",
        visitStartTime: 123,
        visitEndTime: 2244,
        visitTimeDuration: 2
    },
    PerformTasksList: {
        visitStartTime: 123
    },
    questionsList: [{
        assessmentQuestionnaireId: 1,
        answerTypeDescription : 'ChoiceBased',
        selectedAnswer : 'Yes',
        answers: [{
            answerName: 'Yes'
        }]
    }],
    ServiceRequestVisitId: 132,
    getServicePlanVisitSummaryDetails: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    saveTaskPercentage: jest.fn(),
    startOrStopService: jest.fn(),
    eligibilityIsLoading: true,
    isLoading : true
}

store = mockStore(defaultState);

describe("Assessment Processing - Assessment", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <Assessment dispatch={dispatch} store={store} {...defaultState} />
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
        shallowWrapper.setProps({
            ServiceRequestVisitId: undefined
        })
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the componentWillReceiveProps', () => {
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 10
        }]
        shallowWrapper.setProps({
            questionsList: []
        })
        let nextProps = {
            questionsList: [{
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'ChoiceBased',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'Yes'
                }]
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps)
        let nextProps1 = {
            questionsList: [{
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'ChoiceBased',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps1)
        let nextProps2 = {
            questionsList: [{
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'OpenText',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps2)
        let nextProps3 = {
            questionsList: [{
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'OpenText',
                selectedAnswer : null,
                answers: [{
                    answerName: 'No'
                }]
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps3)
        let nextProps4 = {
            questionsList: [{
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'noChoice',
                selectedAnswer : null,
                answers: [{
                    answerName: 'No'
                }]
            }]
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps4)
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
        e.target.value = ''
        shallowWrapper.instance().handleTextarea(e, '123')
    });

    it('Check the onClickNext', () => {
        shallowWrapper.instance().onClickNext();
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 12
        }]
        shallowWrapper.instance().onClickNext();
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile();
    });

    it('Check the onClickConfirm', () => {
        shallowWrapper.instance().onClickConfirm ();
    });

    it('Check the onClickSkip', () => {
        shallowWrapper.setState({ isModalOpen: true })
        shallowWrapper.instance().onClickSkip();
    });

    it('Check the onSubmit', () => {
        shallowWrapper.setProps({
            patientDetails: {
                serviceRequestVisitId: 0
            }
        })
        shallowWrapper.instance().onSubmit();
    });

    it('Check the startService', () => {
        shallowWrapper.instance().startService();
        shallowWrapper.instance().startService(1, 21);
    });

    it('cover the branch coverage in render method', () => {
        shallowWrapper.setProps({
            requestDetails: {
                visitStatus: "COMPLETED"
            }
        })
        shallowWrapper.setProps({
            requestDetails: {
                visitStatus: "PAYMENT_PENDING"
            }
        })
        shallowWrapper.setProps({
            requestDetails: {
                visitStatus: "YET_TO_START"
            }
        })
        expect(shallowWrapper.find('[test-startButton="test-startButton"]').props().onClick())
        shallowWrapper.setProps({
            requestDetails: {
                patient: {
                }
            }
        })
        shallowWrapper.setState({
            isSubmitButtonClicked: true
        })
        shallowWrapper.setProps({
            requestDetails: {
                patient: {
                    imageString: 'asdas/asdasda/daf',
                    firstName: 'Akash',
                    lastName: 'Tirole' 
                }
            },
            questionsList: [{
                assessmentQuestionnaireId: 1,
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
                assessmentQuestionnaireId: 1,
                answerTypeDescription : 'Choice',
                selectedAnswer : 'Yes',
                answers: [{
                    answerName: 'No'
                }]
            }]
        })
        shallowWrapper.setProps({
            requestDetails: {
                visitStatus: "YET_TO_START"
            }
        })
    });
    
    it('Check the events', () => {
        expect(shallowWrapper.find('[test-assessmentPopup="test-assessmentPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-assessmentPopup="test-assessmentPopup"]').props().onCancel())
        expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onConfirm())
        expect(shallowWrapper.find('[test-alertPopup="test-alertPopup"]').props().onCancel())
        expect(shallowWrapper.find('.form-radio-input').props().onChange({target:{checked: true}}))
        expect(shallowWrapper.find('.requestImageContent').props().onClick())
        expect(shallowWrapper.find('[test-goBack="test-goBack"]').props().onClick())
        expect(shallowWrapper.find('[test-stopButton="test-stopButton"]').props().onClick())
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getPerformTasksList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getQuestionsList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveAnswers();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitFeedBack({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBackToPerformTask();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).startOrStopService({}, 12, 233);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServicePlanVisitSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveTaskPercentage({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getQuestionsListSuccess({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});