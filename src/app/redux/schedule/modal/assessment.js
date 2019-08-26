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
    duration: data.data.duration,
    addInformation: data.data.additionalDescription,
    assessmentId: 0,
    patientAddress: {
      patientId: data.data.patientId,
      patientAddressId: data.data.SelectedPOS ?  data.data.SelectedPOS : 0,
      streetAddress: data.street,
      city: data.address.city,
      stateName: data.address.stateName,
       stateId : data.address.stateId,
       zipCode : data.address.zip,
       isPrimaryAddress : false,
       state : {
         id : data.data.address.stateId,
         name : data.data.address.stateName
      },
       isActive : true,
       lat : data.latitude,
       lon : data.longitude,
    },
     serviceProviderId : getUserInfo().serviceProviderId,
     patientId : data.data.patientId
  }
}