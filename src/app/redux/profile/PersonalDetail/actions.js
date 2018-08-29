import axios from 'axios'
import {PERSONAL_DETAIL ,getModal} from './modal'
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions'
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

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
    let serviceProviderId = localStorage.getItem('serviceProviderID');    
    let modal = {
      serviceProviderId: SERVICE_PROVIDER_TYPE_ID,
      image: data
    }
    dispatch(startLoading())
    axios
      .post(baseURL + API.uploadImage, modal)
      .then(resp => {
        dispatch(getImage())
        dispatch(getProfilePercentage())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getImage () {
  return (dispatch, getState) => {
    let serviceProviderId = localStorage.getItem('serviceProviderID');
    dispatch(startLoading())
    axios
      .get(baseURL + API.getImage + SERVICE_PROVIDER_TYPE_ID)
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
    let serviceProviderId = localStorage.getItem('serviceProviderID');
    dispatch(startLoading())
    axios
      .get(baseURL + API.getPersonalDetail + SERVICE_PROVIDER_TYPE_ID + '/ProfileView')
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
  let serviceProviderId = localStorage.getItem('serviceProviderID');
  return (dispatch, getState) => {    
    dispatch(startLoading())
    axios
      .put(baseURL + API.updatePersonalDetail + SERVICE_PROVIDER_TYPE_ID, modelData)
      .then(resp => {
        dispatch(getPersonalDetail())
        dispatch(getProfilePercentage())
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
  let serviceProviderId = localStorage.getItem('serviceProviderID');
  return (dispatch, getState) => {    
    dispatch(startLoading())
    axios
      .put(baseURL + API.updatePersonalDetail + SERVICE_PROVIDER_TYPE_ID, modelData)
      .then(resp => {
        dispatch(getPersonalDetail())
        dispatch(getProfilePercentage())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(getPersonalDetail())
        dispatch(endLoading())
      })
  }
}




