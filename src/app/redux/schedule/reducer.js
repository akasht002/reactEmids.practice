import { Schedule } from './bridge'

const defaultState = {
    serviceCategoryList: [],
    serviceTypeList: [],
    patientAddressList: [],
    stateList: [],
    posErrorMessage: '',
    isPosAddressValid: false,
    entityServiceProvidersList: [],
    recurringPatternList: [],
    daysList: [],
    disableShowmore: false, assessmentDetails: {},
    assessmentSuccess: false,
    individualSchedulesDetails: '',
    isIndividualScheduleEdit: false
};

const scheduleState = (state = defaultState, action) => {
    switch (action.type) {

        case Schedule.getServiceCategorySuccess:
            return {
                ...state,
                serviceCategoryList: action.data
            };

        case Schedule.getServiceTypeSuccess:
            return {
                ...state,
                serviceTypeList: action.data
            };

        case Schedule.getPatientAddressSuccess:
            return {
                ...state,
                patientAddressList: action.data
            };

        case Schedule.getStateSuccess:
            return {
                ...state,
                stateList: action.data
            };

        case Schedule.setSelectedPos:
            return {
                ...state,
                posErrorMessage: action.updatedData
            }

        case Schedule.getValidPatientAddressSuccess:
            return {
                ...state,
                isPosAddressValid: action.data
            };

        case Schedule.getEntityServiceProviderListSuccess:
            return {
                ...state,
                entityServiceProvidersList: action.data
            };

        case Schedule.getRecurringPatternSuccess:
            return {
                ...state,
                recurringPatternList: action.data
            };

        case Schedule.getDaysSuccess:
            return {
                ...state,
                daysList: action.data
            };

        case Schedule.disableShowmore:
            return {
                ...state,
                disableShowmore: action.data
            };

        case Schedule.clearESPList:
            return {
                ...state,
                entityServiceProvidersList: [],
                daysList: []
            };

        case Schedule.getAssessmentDetailSuccess:
            return {
                ...state,
                assessmentDetails: action.data
            };

        case Schedule.createOrEditAssessmentSuccess:
            return {
                ...state,
                assessmentSuccess: action.data
            };

        case Schedule.getIndividualSchedulesDetailsSuccess:
            return {
                ...state,
                individualSchedulesDetails: action.data
            }; 

        case Schedule.isScheduleEdit:
            return {
                ...state,
                isIndividualScheduleEdit: action.data
            }; 

        default:
            return state;
    }
}

export default scheduleState;
