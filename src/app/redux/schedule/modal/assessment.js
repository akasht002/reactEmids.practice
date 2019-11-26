import { VISIT_TYPE,LATITUDE,LONGITUDE } from '../../../constants/constants'

 export const formatAssessmentData = (data) =>{
  return {
    scheduleTypeId: VISIT_TYPE.assessment,
    startDate: data.data.startDate,
    startTime: data.data.startTime,
    endTime: data.data.endTime,
    duration: data.data.duration,
    addInformation: data.data.additionalDescription,
    assessmentId: data.data.assessmentId,
    patientAddress: {
      patientId: data.data.patientId,
      patientAddressId: data.address.patientAddressId ?  data.address.patientAddressId : 0,
      streetAddress: data.address.streetAddress ? data.address.streetAddress : '',
      city: data.address.city,
      stateName: data.address.stateName,
      stateId : data.address.stateId,
      zipCode : data.address.zip,
      isPrimaryAddress : false,
      state : {
         id : data.address.stateId,
         name : data.address.stateName
      },
      isActive : true,
      lat : data.data.latitude?data.data.latitude:LATITUDE,
      lon : data.data.longitude?data.data.longitude:LONGITUDE,
    },
     serviceProviderId : data.data.serviceProviderId,
     patientId : data.data.patientId
  }
}