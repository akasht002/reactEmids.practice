import { API } from '../../../services/api'
import { Get, Post } from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions'
import { getUserInfo } from '../../../services/http'
import { ServiceOffered } from './bridge';

export const getServicesOfferedSuccess = data => {
  return {
    type: ServiceOffered.getServicesOfferedSuccess,
    data
  }
}

export const getServiceOfferedDetails = data => {
  return {
    type: ServiceOffered.getServiceOfferedDetails,
    data
  }
}

export function getServiceOffered() {
  return (dispatch, getState) => {
    let serviceProviderId = getUserInfo().serviceProviderId;
    if(getState().profileState.PersonalDetailState.serviceProviderId){
      serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
  };
    dispatch(startLoading())
    return Get(API.getServiceOffered + serviceProviderId + '/Offer/Selected')
      .then(resp => {
        if(resp.data.length > 0) {
          resp.data[0].isOpen = true;
        }
        dispatch(getServicesOfferedSuccess(resp.data));
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function addServiceOfferd(data) {
  
  let result = data.map((item) => {
    return item.categoryId
  });
  
  let categoryId = result.filter(function (item, i) {
    return result.indexOf(item) === i;
  })

  let modelData = categoryId.map((category) =>{
     return ({
      "categoryId": category,
      "serviceType": data.filter((obj) => {
        return obj.categoryId === category && delete obj.categoryId;
        // if(obj.categoryId === category){
        //   return delete obj.categoryId;
        // }
      })
     })
  })

  return dispatch => {
    let serviceProviderId = getUserInfo().serviceProviderId;
    dispatch(startLoading())
    return Post(API.addServiceOffered + serviceProviderId + '/Offer', modelData)
      .then(resp => {
        dispatch(getServiceOffered())
        dispatch(editServiceOffered())
        dispatch(getProfilePercentage())
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function editServiceOffered(data) {
  return dispatch => {
    let serviceProviderId = getUserInfo().serviceProviderId;
    dispatch(startLoading())
    return Get(API.editServiceOffered + serviceProviderId + '/Offer')
      .then(resp => {
        if(resp.data) {
          resp.data[0].isOpen = true;
        }
        dispatch(getServiceOfferedDetails(resp.data))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function toggleCollapseCategory(data) {
  return (dispatch, getState) => {
    let serviceOfferedDetails = getState().profileState.serviceOfferedState.serviceOfferedList;
    let serviceOfferedDetailsModified = serviceOfferedDetails.map((category) => {
      if (category.serviceCategoryId === data.serviceCategoryId) {
        category.isOpen = !category.isOpen;
      } else {
        category.isOpen = false;
      }
      return category;
    })
    dispatch(getServicesOfferedSuccess(serviceOfferedDetailsModified));
  }
}

export function toggleCollapseDetails(data) {
  return (dispatch, getState) => {
    let serviceOfferedDetails = getState().profileState.serviceOfferedState.serviceOfferedDetails;
    let serviceOfferedDetailsModified = serviceOfferedDetails.map((category) => {
      if (category.serviceCategoryId === data.serviceCategoryId) {
        category.isOpen = !category.isOpen;
      } else {
        category.isOpen = false;
      }
      return category;
    })
    dispatch(getServiceOfferedDetails(serviceOfferedDetailsModified));
  }
}
