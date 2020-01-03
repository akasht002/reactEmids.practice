import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

import { VisitServiceDetails, mapDispatchToProps, mapStateToProps } from './index';

jest.mock('../../ScreenCover/AsideScreenCover', () => ({
    AsideScreenCover: 'mockAsideScreenCover'
}))

jest.mock('../../../services/http', () => ({
    getUserInfo: () => ({
        serviceProviderId: 100
    }),
    isEntityServiceProvider: () => ({})
}))

jest.mock('../../../utils/userUtility', () => ({
    isEntityUser: () => ({})
}))

Enzyme.configure({ adapter: new Adapter() })

let store;
const mockStore = configureStore();
const dispatch = sinon.spy();
const defaultState = {
    visitserviceList: [],
    ServiceRequestId: 10,
    VisitServiceDetails: {},
    scheduleList: [],
    visitList: [],
    visitListCount: 100,
    entityServiceProvidersList: [],
    visitStatus: "Open",
    serviceVisitDetails: {},
    isLoading: false,
    disableShowmore: true,
    activeTab: "1",
    daysType: [],
    visitDate: {},
    ServiceCategory: [],
    ServiceType: [],
    spBusyInVisit: false,
    patientId: 1000,

    authState: {
        userState: {
            userData: {
                userInfo: {}
            }
        }
    },
    visitSelectionState: {
        VisitServiceDetailsState: {
            visitserviceList: [],
            ServiceRequestId: 10,
            VisitServiceDetails: {},
            scheduleList: [],
            visitList: [],
            visitListCount: 100,
            entityServiceProvidersList: [],
            visitStatus: "Open",
            serviceVisitDetails: {},
            isLoading: false,
            disableShowmore: true,
            activeTab: "1",
            daysType: [],
            visitDate: {}
        },
        ServiceRequestFilterState: {
            ServiceCategory: [],
            ServiceType: []
        }
    },
    profileState: {
        PersonalDetailState: {
            spBusyInVisit: false
        }
    },
    patientProfileState: {
        patientId: 1000
    },
    getServiceRequestList: jest.fn(),
    getVisitServiceDetails: jest.fn(),
    goBack: jest.fn(),
    getSchedulesList: jest.fn(),
    goToAddSchedule: jest.fn(),
    getVisitList: jest.fn(),
    getEntityServiceProviderList: jest.fn(),
    getServiceCategory: jest.fn(),
    getServiceType: jest.fn(),
    ServiceRequestStatus: jest.fn(),
    getVisitStatus: jest.fn(),
    getServiceVisitDetails: jest.fn(),
    updateServiceVisit: jest.fn(),
    assignESP: jest.fn(),
    selectESP: jest.fn(),
    clearESPList: jest.fn(),
    getEntityServiceProviderListSearch: jest.fn(),
    getIndividualSchedulesDetails: jest.fn(),
    getVisitServiceHistoryByIdDetail: jest.fn(),
    getPerformTasksList: jest.fn(),
    formDirty: jest.fn(),
    formDirtyFeedback: jest.fn(),
    formDirtyPerformTask: jest.fn(),
    getServiceVisitId: jest.fn(),
    getSummaryDetails: jest.fn(),
    getSavedSignature: jest.fn(),
    formDirtySummaryDetails: jest.fn(),
    getAssessmentDetailsById: jest.fn(),
    cancelHiredServiceProvider: jest.fn(),
    acceptservicerequest: jest.fn(),
    updateHireStatusForServiceRequest: jest.fn(),
    getDays: jest.fn(),
    clearESPListSchedule: jest.fn(),
    clearServiceType: jest.fn(),
    clearServiceCategory: jest.fn(),
    getfirstlastvisitdate: jest.fn(),
    setAddNewScheduledClicked: jest.fn(),
    setActivePage: jest.fn(),
    setActiveTab: jest.fn(),
    goToAssessmentVisitProcessing: jest.fn(),
    saveScheduleType: jest.fn(),
    getAssessmentQuestionsList: jest.fn(),
    goToVisitList: jest.fn(),
    createNewConversation: jest.fn(),
    saveContextData: jest.fn(),
    createDataStore: jest.fn(),
    setServicePlanVisitId: jest.fn(),
    setPlanScheduleId: jest.fn(),
    resetServiceDetails: jest.fn(),
    editIndividualEditPopup: jest.fn(),
    setEntityDashboard: jest.fn(),
    modifiedPlanId: jest.fn()
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
        expect(shallowWrapper).toBeDefined();
    });

    it('Check the componentDidMount section', () => {
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the componentDidMount section 0 ', () => {
        shallowWrapper.setProps({ ServiceRequestId: 0 })
        shallowWrapper.instance().componentDidMount()
    });

    it('Check the toggleToolTip', () => {
        shallowWrapper.setState({ tooltipOpen: false })
        shallowWrapper.instance().toggleToolTip()
    });

    it('Check the getVisitList ', () => {
        shallowWrapper.instance().getVisitList()
    });

    it('Check the toggle  1', () => {
        shallowWrapper.instance().toggle(1)
    });

    it('Check the toggle  2', () => {
        shallowWrapper.instance().toggle(2)
    });

    it('Check the handelDetails', () => {
        shallowWrapper.instance().handelDetails(1)
    });

    it('Check the handelReject ', () => {
        shallowWrapper.instance().handelReject(1)
    });

    it('Check the reject  ', () => {
        shallowWrapper.instance().reject()
    });

    it('Check the handelCancel  ', () => {
        shallowWrapper.instance().handelCancel(1)
    });

    it('Check the handelAccept  ', () => {
        shallowWrapper.instance().handelAccept(1)
    });

    it('Check the handelEngage   ', () => {
        shallowWrapper.instance().handelEngage(1)
    });

    it('Check the accept   ', () => {
        shallowWrapper.instance().accept()
    });

    it('Check the engage   ', () => {
        shallowWrapper.instance().engage()
    });

    it('Check the addSchedule   ', () => {
        shallowWrapper.instance().addSchedule()
    });

    it('Check the getModalData    ', () => {
        shallowWrapper.instance().getModalData(1, 10, true)
    });

    it('Check the handleChangeSchedule true', () => {
        shallowWrapper.instance().handleChangeSchedule({ target: { id: 20, checked: true } })
    });

    it('Check the handleChangeSchedule false', () => {
        shallowWrapper.instance().handleChangeSchedule({ target: { id: 20, checked: false } })
    });

    it('Check the pageNumberChange    ', () => {
        shallowWrapper.instance().pageNumberChange(1)
    });

    it('Check the toggleFilter     ', () => {
        shallowWrapper.instance().toggleFilter()
    });

    it('Check the handleChangeServiceCategory     ', () => {
        shallowWrapper.instance().handleChangeServiceCategory(1)
    });

    it('Check the handleserviceType true', () => {
        const data = 1
        shallowWrapper.instance().handleserviceType(data, { target: { checked: true } });
    });

    it('Check the handleserviceType false', () => {
        const data = 1
        shallowWrapper.instance().handleserviceType(data, { target: { checked: false } });
    });


    it('Check the handleEsp  true', () => {
        const data = 1
        shallowWrapper.instance().handleEsp(data, { target: { checked: true } });
    });

    it('Check the handleEsp false', () => {
        const data = 1
        shallowWrapper.instance().handleEsp(data, { target: { checked: false } });
    });

    it('Check the dateChanged      ', () => {
        shallowWrapper.instance().dateChanged("09/04/2019")
    });

    it('Check the dateChangedRaw       ', () => {
        shallowWrapper.instance().dateChangedRaw({target: {value: "09/04/2019"}})
    });

    it('Check the todateChanged       ', () => {
        shallowWrapper.instance().todateChanged("09/04/2019")
    });

    it('Check the todateChangedRaw       ', () => {
        shallowWrapper.instance().todateChangedRaw({target: {value: "09/04/2019"}})
    });

    it('Check the handleChangeserviceStatus true', () => {
        const data = {
            id: 20
        }
        shallowWrapper.instance().handleChangeserviceStatus(data, { target: { checked: true } });
    });

    it('Check the handleChangeserviceStatus false', () => {
        const data = {
            id: 20
        }
        shallowWrapper.instance().handleChangeserviceStatus(data, { target: { checked: false } });
    });

    it('Check the applyFilter', () => {
        shallowWrapper.instance().applyFilter()
    });

    it('Check the applyReset', () => {
        shallowWrapper.instance().applyReset()
    });

    it('Check the dateChangedEdit        ', () => {
        shallowWrapper.instance().dateChangedEdit("09/04/2019")
    });

    it('Check the dateChangedRawEdit        ', () => {
        shallowWrapper.instance().dateChangedRawEdit({target: {value: "09/04/2019"}})
    });

    it('Check the toggleEditModal ', () => {
        shallowWrapper.instance().toggleEditModal(111)
    });

    it('Check the handleChangeDuration', () => {
        shallowWrapper.instance().handleChangeDuration("17:00")
    });

    it('Check the handleChangeEndTime ', () => {
        shallowWrapper.instance().handleChangeEndTime("17:00")
    });

    it('Check the handleChangeStartTime ', () => {
        shallowWrapper.instance().handleChangeStartTime("17:00")
    });

    it('Check the handleChangeSelectedSp  ', () => {
        shallowWrapper.instance().handleChangeSelectedSp(11)
    });

    it('Check the handleAssignServiceProvider   ', () => {
        shallowWrapper.instance().handleAssignServiceProvider(11)
    });

    it('Check the updateServiceVisits    ', () => {
        shallowWrapper.instance().updateServiceVisits()
    });

    it('Check the onSubmitAssignServiceProvider    ', () => {
        shallowWrapper.instance().onSubmitAssignServiceProvider(11)
    });

    it('Check the toggleSearch true', () => {
        shallowWrapper.setState({ searchOpen: true })
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the toggleSearch false', () => {
        shallowWrapper.setState({ searchOpen: false })
        shallowWrapper.instance().toggleSearch()
    });

    it('Check the handleSearchkeyword', () => {
        shallowWrapper.instance().handleSearchkeyword({ target: { value: 22 } });
    });

    it('Check the handleSearchData ', () => {
        shallowWrapper.instance().handleSearchData({
            preventDefault: () => {
            }
        });
    });

    it('Check the clickShowMore  ', () => {
        shallowWrapper.instance().clickShowMore();
    });

    it('Check the  rowPageChange   ', () => {
        shallowWrapper.instance().rowPageChange(10);
    });

    it('Check the  visitProcessing    true', () => {
        shallowWrapper.setProps({ isStandByModeOn: { isServiceProviderInStandBy: true } })
        shallowWrapper.instance().visitProcessing(10);
    });

    it('Check the  visitProcessing    false', () => {
        shallowWrapper.setProps({ isStandByModeOn: { isServiceProviderInStandBy: false } })
        shallowWrapper.instance().visitProcessing(10);
    });

    it('Check the  visitProcessingSummary    ', () => {
        shallowWrapper.instance().visitProcessingSummary(10);
    });

    it('Check the  visitSummary    ', () => {
        shallowWrapper.instance().visitSummary(10, 20, 114);
    });

    it('Check the  close     ', () => {
        shallowWrapper.instance().close();
    });

    it('Check the  handelEditShedule     ', () => {
        shallowWrapper.instance().handelEditShedule(10);
    });

    it('Check the gotoAssessmentVisit', () => {
        shallowWrapper.instance().gotoAssessmentVisit ();
    });

    it('Check the  handelEditAssessment     ', () => {
        shallowWrapper.instance().handelEditAssessment(10);
    });

    it('Check the  navigateToparticularPageBasedonId      ', () => {
        shallowWrapper.instance().handelEditAssessment(45);
    });

    it('Check the  navigateToparticularPageBasedonId      ', () => {
        shallowWrapper.setProps({
            ServiceRequestId: 30 
        })
        shallowWrapper.instance().componentDidMount();
    });

    it('Check the  navigateToparticularPageBasedonId      ', () => {
        shallowWrapper.setProps({
            isEditIndividualEditPopup: true 
        })
        shallowWrapper.instance().componentDidUpdate();
    });

    it('Check the  componentWillUnmount      ', () => {
        shallowWrapper.instance().componentWillUnmount();
    });

    it('should return navigateToparticularPageBasedonId', () => {
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 43});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 44});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 45});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 90});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 43});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: 43});
        shallowWrapper.instance().navigateToparticularPageBasedonId ({visitStatusId: null});
    })

    it('Check the  gotoAssessmentVisit       ', () => {
        shallowWrapper.instance().gotoAssessmentVisit ();
    });

    it('Check mapDispatchToProps actions', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getServiceRequestList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getVisitServiceDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).goBack({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getSchedulesList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).goToAddSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getVisitList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getEntityServiceProviderList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getServiceCategory({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).ServiceRequestStatus({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getVisitStatus({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getServiceVisitDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).updateServiceVisit({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).assignESP({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).selectESP({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).clearESPList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getEntityServiceProviderListSearch({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getIndividualSchedulesDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getVisitServiceHistoryByIdDetail({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getPerformTasksList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).formDirty({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).formDirtyFeedback({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).formDirtyPerformTask({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getServiceVisitId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getSummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getSavedSignature({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).formDirtySummaryDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getAssessmentDetailsById({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).cancelHiredServiceProvider({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).acceptservicerequest({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).updateHireStatusForServiceRequest({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getDays({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).clearESPListSchedule({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).clearServiceType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).clearServiceCategory({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getfirstlastvisitdate({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).goToAssessmentVisitProcessing({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).saveScheduleType({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).getAssessmentQuestionsList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).visitServiceList({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setAddNewScheduledClicked({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setActiveTab({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).onCreateNewConversation({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).saveContextData({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).createDataStore({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setActivePage({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setServicePlanVisitId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setPlanScheduleId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).resetServiceDetails({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).editIndividualEditPopup({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).setEntityDashboard({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();

        mapDispatchToProps(dispatch).modifiedPlanId({});
        expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    it('Check mapStateToProps', () => {
        expect(mapStateToProps(defaultState)).toBeDefined();
    });

    // it('Check the events', () => {
    //     expect(shallowWrapper.find('[test-msgModal="test-msgModal"]').props().onConfirm());
    //     expect(shallowWrapper.find('[test-msgModal="test-msgModal"]').props().onCancel());
    //     expect(shallowWrapper.find('[test-confirmModal="test-confirmModal"]').props().onConfirm());
    //     expect(shallowWrapper.find('[test-confirmModal="test-confirmModal"]').props().onCancel());
    //     expect(shallowWrapper.find('[test-phoneModal="test-phoneModal"]').props().onConfirm());
    //     expect(shallowWrapper.find('[test-conversationModal="test-conversationModal"]').props().onConfirm());
    //     expect(shallowWrapper.find('[test-standByModal="test-standByModal"]').props().onConfirm());
    //     expect(shallowWrapper.find('[className="ProfileImage"]').props().onClick());
    //     expect(shallowWrapper.find('[class="ProfileDetailsName"]').props().onClick());
    // });
});