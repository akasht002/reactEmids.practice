import {PERSONAL_DETAIL ,getModal} from './modal'
import { API } from '../../../services/api';
import { Get, Post, Put } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { getUserInfo } from '../../../services/http';

export const PersonalDetails = {
  GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
  UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
  GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL',
  GET_CITY_SUCCESS: 'GET_CITY_SUCCESS',
  GET_CITY_DETAIL: 'GET_CITY_DETAIL',
  UPLOAD_IMG_SUCCESS: 'UPLOAD_IMG_SUCCESS',
  UPLOAD_IMG: 'UPLOAD_IMG_SUCCESS',
  GET_GENDER_SUCCESS:'GET_GENDER_SUCCESS,',
  GET_AFFILIATION_DETAIL_SUCCESS:'GET_AFFILIATION_DETAIL_SUCCESS'
}

export { getDataValueArray } from '../../../utils/validations'

export const getPersonalDetailSuccess = data => {
  return {
    type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
    data
  }
}

export const getAffiliationDetailSuccess = data => {
  return {
    type: PersonalDetails.GET_AFFILIATION_DETAIL_SUCCESS,
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
  return (dispatch) => {
    dispatch(startLoading())
    Get(API.getGender)
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
    Get(API.getCity)
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
    let serviceProviderId = getUserInfo().serviceProviderId;    
    let modal = {
      serviceProviderId: serviceProviderId,
      image: data
    }
    dispatch(startLoading())
    Post(API.uploadImage, modal)
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
    let serviceProviderId = getUserInfo().serviceProviderId;
    dispatch(startLoading())
    Get(API.getImage + serviceProviderId)
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
    let serviceProviderId = getUserInfo().serviceProviderId;
    dispatch(startLoading())
    Get(API.getPersonalDetail + serviceProviderId + '/ProfileView')
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
  let serviceProviderId = getUserInfo().serviceProviderId;
  return (dispatch, getState) => {    
    dispatch(startLoading())
    Put(API.updatePersonalDetail + serviceProviderId, modelData)
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
  let serviceProviderId = getUserInfo().serviceProviderId;
  return (dispatch, getState) => {    
    dispatch(startLoading())
    Put(API.updatePersonalDetail + serviceProviderId, modelData)
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

export function updateEntityDetail (data) {
  let modelData  = getModal(data,PERSONAL_DETAIL.UPDATE_ENTITY_DETAIL)
  let serviceProviderId = getUserInfo().serviceProviderId;
  return (dispatch, getState) => {    
    dispatch(startLoading())
    Put(API.updatePersonalDetail + serviceProviderId, modelData)
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


export function getAffiliationDetail () {
  return (dispatch, getState) => {
    dispatch(startLoading())
    Get(API.getAffiliationDetail)
      .then(resp => {
        dispatch(getAffiliationDetailSuccess(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}




