import { Schedule } from './bridge'

import scheduleState from './reducer'


describe('scheduleState reducer', () => {
    it('should return the initial state', () => {
        expect(scheduleState(undefined, {})).toBeDefined()
    })

    it('should handle scheduleState get_conversation_detail_success', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getServiceCategorySuccess,
                data:data
            })
        ).toEqual({ serviceCategoryList: data }) 

    })

    it('should handle scheduleState getServiceTypeSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getServiceTypeSuccess,
                data:data
            })
        ).toEqual({ serviceTypeList: data }) 

    })

    it('should handle scheduleState getPatientAddressSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getPatientAddressSuccess,
                data:data
            })
        ).toEqual({ patientAddressList: data }) 

    })

    it('should handle scheduleState getStateSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getStateSuccess,
                data:data
            })
        ).toEqual({ stateList: data }) 

    })

    it('should handle scheduleState setSelectedPos', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.setSelectedPos,
                updatedData:data
            })
        ).toEqual({ posErrorMessage: data }) 

    })

    it('should handle scheduleState getValidPatientAddressSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getValidPatientAddressSuccess,
                data:data
            })
        ).toEqual({ isPosAddressValid: data }) 

    })

    it('should handle scheduleState getEntityServiceProviderListSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getEntityServiceProviderListSuccess,
                data:data
            })
        ).toEqual({ entityServiceProvidersList: data }) 

    })

    it('should handle scheduleState getRecurringPatternSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getRecurringPatternSuccess,
                data:data
            })
        ).toEqual({ recurringPatternList: data }) 

    })

    it('should handle scheduleState getDaysSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getDaysSuccess,
                data:data
            })
        ).toEqual({ daysList: data }) 

    })

    it('should handle scheduleState disableShowmore', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.disableShowmore,
                data:data
            })
        ).toEqual({ disableShowmore: data }) 

    })

    it('should handle scheduleState clearESPListSchedule', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.clearESPListSchedule,
                data:data
            })
        ).toEqual({ entityServiceProvidersList: [],daysList: []}) 

    })

    it('should handle scheduleState getAssessmentDetailSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getAssessmentDetailSuccess,
                data:data
            })
        ).toEqual({ assessmentDetails: data }) 

    })

    it('should handle scheduleState createOrEditAssessmentSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.createOrEditAssessmentSuccess,
                data:data
            })
        ).toEqual({ assessmentSuccess: data }) 

    })

    it('should handle scheduleState getIndividualSchedulesDetailsSuccess', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.getIndividualSchedulesDetailsSuccess,
                data:data
            })
        ).toEqual({ individualSchedulesDetails: data }) 

    })

    it('should handle scheduleState isScheduleEdit', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.isScheduleEdit,
                data:data
            })
        ).toEqual({ isIndividualScheduleEdit: data }) 

    })

    it('should handle scheduleState isAssessmentEdit', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.isAssessmentEdit,
                data:data
            })
        ).toEqual({ isAssessmentEdit: data }) 

    })

    it('should handle scheduleState clearServiceDetails', () => {
        let data = {}
        expect(
            scheduleState([], {
                type: Schedule.clearServiceDetails,
                data:data
            })
        ).toEqual({ 
                assessmentDetails: {},
                individualSchedulesDetails: {}
         }) 

    })
});