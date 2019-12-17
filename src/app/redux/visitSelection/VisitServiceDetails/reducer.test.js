import reducer from './reducer'
import { VisitServiceDetails } from './bridge'


describe('VisitServiceList  reducer test case', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(
            {
                VisitServiceDetails: [],
                VisitServiceSchedule: [],
                ServiceRequestId: '',
                VisitServiceElibilityStatus: '',
                daysType: [],
                updateServiceRequestMsgStatus: 0,
                entityServiceProviderId: 0,
                canInitiateConversation: false,
                isScheduleLoading: false,
                cancelHiredRequest: false,
                disableShowMore: false,
                visitserviceList: [],
                scheduleList: [],
                visitList: [],
                visitListCount: '',
                visitStatus: [],
                serviceVisitDetails: '',
                isLoading: false,
                entityServiceProvidersList: [],
                disableShowmore: false,
                patientId: 0,
                activeTab: '1',
                visitDate: {},
                savedScheduleType: '',
                isAddNewScheduleClicked: false,
                isEntityDashboard: false,
                isLoadingESPList: false,
                isPaymentAvailable: false,
                servicePlanVisitId: 0,
                activePage: 1,
                planScheduleId: 0,
                editIndividualEditPopup: false,
                planId: []
            }
        );
    });

    it("should return the getVisitServiceListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitServiceDetailsSuccess,
            data: data
        })).toEqual(
            {
                VisitServiceDetails: data
            }
        )
    });

    it("should return the setEntityServiceProviderSuccess state", () => {
        let entityServiceProviderId = 10
        let patientId = 10
        expect(reducer(entityServiceProviderId, {
            type: VisitServiceDetails.setEntityServiceProviderSuccess,
            entityServiceProviderId: entityServiceProviderId,
            patientId: patientId
        })).toEqual(
            {
                entityServiceProviderId: entityServiceProviderId,
                patientId: patientId
            }
        )
    });

    it("should return the updateServiceRequestByServiceProviderSuccess state", () => {
        let data = []
        expect(reducer(data, {
            type: VisitServiceDetails.updateServiceRequestByServiceProviderSuccess,
            data: data
        })).toEqual(
            {
                updateServiceRequestMsg: []
            }
        )
    });

    it("should return the getVisitServiceScheduleSuccess state", () => {
        let data = {}
        let disableShowMore = true
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitServiceScheduleSuccess,
            data: data
        })).toEqual(
            {
                VisitServiceSchedule: data,
                disableShowMore: disableShowMore
            }
        )
    });

    it("should return the getServiceRequestId state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getServiceRequestId,
            data: data
        })).toEqual(
            {
                ServiceRequestId: data
            }
        )
    });

    it("should return the getVisitServiceEligibityStatusSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitServiceEligibityStatusSuccess,
            data: data
        })).toEqual(
            {
                VisitServiceElibilityStatus: data
            }
        )
    });


    it("should return the getDaysSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getDaysSuccess,
            data: data
        })).toEqual(
            {
                daysType: data
            }
        )
    });

    it("should return the canInitiateConversationSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.canInitiateConversationSuccess,
            data: data
        })).toEqual(
            {
                canInitiateConversation: data
            }
        )
    });

    it("should return the isScheduleLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.isScheduleLoading,
            data: data
        })).toEqual(
            {
                isScheduleLoading: data
            }
        )
    });

    it("should return the cancelHiredRequest state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.cancelHiredRequest,
            data: data
        })).toEqual(
            {
                cancelHiredRequest: data
            }
        )
    });

    it("should return the getServiceRequestListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getServiceRequestListSuccess,
            data: data
        })).toEqual(
            {
                visitserviceList: data
            }
        )
    });

    it("should return the getSchedulesListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getSchedulesListSuccess,
            data: data
        })).toEqual(
            {
                scheduleList: data
            }
        )
    });

    it("should return the getVisitListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitListSuccess,
            data: data
        })).toEqual(
            {
                visitList: data
            }
        )
    });

    it("should return the getVisitListCountSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitListCountSuccess,
            data: data
        })).toEqual(
            {
                visitListCount: data
            }
        )
    });

    it("should return the getVisitStatusSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getVisitStatusSuccess,
            data: data
        })).toEqual(
            {
                visitStatus: data
            }
        )
    });

    it("should return the getServiceVisitDetailsSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getServiceVisitDetailsSuccess,
            data: data
        })).toEqual(
            {
                serviceVisitDetails: data
            }
        )
    });

    it("should return the startLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.startLoading,
            data: data
        })).toEqual(
            {
                isLoading: data
            }
        )
    });

    it("should return the endLoading state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.endLoading,
            data: data
        })).toEqual(
            {
                isLoading: data
            }
        )
    });

    it("should return the getEntityServiceProviderListSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getEntityServiceProviderListSuccess,
            data: data
        })).toEqual(
            {
                entityServiceProvidersList: data
            }
        )
    });

    it("should return the disableShowmore state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.disableShowmore,
            data: data
        })).toEqual(
            {
                disableShowmore: data
            }
        )
    });

    it("should return the clearESPList state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.clearESPList,
            data: data
        })).toEqual(
            {
                entityServiceProvidersList: data
            }
        )
    });

    it("should return the setActiveTab state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setActiveTab,
            data: data
        })).toEqual(
            {
                activeTab: data
            }
        )
    });

    it("should return the getfirstlastvisitdateSuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getfirstlastvisitdateSuccess,
            data: data
        })).toEqual(
            {
                visitDate: data
            }
        )
    });

    it("should return the saveScheduleType state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.saveScheduleType,
            data: data
        })).toEqual(
            {
                savedScheduleType: data
            }
        )
    });

    it("should return the setAddNewScheduledClicked state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setAddNewScheduledClicked,
            data: data
        })).toEqual(
            {
                isAddNewScheduleClicked: data
            }
        )
    });

    it("should return the resetState state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.resetState,
            data: data
        })).toEqual(
            {
                VisitServiceDetails: [],
                VisitServiceSchedule: []
            }
        )
    });

    it("should return the setVisitDate state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setVisitDate,
            data: data
        })).toEqual(
            {
                visitDate: data
            }
        )
    });

    it("should return the setEntityDashboard state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setEntityDashboard,
            data: data
        })).toEqual(
            {
                isEntityDashboard: data
            }
        )
    });

    it("should return the loadingESPList state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.loadingESPList,
            data: data
        })).toEqual(
            {
                isLoadingESPList: data
            }
        )
    });

    it("should return the getPaymentAvailabilitySuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getPaymentAvailabilitySuccess,
            data: data
        })).toEqual(
            {
                isPaymentAvailable: data
            }
        )
    });

    it("should return the getPaymentAvailabilitySuccess state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getPaymentAvailabilitySuccess,
            data: data
        })).toEqual(
            {
                isPaymentAvailable: data
            }
        )
    });

    it("should return the setServicePlanVisitId state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setServicePlanVisitId,
            data: data
        })).toEqual(
            {
                servicePlanVisitId: data
            }
        )
    });

    it("should return the setActivePage state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setActivePage,
            data: data
        })).toEqual(
            {
                activePage: data
            }
        )
    });

    it("should return the setPlanScheduleId state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.setPlanScheduleId,
            data: data
        })).toEqual(
            {
                planScheduleId: data
            }
        )
    });


    it("should return the editIndividualEditPopup state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.editIndividualEditPopup,
            data: data
        })).toEqual(
            {
                editIndividualEditPopup: data
            }
        )
    });

    it("should return the getPlanId state", () => {
        let data = {}
        expect(reducer(data, {
            type: VisitServiceDetails.getPlanId,
            data: data
        })).toEqual(
            {
                planId: data
            }
        )
    });

});