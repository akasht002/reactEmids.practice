import { API } from '../../../services/api'
import { Get,Post,Delete} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { ACTION_MODEL, getModal } from './modal'
import { getUserInfo } from '../../../services/http'
import {getPatientData, isPatientGuardian} from '../../../utils/userUtility';


export const ServiceArea = {
  getServiceAreaSuccess: 'get_ServiceArea_success/ServiceArea',
   addServiceAreaSuccess: 'add_ServiceArea_success/ServiceArea',
  getServiceAreaFieldDetails: 'get_ServiceArea_Field_Details/ServiceArea',
}

export const getServiceAreaSuccess = data => {  
  return {
    type: ServiceArea.getServiceAreaSuccess,
    data
  }
}
export const addServiceAreaSuccess = data => {
  return {
    type: ServiceArea.addServiceAreaSuccess,
    data
  }
}
export const getServiceAreaFieldDetails = data => { 
  return {
    type: ServiceArea.getServiceAreaFieldDetails,
    data
  }
}

export function getServiceArea() {
  return (dispatch) => {   
    dispatch(startLoading())
    Get(API.getServiceArea +getUserInfo().serviceProviderId )
      .then(resp => {
        dispatch(getServiceAreaSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function addServiceArea(data) {
  let modelData = getModal(data, ACTION_MODEL.ADD_DATA)
  return (dispatch) => {
    dispatch(startLoading())
    Post(
        API.addServiceArea,
        modelData
      )
      .then(resp => {
        dispatch(addServiceAreaSuccess(true))
        dispatch(getServiceArea())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function editServiceArea (data){
  return (dispatch) => {   
    dispatch(startLoading())
    Get(API.editServiceArea + getUserInfo().serviceProviderId +'/'+ data)
      .then(resp => {
        dispatch(getServiceAreaFieldDetails(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function updateServiceArea(data) {
  let modelData = getModal(data, ACTION_MODEL.UPDATE_DATA)
  return (dispatch) => {
    dispatch(startLoading())
    Post(
        API.addServiceArea,
        modelData
      )
      .then(resp => {
        dispatch(addServiceAreaSuccess(true))
        dispatch(getServiceArea())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function deletePointService(data) {
  return (dispatch) => {
    dispatch(startLoading())
    Delete(API.deletServiceArea + getUserInfo().serviceProviderId, data)
      .then(resp => {
        dispatch(getServiceArea())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}




   








 



