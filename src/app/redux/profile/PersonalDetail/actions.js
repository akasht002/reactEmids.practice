import axios from 'axios'
import {PERSONAL_DETAIL ,getModal} from './modal'
import { API, baseURL } from '../../../services/api'
import {getDataValueArray} from '../../../utils/validations';
import { startLoading, endLoading } from '../../loading/actions'

export const PersonalDetails = {
  GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
  UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
  GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL',
  GET_CITY_SUCCESS: 'GET_CITY_SUCCESS',
  GET_CITY_DETAIL: 'GET_CITY_DETAIL',
  UPLOAD_IMG_SUCCESS: 'UPLOAD_IMG_SUCCESS',
  UPLOAD_IMG: 'UPLOAD_IMG_SUCCESS',
  GET_GENDER_SUCCESS:'GET_GENDER_SUCCESS,'
}

export { getDataValueArray } from '../../../utils/validations'

export const getPersonalDetailSuccess = data => {
  return {
    type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
    data
  }
}

export const uploadImgSuccess = data => {
  return {
    type: PersonalDetails.UPLOAD_IMG_SUCCESS,
    data
  }
}

export const getCitySuccess = data => {
  return {
    type: PersonalDetails.GET_CITY_SUCCESS,
    data
  }
}

export const getGenderSuccess = data => {
  return {
    type: PersonalDetails.GET_GENDER_SUCCESS,
    data
  }
}


export function getGender () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(baseURL + API.getGender)
      .then(resp => {
        dispatch(getGenderSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getCityDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    axios
      .get(baseURL + API.getCity)
      .then(resp => {
        dispatch(getCitySuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export const updatePersonalDetailSuccess = isSuccess => {
  return {
    type: PersonalDetails.UPDATE_PERSONAL_DETAIL_SUCCESS,
    isSuccess
  }
}

export function uploadImg (data) {
  return (dispatch, getState) => {
    let currstate = getState()
    // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
    // let serviceProviderId = localStorage.getItem('serviceProviderID');
    let serviceProviderId =1
    
    let modal = {
      serviceProviderId: serviceProviderId,
      image: data
    }
    dispatch(startLoading())
    axios
      .post(baseURL + API.uploadImage, modal)
      .then(resp => {
        dispatch(getImage())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getImage () {
  return (dispatch, getState) => {
    let currstate = getState()
    let serviceProviderId = localStorage.getItem('serviceProviderID');
    dispatch(startLoading())
    axios
      .get(baseURL + API.getImage + serviceProviderId)
      .then(resp => {
        dispatch(uploadImgSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getPersonalDetail () {
  return (dispatch, getState) => {
    // let currstate = getState();
    // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
    // let serviceProviderId = localStorage.getItem('serviceProviderID');
      let serviceProviderId = 1
    dispatch(startLoading())
    axios
      .get(baseURL + API.getPersonalDetail + serviceProviderId + '/ProfileView')
      .then(resp => {
        dispatch(getPersonalDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function updatePersonalDetail (data) {
  let modelData  = getModal(data,PERSONAL_DETAIL.UPDATE_PERSONAL_DETAIL)
  let serviceProviderId = 1;
  console.log(modelData);
  return (dispatch, getState) => {    
    dispatch(startLoading())
    axios
      .put(baseURL + API.updatePersonalDetail + serviceProviderId, modelData)
      .then(resp => {
        dispatch(getPersonalDetail())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(getPersonalDetail())
        dispatch(endLoading())
      })
  }
}


export function updateOrganizationDetail (data) {
  let modelData  = getModal(data,PERSONAL_DETAIL.UPDATE_ORGANIZATION_DETAIL)
  let serviceProviderId = 1;
  return (dispatch, getState) => {    
    dispatch(startLoading())
    axios
      .put(baseURL + API.updatePersonalDetail + serviceProviderId, modelData)
      .then(resp => {
        dispatch(getPersonalDetail())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(getPersonalDetail())
        dispatch(endLoading())
      })
  }
}




