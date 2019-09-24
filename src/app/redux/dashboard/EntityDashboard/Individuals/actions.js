import { API } from '../../../../services/api';
import { Post, Get, PatientGet } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { getFullName, concatCommaWithSpace } from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { IndividualsList } from './bridge';
import { logError } from '../../../../utils/logError';
import { updateCountList, checkDataCount } from '../utilActions';
import { forEach } from 'lodash'
import { caseInsensitiveComparer } from '../../../../utils/comparerUtility'
import { ENTITY_DASHBOARD_STATUS, DATE_FORMATS } from '../../../../constants/constants';
import moment from 'moment';

export const startLoadingFeedbackList = () => {
    return {
        type: IndividualsList.startLoadingFeedbackList
    }
}

export const endLoadingFeedbackList = () => {
    return {
        type: IndividualsList.endLoadingFeedbackList
    }
}

export const setActiveTab = data => {
    return {
        type: IndividualsList.setActiveTab,
        data
    }
}

export const setActiveSubTab = data => {
    return {
        type: IndividualsList.setActiveSubTab,
        data
    }
}

export const clearStates = () => {
    return {
        type: IndividualsList.clearState
    }
}

export const getIndividualsCountListSuccess = data => {
    return {
        type: IndividualsList.getIndividualsCountListSuccess,
        data
    }
}

export const getIndividualsListSuccess = data => {
    return {
        type: IndividualsList.getIndividualsListSuccess,
        data
    }
}

export const updateLoader = (data) => {
    return {
        type: IndividualsList.isLoading,
        data
    }
}

export const setPaginationRowCountSuccess = data => {
    return {
        type: IndividualsList.setPaginationRowCountSuccess,
        data
    }
}

export const getIndividualsFeedbackListSuccess = data => {
    return {
        type: IndividualsList.getIndividualsFeedbackListSuccess,
        data
    }
}

export function getIndividualsCountList(data, isFilterApplied = false) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        data.offset = getTimeZoneOffset();
        return Post(API.getIndividualsCount, data).then((resp) => {
            if (resp && resp.data) {
                let {activeSubTab, individualsCountList} = getState().dashboardState.individualsListState
                let filteredArray = resp.data.filter(item => {
                    return caseInsensitiveComparer(activeSubTab, item.statusName)
                  });
                let dataCount = checkDataCount(filteredArray)
                dispatch(setPaginationRowCountSuccess(dataCount))
                if(caseInsensitiveComparer(data.tab, ENTITY_DASHBOARD_STATUS.individuals.statCard.all) && !isFilterApplied) {
                        dispatch(getIndividualsCountListSuccess(resp.data))
                    }
                    else {
                        dispatch(getIndividualsCountListSuccess(updateCountList(individualsCountList, resp)))
                    }    
                }
             dispatch(endLoading());
             dispatch(updateLoader(true))
        }).catch((err) => {
            logError(err)
            dispatch(endLoading());
            dispatch(updateLoader(true))
        })
    }
}

export function getIndividualsList(data) {
    return (dispatch) => {
        dispatch(startLoading());
        return Post(API.getIndividualsList, data).then((resp) => {
            if (resp && resp.data) {
                let data = resp.data.map(res => {
                    return {
                        ...res,
                        name: getFullName(getValue(res.firstName), getValue(res.lastName))
                    }
                })
                dispatch(getIndividualsListSuccess(data));
            }
            dispatch(endLoading());
            dispatch(updateLoader(true))
        }).catch((err) => {
            logError(err)
            dispatch(updateLoader(true))
            dispatch(endLoading());
        })
    }
}

export function getIndividualsFeedbackList(data) {
    return (dispatch) => {
        dispatch(startLoadingFeedbackList());
        return Post(API.getindividualsFeedbackList, data).then((resp) => {
            let data = resp.data.map(res => {
                return {
                    ...res,
                    serviceType: concatCommaWithSpace(res.serviceType),
                    visitDate: moment(res.visitDate).format(DATE_FORMATS.mm_dd_yyy)
                }
            })
            dispatch(getIndividualsFeedbackListSuccess(data))
            dispatch(endLoadingFeedbackList());
        }).catch((err) => {
            logError(err)
            dispatch(endLoadingFeedbackList());
        })
    }
};

export const savePaginationNumber = data => {
    return {
        type: IndividualsList.savePaginationNumber,
        data
    }
}

export const setFromDate = (data) => {
    return {
        type: IndividualsList.setFromDate,
        data
    }
}

export const setToDate = (data) => {
    return {
        type: IndividualsList.setToDate,
        data
    }
}

export const setActiveStatusForAllTab = data => {
    return {
        type: IndividualsList.setActiveStatusForAllTab,
        data
    }
}

export function getAllContracts() {
    return (dispatch) => {
        return PatientGet(API.getAllContracts).then((resp) => {
            dispatch(getAllContractsSuccess(resp.data))
        }).catch((err) => {
            logError(err)
        })
    }
}

export const getAllContractsSuccess = (data) => {
    data.forEach(function (obj) {
        obj.isChecked = false
    })
    return {
        type: IndividualsList.getAllContractsSuccess,
        data
    }
}

export function getClinicalCondition () {
    return (dispatch, getState) => {
     let {filterApplied} = getState().dashboardState.individualsListState
      PatientGet(API.getAllClinicalCondition)
        .then(resp => {
          dispatch(getClinicalConditionSuccess(resp.data, filterApplied))
        })
        .catch(err => {
        })
    }
}

export const getClinicalConditionSuccess = (data, filterApplied) => {
        !filterApplied &&
        data.forEach(function (obj) {
            obj.isChecked = false
        })
        return {
            type: IndividualsList.getClinicalConditionSuccess,
            data
    }        
}

export function getGender () {
    return dispatch => {
      Get(API.getGender)
        .then(resp => {
          dispatch(getGenderSuccess(resp.data))
        })
        .catch(err => {
        })
    }
}  

export const getGenderSuccess = data => {
    forEach(data, function (obj) {
      obj.isChecked = false
    })
    return {
      type: IndividualsList.getGenderSuccess,
      data
    }
}

export const clearClinicalCondition = data => {
    data.map(item => {
      return (item.isChecked = false)
    })
  
    return {
      type: IndividualsList.clearClinicalCondition,
      data
    }
}

export const clearGenderType = data => {
    data.map(item => {
      return (item.isChecked = false)
    })
  
    return {
      type: IndividualsList.clearGenderType,
      data
    }
}

export const resetContracts = contracts => {
    contracts.forEach(function (obj) {
        obj.isChecked = false
    })
    return {
        type: IndividualsList.resetContracts,
        contracts
    }
}

export const checkClinicalCondition = (data, id, checked) => {
    var foundIndex = data.findIndex(element => element.attributeId === id);
    data[foundIndex].isChecked = checked;
    return {
        type: IndividualsList.getClinicalConditionSuccess,
        data
    }
}

export const setGenderId = data => {
    return {
        type: IndividualsList.setGenderId,
        data
    } 
}

export const setFilterApplied = data => {
    return {
        type: IndividualsList.setFilterApplied,
        data
    }  
}

export const setMemberContractId = data => {
    return {
        type: IndividualsList.setMemberContractId,
        data
    } 
}

export const setAgeRange = data => {
    return {
        type: IndividualsList.setAgeRange,
        data
    } 
}

export const setClinicalConditions = data => {
    return {
        type: IndividualsList.setClinicalConditions,
        data
    } 
}