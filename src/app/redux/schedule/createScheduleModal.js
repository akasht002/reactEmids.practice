export const createScheduleModal = (data) => {
    return {
        planScheduleId: data.planScheduleId,
        name: data.name,
        serviceCategoryIds: data.serviceCategoryIds,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        duration: data.duration,
        description: data.description,
        serviceProviderId: data.serviceProviderId,
        patientId: data.patientId,
        isRecurring: data.isRecurring,
        serviceTypes: data.serviceTypes,
        address: data.address,
        schedulePattern: data.schedulePattern,
        daily: data.daily,
        weekly: data.weekly,
        monthly: data.monthly,
        patientAddressId: data.patientAddressId,
        isPlanEdit: data.isPlanEdit
    }
}
