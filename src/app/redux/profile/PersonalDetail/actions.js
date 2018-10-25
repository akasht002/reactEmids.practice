import {PERSONAL_DETAIL ,getModal} from './modal'
import { API } from '../../../services/api';
import { Get, Post, Put } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { getUserInfo } from '../../../services/http';

export const PersonalDetails = {
  get_personal_detail_success : "profile/get_personal_detail_success",
  update_personal_detail_success:"profile/update_personal_detail_success",
  get_personal_detail : "profile/get_personal_detail",
  get_city_success: 'profile/get_city_success',
  get_city_detail: 'profile/get_city_detail',
  upload_img_success: 'profile/upload_img_success',
  upload_img: 'profile/upload_img',
  get_gender_success:'profile/get_gender_success,',
  get_sp_busy_in_visit_success: 'profile/get_sp_busy_in_visit_success',
  get_affiliation_detail_success:'profile/get_affiliation_detail_success'
}

export { getDataValueArray } from '../../../utils/validations'

export const getPersonalDetailSuccess = data => {
  return {
    type: PersonalDetails.get_personal_detail_success,
    data
  }
}

export const getAffiliationDetailSuccess = data => {
  return {
    type: PersonalDetails.get_affiliation_detail_success,
    data
  }
}

export const uploadImgSuccess = data => {
  return {
    type: PersonalDetails.upload_img_success,
    data
  }
}

export const getCitySuccess = data => {
  return {
    type: PersonalDetails.get_city_success,
    data
  }
}

export const getGenderSuccess = data => {
  return {
    type: PersonalDetails.get_gender_success,
    data
  }
}

export const getSpBusyInVisitSuccess = data => {
  return {
    type: PersonalDetails.get_sp_busy_in_visit_success,
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
    type: PersonalDetails.update_personal_detail_success,
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

export function getSpBusyInVisit () {
  debugger;
  return (dispatch, getState) => {
    let serviceProviderId = getUserInfo().serviceProviderId;
    dispatch(startLoading())
    Get(API.getSpBusyInVisit + serviceProviderId)
      .then(resp => {
        dispatch(getSpBusyInVisitSuccess(resp.data))
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

// clearVal() {
//   dispatch(getSpBusyInVisitSuccess(resp.data = null))
// }




