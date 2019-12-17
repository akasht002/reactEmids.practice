import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';
import { VistSummary, mapDispatchToProps, mapStateToProps } from './Summary';


Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../services/http', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true,
        serviceProviderTypeId: 'I'
    })
}))

jest.mock('../../redux/navigation/actions', () => ({
    push: jest.fn()
}))

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    QuestionsList: [],
    patientDetails: [],
    ServiceRequestId: 12,
    VisitFeedback: [],
    serviceProvider:{
        firstName:'',
        lastName:''
    },
    serviceRequestTypeVisits :{},
    SummaryDetails: {
        serviceRequestTypeVisits: [],
        serviceRequestVisitId: 155,
        serviceProvider:{
            firstName:'',
            lastName:''
        }
    },
    visitSelectionState:{
            VisitServiceProcessingState:{
                FeedbackState:{
                    QuestionsList:[]
                },
                PerformTasksState:{
                    PerformTasksList:[]
                }
            },
            VisitServiceDetailsState:{
                savedScheduleType:{},
                isPaymentAvailable:true
            }
    },
    dashboardState:{
        individualsListState:{
            activeTab:1
        },
        VisitServiceProviderState:{
            activeTab:1
        },
        isServiceProviderFeedbackTab:true
    },
    visitHistoryState:{
        vistServiceHistoryState:{
            isLoading:true,
            VisitFeedback:[],
            ServiceRequestId:345,
            assessmentQuestionsList:[],
            VisitServiceDetails:{
                serviceProvider:{
                    firstName:'',
                    lastName:''
                },
                serviceRequestTypeVisits :[]
            }
        }
    },
    isLoading: false,
    serviceProviderId: 100,
    getQuestionsList: jest.fn(),
    saveAnswerFeedback: jest.fn(),
    getServiceProviderRating: jest.fn(),
    getVisitFeedBack: jest.fn(),
    goToSummary: jest.fn(),
    onSubmitFeedback: jest.fn(),
    history: {
        push: jest.fn()
    }
};

store = mockStore(defaultState);


describe("VistSummary", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <VistSummary dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VistSummary contains ServiceContent', () => {
        expect(shallowWrapper.find('.ServiceContent').length).toEqual(1);
    });

    it('Check the componentDidMount function', () => {
        shallowWrapper.setProps({ SummaryDetails: { serviceRequestVisitId: '' } })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the toggle  function', () => {
        shallowWrapper.setState({ collapse: false })
        shallowWrapper.instance().toggle();
    });

    it('Check the toggleHiddenScreen function', () => {
        shallowWrapper.setState({ isOpen: false, filterOpen: false })
        shallowWrapper.instance().toggleHiddenScreen();
    });

    it('Check the onConfirm   function', () => {
        shallowWrapper.setState({ ViewFeedbackDetailModal: false })
        shallowWrapper.instance().onConfirm();
    });

    it('Check the toggleFilter  function', () => {
        shallowWrapper.setState({ filterOpen: false })
        shallowWrapper.instance().toggleFilter();
    });

    it('Check the getServiceList function', () => {
        let data = [{
            statusId: 45,
            serviceTaskDescription: 'TEST'
        }]
        let data1 = [{
            statusId: 46,
            serviceTaskDescription: 'TEST'
        }]
        shallowWrapper.instance().getServiceList(data);
        shallowWrapper.instance().getServiceList(data1);
        shallowWrapper.instance().getServiceList([]);
    });

    it('Check the getServiceDetails function', () => {
        let data = [{
            serviceRequestTypeTaskVisits: [{ serviceTypeId: 1 }, { serviceTypeId: 2 }],
            serviceTypeDescription: 'TEST'
        }]
        shallowWrapper.instance().getServiceDetails(data);
    });

    it('Check the togglePersonalDetails  function', () => {
        shallowWrapper.setState({ EditFeedbackDetailModal: false, disabled: true })
        shallowWrapper.instance().togglePersonalDetails([], { targe: { value: '' } });
    });

    it('Check the toggleShowFeedbackDetails  function', () => {
        shallowWrapper.setState({ ViewFeedbackDetailModal: false })
        shallowWrapper.instance().toggleShowFeedbackDetails([], { targe: { value: '' } });
    });

    it('Check the handleSelected   function', () => {
        shallowWrapper.instance().handleSelected([], 20);
    });

    it('Check the handleTextarea   function', () => {
        shallowWrapper.setState({ textareaValue: false, textareaData: { feedbackQuestionnaireId: 10, answerName: 'TEST' } })
        shallowWrapper.instance().handleTextarea({ target: { value: '555' } }, 1);
    });

    it('Check the handleSelectedRating   function', () => {
        shallowWrapper.setState({ rating: 10 })
        shallowWrapper.instance().handleSelectedRating({ target: { value: 10 } });
    });

    it('Check the onClickNext function', () => {
        shallowWrapper.instance().onClickNext();
    });

    it('Check the onClickConfirm function', () => {
        shallowWrapper.instance().onClickConfirm();
    });

    it('Check the onSubmit function', () => {
        shallowWrapper.instance().onSubmit ();
    });

    it('Check the getFeedback function', () => {
        shallowWrapper.instance().getFeedback  ();
    });

    it('Check the getFeedbackContent function', () => {
        shallowWrapper.instance().getFeedbackContent   ();
    });

    it('Check maptoprops', () => {
        const initialState = {
            visitSelectionState:
            {
                VisitServiceProcessingState: {
                    FeedbackState: {
                        QuestionsList: []
                    },
                    PerformTasksState: {
                        PerformTasksList: []
                    }
                }
            },
            visitHistoryState: {
                vistServiceHistoryState: {
                    ServiceRequestId: 12,
                    VisitFeedback: [],
                    isLoading: false
                }
            }
        }
        expect(mapStateToProps(initialState)).toBeDefined();
    });

    it('Check mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getQuestionsList();
        mapDispatchToProps(dispatch).saveAnswerFeedback();
        mapDispatchToProps(dispatch).getServiceProviderRating();
        mapDispatchToProps(dispatch).getVisitFeedBack();
        mapDispatchToProps(dispatch).goToSummary();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

}); 
