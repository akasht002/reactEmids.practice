import {    
    getUserInfo
} from '../../../services/http'

 import { PLAN_TYPE } from '../../../constants/constants'

 export const formatAssessmentData = (data) =>{
  return {
    scheduleTypeId: PLAN_TYPE.assessment,
    startDate: data.data.startDate,
    startTime: data.data.startTime,
    endTime: data.data.endTime,
    duration: parseFloat(data.data.duration,10),
    addInformation: data.data.additionalDescription,
    assessmentId: 0,
    patientAddress: {
      patientId: data.data.patientId,
      patientAddressId: data.address.patientAddressId ?  data.address.patientAddressId : 411,
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
      lat : data.data.latitude?data.data.latitude:11.2,
      lon : data.data.longitude?data.data.longitude:98.3,
    },
     serviceProviderId : data.data.serviceProviderId,
     patientId : data.data.patientId
  }
}