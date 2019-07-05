import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { VisitServiceDetails, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../utils/userUtility', () => ({
    getUserInfo: () => ({
        isEntityServiceProvider: true,
        serviceProviderId: 12
    }),
    isEntityServiceProvider: () => ({})
}))


jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 12
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
            SummaryState: {
                isLoading: true
            },
            VisitServiceDetailsState: {
                isScheduleLoading: false,
                cancelHiredRequest: 'sdfs',
                disableShowMore: true
            }
        }
    },
    servicerequestState: {
        schedulepreferencesState: {
            daysType: []
        }
    },
    profileState: {
        PersonalDetailState: {
            spBusyInVisit: 'asd' 
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
    history: {
        push: jest.fn()
    },
    ServiceRequestId: 12,
    getSpBusyInVisit: jest.fn(),
    clearVisitServiceHistoryByIdDetail: jest.fn(),
    goToPatientProfile: jest.fn(),
    setPatient: jest.fn(),
    getVisitServiceScheduleSuccess: jest.fn(),
    formDirty: jest.fn(),
    formDirtyPerformTask: jest.fn(),
    isStandByModeOn: {
        isServiceProviderInStandBy: true
    },
    getSavedSignature: jest.fn(),
    formDirtySummaryDetails: jest.fn(),
    cancelServiceRequestByServiceProvider: jest.fn(),
    updateServiceRequestByServiceProvider: jest.fn(),
    cancelInvitedServiceProvider: jest.fn(),
    cancelAppliedServiceProvider: jest.fn(),
    cancelHiredServiceProvider: jest.fn(),
    cancelServiceRequestByServiceProvide: jest.fn(),
    updateEntityServiceVisit: jest.fn(),
    goToDashboard: jest.fn(),
    formDirtyVisitServiceDetails: jest.fn()
}

store = mockStore(defaultState);

describe("VisitServiceDetails", function () {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(
            <VisitServiceDetails dispatch={dispatch} store={store} {...defaultState} />
        )
    });

    it('Check the VisitServiceDetails form body', () => {
        shallowWrapper.setState({
            visitServiceDetails: {
                serviceRequestTypeDetails: [
                    {
                        serviceRequestTypeTaskDetails: [
                            {
                                serviceRequestTypeDetailsId: 12,
                                serviceTaskDescription: 'asdad'
                            }
                        ]
                    }
                ],
                patient: {
                    patientAddresses:[{
                        isPrimaryAddress: true
                    }],
                    lastName: 'sadas',
                    patientId: 12
                }
            },
            serviceType: 12
        })
        expect(shallowWrapper.find('.ProfileHeaderWidget').length).toEqual(1);
    });

    it('Check the componentDidMount section', () => {
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the selectedServiceType', () => {
        shallowWrapper.instance().selectedServiceType({ target: { id: 10 } })
        expect(shallowWrapper.instance().state.serviceType).toEqual(10);
    });

    it('Check the componentWillReceiveProps', () => {
        let nextProps = {
            VisitServiceDetails: {
                patientId: 123,
                serviceRequestTypeDetails: [{
                    serviceRequestTypeDetailsId: 23
                }],
                isLoading: false
            }
        }
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('Check the clickShowMore', () => {
        shallowWrapper.instance().clickShowMore();
    });

    it('Check the onConfirmSerivceRequestMsg', () => {
        shallowWrapper.instance().onConfirmSerivceRequestMsg();
    });

    it('Check the reset', () => {
        shallowWrapper.instance().reset();
    });

    it('Check the showData', () => {
        shallowWrapper.instance().showData();
    });

    it('Check the visitProcessing', () => {
        shallowWrapper.setProps({
            isStandByModeOn: {
                isServiceProviderInStandBy: false
            }
        })
        shallowWrapper.instance().visitProcessing({});
    });

    it('Check the visitProcessingSummary', () => {
        shallowWrapper.instance().visitProcessingSummary({});
    });

    it('Check the getSlotName', () => {
        let slot = {
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening",
            night: 'Night'
        }
        shallowWrapper.instance().getSlotName(slot.morning);
        shallowWrapper.instance().getSlotName(slot.afternoon);
        shallowWrapper.instance().getSlotName(slot.evening);
        shallowWrapper.instance().getSlotName(slot.night);
    });

    it('Check the visitService', () => {
        shallowWrapper.instance().visitService();
    });

    it('Check the showPhoneNumber', () => {
        shallowWrapper.instance().showPhoneNumber();
    });

    it('Check the componentWillUnmount', () => {
        shallowWrapper.instance().componentWillUnmount();
    });

    it('Check the visitSummary', () => {
        shallowWrapper.instance().visitSummary({});
    });

    it('Check the handelPatientProfile', () => {
        shallowWrapper.instance().handelPatientProfile({});
    });

    it('Check the onClickSchedule', () => {
        shallowWrapper.instance().onClickSchedule();
    });

    it('Check the goBackToServiceRequest', () => {
        shallowWrapper.instance().goBackToServiceRequest();
    });
    
    it('Check the onSubmitAssignServiceProvider', () => {
        shallowWrapper.instance().onSubmitAssignServiceProvider();
    });

    it('Check the postServiceRequest', () => {
        let status = {
            isInterested: true,
            isCancel : true
        }
        shallowWrapper.instance().postServiceRequest(status);
        status.isInterested = false
        shallowWrapper.instance().postServiceRequest(status);
        status.isCancel = true
        shallowWrapper.instance().postServiceRequest(status);
    });

    it('Check the onConfirmSerivceRequest', () => {
        let status = {
            isCancel : false,
            status: 36
        }
        shallowWrapper.setProps({
            updateServiceRequestMsgStatus: 1
        })
        shallowWrapper.instance().onConfirmSerivceRequest(status);
        status.isInterested  = true
        shallowWrapper.setProps({
            updateServiceRequestMsgStatus: 2
        })
        shallowWrapper.instance().onConfirmSerivceRequest(status);
        status.isCancel = true
        status.status = 37
        shallowWrapper.instance().onConfirmSerivceRequest(status);
        status.status = 38
        shallowWrapper.instance().onConfirmSerivceRequest(status);
        status.status = 39
        shallowWrapper.instance().onConfirmSerivceRequest(status);
    });

    it('Check the toggle', () => {
        shallowWrapper.setState({
            activeTab: 2
        })
        shallowWrapper.instance().toggle(2);
        shallowWrapper.setState({
            activeTab: 2
        })
        shallowWrapper.instance().toggle('1');
        shallowWrapper.instance().toggle('2');
    });

    it('Check the checkEligibility', () => {
        shallowWrapper.setState({
            visitServiceDetails: {
                patient: {
                    patientId: 12,
                },
                serviceProviderId: 23
            }
        })
        shallowWrapper.instance().checkEligibility();
    });

    it('Check the onClickConversation', () => {
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 0
            }
        })
        shallowWrapper.instance().onClickConversation();
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 1
            }
        })
        shallowWrapper.setState({
            visitServiceDetails: {
                serviceProvider: {
                    coreoHomeUserId: 12
                },
                serviceProviderId: 12
            }
        })
        shallowWrapper.instance().onClickConversation();
    });

    it('Check the onClickVideoConference', () => {
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 0
            }
        })
        shallowWrapper.instance().onClickVideoConference();
        shallowWrapper.setProps({
            VisitServiceDetails: {
                serviceProviderId: 1
            }
        })
        shallowWrapper.setState({
            visitServiceDetails: {
                serviceProvider: {
                    coreoHomeUserId: 12
                },
                serviceProviderId: 12,
                providerFirstName: 'asda',
                providerLastName: 'ssfs',
                providerThumbnail: 'asd/afasf/saf'
            }
        })
        shallowWrapper.instance().onClickVideoConference();
    });


    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getVisitServiceDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceSchedule({}, 1);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).visitService();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getPerformTasksList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateServiceRequestByServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).cancelServiceRequestByServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceEligibilityStatus({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getDays();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goBack();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).dispatchServiceRequestByServiceProvider();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createNewConversation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).createDataStore({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirty();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirtyFeedback();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirtyPerformTask();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSavedSignature({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceVisitId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirtySummaryDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).cancelInvitedServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).cancelAppliedServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).cancelHiredServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearVisitServiceHistoryByIdDetail();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).clearVisitServiceSchedule();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).formDirtyVisitServiceDetails();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getServiceRequestId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToServiceRequestDetailsPage();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getSpBusyInVisit();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).setPatient({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToPatientProfile();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).updateEntityServiceVisit({}, 1);
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).saveContextData({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).goToDashboard();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
        mapDispatchToProps(dispatch).getVisitServiceScheduleSuccess();
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
});