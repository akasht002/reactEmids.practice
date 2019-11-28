import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Feedback, mapStateToProps, mapDispatchToProps } from './index.js';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

jest.mock('../../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    }),
}))

jest.mock('../../../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true
    }),
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    QuestionsList: [{ "feedbackQuestionnaireId": 6, "question": "How was the individual feeling today?", "answers": [{ "id": 6001, "answerName": "Normal", "feedbackQuestionnaireId": 0 }], "answerType": 50, "answerTypeDescription": "ChoiceBased", "questionType": 49, "selectedAnswer": null, "rating": 0 }],
    serviceRequestId: 1,
    VisitFeedback: [],
    patientDetails: {
        serviceRequestId: 1,
        patient: {
            imageString: 'asdas/sadas'
        }
    },
    SummaryDetails: {
        originalTotalDuration: ''
    },
    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    visitSelectionState: {
        VisitServiceProcessingState: {
            FeedbackState: {
                QuestionsList: [],
                isLoading: true
            },
            PerformTasksState: {
                PerformTasksList: [],
                startedTime: '',
                SummaryDetails: '',
                ServiceRequestVisitId: 12
            },
            SummaryState: {
                isLoading: true
            }
        }
    },
    visitHistoryState: {
        vistServiceHistoryState: {
            VisitFeedback: 'adsada'
        }
    },
    getQuestionsList: jest.fn(),
    saveAnswers: jest.fn(),
    getVisitFeedBack: jest.fn(),
    goToSummary: jest.fn(),
    goBack: jest.fn(),
    getSummaryDetails: jest.fn(),
    getSavedSignature: jest.fn(),
    setPatient: jest.fn(),
    goToPatientProfile: jest.fn(),
    push: jest.fn(),
    goBackToPerformTask: jest.fn(),
    history: {
        push: jest.fn()
    },
    eligibilityIsLoading: true
}

store = mockStore(defaultState);

const setUp = (props = {}) => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Feedback dispatch={dispatch} store={store} {...props} />
            </MemoryRouter>
        </Provider>
    )
    return wrapper;
};

describe("Feedback", function () {
    let wrapper, shallowWrapper;

    beforeEach(() => {
        const props = defaultState;
        wrapper = setUp(props);
        shallowWrapper = shallow(
            <Feedback dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the Feedback form body', () => {
        shallowWrapper.setProps({
            patientDetails: {
                serviceRequestId: 1,
                patient: {
                    lastName: 'AA'
                }
            },
            VisitFeedback: [{
                feedbackQuestionnaireId: 12
            }],
            QuestionsList: [{
                feedbackQuestionnaireId: 12
            }]
        })
        shallowWrapper.setState({
            isSubmitButtonClicked: true
        })
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the Feedback form body for empty props', () => {
        shallowWrapper.setProps({
            patientDetails: {
                serviceRequestId: 1
            }
        })
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
        expect(shallowWrapper.instance().state.collapse).toEqual(true);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.setProps({
            ServiceRequestVisitId: 12
        })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the events', () => {
        let e = {
            target: {
                checked: true
            }
        }
        expect(shallowWrapper.find('.TitleContent').props().onClick());
        expect(shallowWrapper.find('.requestImageContent').props().onClick());
        expect(shallowWrapper.find('[test-feedback="test-feedback"]').props().onConfirm());
        expect(shallowWrapper.find('[test-discard="test-discard"]').props().onConfirm());
        expect(shallowWrapper.find('[test-feedback="test-feedback"]').props().onCancel());
        expect(shallowWrapper.find('[test-discard="test-discard"]').props().onCancel());
        expect(shallowWrapper.find('[test-input="test-input"]').props().onChange(e));
        // expect(enzymeWrapper.find('[name="newPass"]').props().onPaste(e));
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile(1);
    });

    it('Check the handleSelected', () => {
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 12
        }]
        shallowWrapper.instance().handleSelected([], 10);
    });

    it('Check the handleTextarea', () => {
        shallowWrapper.instance().handleTextarea({ target: { value: 'TEST' } }, 1);
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setProps({
            VisitFeedback: [{
                feedbackQuestionnaireId: 12
            }],
        })
        shallowWrapper.setState({ textareaData: 'TEST' })
        shallowWrapper.instance().onClickNext();
    });

    it('Check the onClickConfirm', () => {
        shallowWrapper.instance().onClickConfirm();
    });

    it('Check the onClickSkip', () => {
        shallowWrapper.instance().onClickSkip();
    });

    it('Check the onSubmit', () => {
        shallowWrapper.instance().onSubmit();
    });

    it('Check the onPreviousClick', () => {
        shallowWrapper.instance().selectedAnswers = [{
            feedbackQuestionnaireId: 12
        }]
        shallowWrapper.instance().onPreviousClick();
        shallowWrapper.instance().selectedAnswers = []
        shallowWrapper.instance().onPreviousClick();
    });

    it('Check the goBackToPerformTask', () => {
        shallowWrapper.instance().goBackToPerformTask();
    });

    it('Check the mapDispatchToProps fn()', () => {
        let data = {
            servicePlanVisitId: 1,
            serviceProviderId: 2,
            answers: []
        }
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getQuestionsList();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveAnswers(data);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitFeedBack(2);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBackToPerformTask();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSummaryDetails(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSavedSignature(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient(123);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('should test mapStateToProps state', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

});