import {
    VisitServiceDetails
} from './bridge'
import { serviceRequestDetailsTab } from '../../constants/constants'
const defaultState = {
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

    //New Integration
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
    activeTab: serviceRequestDetailsTab.request,
    visitDate: {},
    savedScheduleType: '',
    isAddNewScheduleClicked: false,
    isEntityDashboard: false,
    isLoadingESPList: false,
    isPaymentAvailable: false,
    editIndividualEditPopup: false
};

const VisitServiceDetailsState = (state = defaultState, action) => {
    switch (action.type) {

        case VisitServiceDetails.getVisitServiceDetailsSuccess:
            return {
                ...state,
                VisitServiceDetails: action.data
            };

        case VisitServiceDetails.setEntityServiceProviderSuccess:
            return {
                ...state,
                entityServiceProviderId: action.data && action.data.serviceProviderId,
                patientId: action.data && action.data.patientId
            };

        case VisitServiceDetails.updateServiceRequestByServiceProviderSuccess:
            return {
                ...state,
                updateServiceRequestMsg: action.data
            };

        case VisitServiceDetails.getVisitServiceScheduleSuccess:
            return {
                ...state,
                VisitServiceSchedule: action.data,
                disableShowMore: action.disableShowMore
            };


        case VisitServiceDetails.getServiceRequestId:
            return {
                ...state,
                ServiceRequestId: action.data
            };

        case VisitServiceDetails.getVisitServiceEligibityStatusSuccess:
            return {
                ...state,
                VisitServiceElibilityStatus: action.data
            };

        case VisitServiceDetails.getDaysSuccess:
            return {
                ...state,
                daysType: action.data
            };

        case VisitServiceDetails.canInitiateConversationSuccess:
            return {
                ...state,
                canInitiateConversation: action.data
            };

        case VisitServiceDetails.isScheduleLoading:
            return {
                ...state,
                isScheduleLoading: action.data
            };

        case VisitServiceDetails.cancelHiredRequest:
            return {
                ...state,
                cancelHiredRequest: action.data
            };

        case VisitServiceDetails.formDirtyVisitServiceDetails:
            return defaultState;

        //New Integration

        case VisitServiceDetails.getServiceRequestListSuccess:
            return {
                ...state,
                visitserviceList: action.data
            };

        case VisitServiceDetails.getSchedulesListSuccess:
            return {
                ...state,
                scheduleList: action.data
            };

        case VisitServiceDetails.getVisitListSuccess:
            return {
                ...state,
                visitList: action.data
            };

        case VisitServiceDetails.getVisitListCountSuccess:
            return {
                ...state,
                visitListCount: action.data
            };

        case VisitServiceDetails.getVisitStatusSuccess:
            return {
                ...state,
                visitStatus: action.data
            };

        case VisitServiceDetails.getServiceVisitDetailsSuccess:
            return {
                ...state,
                serviceVisitDetails: action.data
            };

        case VisitServiceDetails.startLoading:
            return {
                ...state,
                isLoading: true
            };
        case VisitServiceDetails.endLoading:
            return {
                ...state,
                isLoading: false
            };
        case VisitServiceDetails.getEntityServiceProviderListSuccess:
            return {
                ...state,
                entityServiceProvidersList: action.data
            };

        case VisitServiceDetails.disableShowmore:
            return {
                ...state,
                disableShowmore: action.data
            };

        case VisitServiceDetails.clearESPList:
            return {
                ...state,
                entityServiceProvidersList: [],
                // disableShowmore: false
            };
        case VisitServiceDetails.setActiveTab:
            return {
                ...state,
                activeTab: action.data
            };
        case VisitServiceDetails.getfirstlastvisitdateSuccess:
            return {
                ...state,
                visitDate: action.data
            };
        case VisitServiceDetails.saveScheduleType:
            return {
                ...state,
                savedScheduleType: action.data
            };
        case VisitServiceDetails.setAddNewScheduledClicked:
            return {
                ...state,
                isAddNewScheduleClicked: action.data
            };
        case VisitServiceDetails.resetState:
            return {
                ...state,
                VisitServiceDetails: [],
                VisitServiceSchedule: [],
            }
        case VisitServiceDetails.setVisitDate:
            return {
                ...state,
                visitDate: action.data
            };
        case VisitServiceDetails.setEntityDashboard:
            return {
                ...state,
                isEntityDashboard: action.data
            };
        case VisitServiceDetails.loadingESPList:
            return {
                ...state,
                isLoadingESPList: action.data
            }
        case VisitServiceDetails.getPaymentAvailabilitySuccess:
            return {
                ...state,
                isPaymentAvailable: ((action.data && action.data[0].value) === '1') ? true : false
            };
        case VisitServiceDetails.editIndividualEditPopup:
            return {
                ...state,
                editIndividualEditPopup: action.data
            }
        default:
            return state;
    }
}

export default VisitServiceDetailsState;
