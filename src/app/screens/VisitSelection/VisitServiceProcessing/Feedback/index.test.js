import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { Feedback } from './index.js';

jest.mock('../../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    QuestionsList: [{"feedbackQuestionnaireId":6,"question":"How was the individual feeling today?","answers":[{"id":6001,"answerName":"Normal","feedbackQuestionnaireId":0},{"id":6002,"answerName":"Better than Normal","feedbackQuestionnaireId":0},{"id":6003,"answerName":"Worse than Normal","feedbackQuestionnaireId":0}],"answerType":50,"answerTypeDescription":"ChoiceBased","questionType":49,"selectedAnswer":null,"rating":0}],
    serviceRequestId: 1,
    VisitFeedback: [],
    patientDetails: {
        serviceRequestId: 1
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
    history: {
        push: jest.fn()
    }
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
        expect(wrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the toggle', () => {
        shallowWrapper.instance().toggle();
        expect(shallowWrapper.instance().state.collapse).toEqual(true);
    });

    it('Check the componentDidMount', () => {
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile(1);
    });

    it('Check the handleSelected', () => {
        shallowWrapper.instance().handleSelected([], 10);
    });

    it('Check the handleTextarea', () => {
        shallowWrapper.instance().handleTextarea({ target: { value: 'TEST' } }, 1);
    });

    it('Check the onClickNext', () => {
        shallowWrapper.setState({textareaData: 'TEST'})
        shallowWrapper.instance().onClickNext();
    });

    it('Check the onClickConfirm', () => {
        shallowWrapper.instance().onClickConfirm();
    });

    it('Check the onSubmit', () => {
        shallowWrapper.instance().onSubmit();
    });

    it('Check the onPreviousClick', () => {
        shallowWrapper.instance().onPreviousClick();
    });

    it('Check the goBack', () => {
        shallowWrapper.instance().goBack();
    });

});