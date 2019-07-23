import { API } from '../../../services/api'
import { Get,Post,Delete} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { ACTION_MODEL, getModal } from './modal'
import { getUserInfo } from '../../../services/http'
import { ServiceArea } from './bridge'

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
    let serviceProviderId = getUserInfo().serviceProviderId;
    Get(API.getServiceArea +  serviceProviderId )
      .then(resp => {
        dispatch(getServiceAreaSuccess(resp.data))
      })
      .catch(err => {
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
        if(err.response.status === 400){
          dispatch(getServiceArea())
          dispatch(addServiceAreaSuccess(true))
          dispatch(setPointOfServiceErrorMessage(err.response.data));
        }
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
    Delete(API.deletServiceArea + getUserInfo().serviceProviderId + '/'  + data, data)
      .then(resp => {
        dispatch(getServiceArea())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const setPointOfServiceErrorMessage = data => {
  return {
    type: ServiceArea.setPointOfServiceErrorMessage,
    data
  }
}

export function clearPOSErrorMessage() {
  return {
    type: ServiceArea.clearPOSErrorMessage
  }
};

   








 



