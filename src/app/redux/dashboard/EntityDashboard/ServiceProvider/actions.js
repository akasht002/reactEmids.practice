import { API } from '../../../../services/api'
import { Post } from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions';
import { VisitServiceProviderList } from './bridge';
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility';
import { ENTITY_DASHBOARD_STATUS, DATE_FORMATS, DEFAULT_PAGE_NUMBER } from '../../../../constants/constants';
import { formatPhoneNumber, removeHyphenInPhoneNumber } from '../../../../utils/formatName';
import { checkNumber } from '../../../../utils/validations';
import { concatCommaWithSpace } from '../../../../utils/stringHelper';
import moment from 'moment';

export const setActiveSubTab = data => {
  return {
    type: VisitServiceProviderList.setActiveSubTab,
    data
  }
}

export const getServiceProviderCountListSuccess = data => {
  return {
    type: VisitServiceProviderList.getVisitsServiceProviderCountListSuccess,
    data
  }
}

export const getServiceProviderTableListSuccess = data => {
  return {
    type: VisitServiceProviderList.getVisitsServiceProviderTableListSuccess,
    data
  }
}

export const setPaginationRowCountSuccess = data => {
  return {
    type: VisitServiceProviderList.setPaginationRowCountSuccess,
    data
  }
}

export function getVisitServiceProviderCountList(data, isFilterApplied = false) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return Post(
      API.getVisitServiceProviderCount,
      data
    )
      .then(resp => {
        if (resp && resp.data) {
          let {activeSubTab, visitServiceProviderCountList} = getState().dashboardState.VisitServiceProviderState
          let filteredArray = resp.data.filter(item => {
            return caseInsensitiveComparer(activeSubTab, item.statusName)
          });
          let dataCount = checkDataCount(filteredArray)
          dispatch(setPaginationRowCountSuccess(dataCount));
            if(caseInsensitiveComparer(data.tab, ENTITY_DASHBOARD_STATUS.serviceProvider.statCard.all) && !isFilterApplied) {
              dispatch(getServiceProviderCountListSuccess(resp.data))
            }
            else {
              dispatch(getServiceProviderCountListSuccess(updateCountList(visitServiceProviderCountList, resp)))
            }
          }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endLoading())
      })
  }
}

export function getVisitServiceProviderTableList(data) {
  let searchText = removeHyphenInPhoneNumber(data.searchText)
  data.searchText = (checkNumber(searchText) ? searchText : data.searchText)
  return dispatch => {
    dispatch(startLoading())
    return Post(
      API.getVisitServiceProviderTable,
      data
    )
      .then(resp => {
        if (resp && resp.data) {
          let data = resp.data.map(res => {
            return {
              ...res,
              name: `${res.firstName} ${res.lastName}`,
              phoneNumber: formatPhoneNumber(res.phoneNumber)
            }
          })
          dispatch(getServiceProviderTableListSuccess(data))
        }
        dispatch(endLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endLoading())
      })
  }
}

export function getPointofServicedata(data) {
  return dispatch => {
    let reqObj = {
      stateName: data.StateName.label,
      city: data.City,
      zip: data.Zip,
      street: data.StreetName
    }
    return Post(API.getGeologicalPosition, reqObj)
      .then(resp => {
        dispatch(getGeologicalPositionSuccess(resp.data))
        data.lat = resp.data.latitude;
        data.lon = resp.data.longitude;
        dispatch(getVisitServiceProviderTableList(data))
      })
      .catch(err => {
        logError(err)
      })
  }
}

export const getGeologicalPositionSuccess = data => {
  return {
    type: VisitServiceProviderList.getGeologicalPositionSuccess,
    data
  }
}

export function getFeedbackAlertDetails(data) {
  return dispatch => {
    let pageNumber = data.pageNumber
    dispatch(startFeedbackAlertLoading())
    return Post(API.getServiceProviderFeedbackList, data)
      .then(resp => {
        if (resp && resp.data) {
          if(pageNumber === DEFAULT_PAGE_NUMBER) {
            let feedBackCount = resp.data.length > 0 && resp.data[0].pageCount
            dispatch(setFeedbackCount(feedBackCount))    
          }
          let data = resp.data.map(res => {
            return {
                ...res,
                serviceType: concatCommaWithSpace(res.serviceType),
                visitDate: moment(res.visitDate).format(DATE_FORMATS.mm_dd_yyy)
            }
        })
          dispatch(getFeedbackAlertDetailsSuccess(data))
        }
        dispatch(endFeedbackAlertLoading())
      })
      .catch((err) => {
        logError(err)
        dispatch(endFeedbackAlertLoading())
      })
  }
}

export const getFeedbackAlertDetailsSuccess = data => {
  return {
    type: VisitServiceProviderList.getFeedbackAlertDetailsSuccess,
    data
  }
}

export const startFeedbackAlertLoading = () => {
  return {
    type: VisitServiceProviderList.startFeedbackAlertLoading
  }
}

export const endFeedbackAlertLoading = () => {
  return {
    type: VisitServiceProviderList.endFeedbackAlertLoading
  }
}

export const savePaginationNumber = data => {
  return {
    type: VisitServiceProviderList.savePaginationNumber,
    data
  }
} 

export const setServiceProviderFeedbackTab = data => {
  return {
    type: VisitServiceProviderList.setServiceProviderFeedbackTab,
    data
  }
} 

export const setGenderId = data => {
  return {
      type: VisitServiceProviderList.setGenderId,
      data
  } 
}

export const setExperience = data => {
  return {
      type: VisitServiceProviderList.setExperience,
      data
  } 
}

export const setRating = data => {
  return {
      type: VisitServiceProviderList.setRating,
      data
  } 
}

export const resetFilter = () => {
  return {
      type: VisitServiceProviderList.resetFilter
  }   
}

export const setImpersinated = data => {
  return {
      type: VisitServiceProviderList.setImpersinated,
      data
  } 
}

export const setFilterApplied = data => {
  return {
      type: VisitServiceProviderList.setFilterApplied,
      data
  }  
}

export const setFeedbackCount = data => {
  return {
      type: VisitServiceProviderList.setFeedbackCount,
      data
  }
}