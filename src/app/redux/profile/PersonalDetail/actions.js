import axios from 'axios'
import { API, baseURL } from '../../../services/api'
import _ from 'lodash'
import { startLoading, endLoading } from '../../loading/actions'

export const PersonalDetails = {
  GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
  UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
  GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL',
  GET_CITY_SUCCESS: 'GET_CITY_SUCCESS',
  GET_CITY_DETAIL: 'GET_CITY_DETAIL',
  UPLOAD_IMG_SUCCESS: 'UPLOAD_IMG_SUCCESS',
  UPLOAD_IMG: 'UPLOAD_IMG_SUCCESS'
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
    let serviceProviderId = localStorage.getItem('serviceProviderID');
    
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
    // let serviceProviderId = 1
    // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
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
///console.log(localStorage.getItem("serviceProvider"));
  return (dispatch, getState) => {
    // let currstate = getState();
    // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
    let serviceProviderId = localStorage.getItem('serviceProviderID');
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
  let states = _.split(data.state_id, '-')
  let organization = _.split(data.organization, '-')
  return (dispatch, getState) => {
    // let currstate = getState()
    // let serviceProviderId = 1
    // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
    let serviceProviderId = localStorage.getItem('serviceProviderID');
    let modal = {
      serviceProviderId: serviceProviderId,
      serviceProviderTypeId: 1,
      individual: {
        firstName: data.firstName,
        middleName: 'M',
        lastName: data.lastName,
        age: data.age?data.age:0,
        gender: {
          genderId: 2,
          name: data.genderName?data.genderName:''
        },
        yearOfExperience: data.yearOfExperience? data.yearOfExperience:0,
        affiliation: {
          affiliationId: data.organization ? organization[0] : 0
        }
      },
      entity: {
        organization: data.organization ? organization[1] : ''
      },
      description: data.description,
      hourlyRate: data.hourlyRate?data.hourlyRate:0,
      addresses: [
        {
          addressId: 1,
          serviceProviderId: serviceProviderId,
          addressTypeId: 2,
          streetAddress: data.streetAddress,
          city: data.city,
          state: {
            id: states[0],
            name: states[1]
          },
          zipCode: data.zipCode?data.zipCode:0,
          isActive: true
        }
      ],
      phoneNumber: data.phoneNumber,
      isActive: true
    }    
    dispatch(startLoading())
    axios
      .put(baseURL + API.updatePersonalDetail + serviceProviderId, modal)
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
