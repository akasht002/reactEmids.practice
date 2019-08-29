import { API } from '../../../../services/api';
import { Post, Get } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
import { getFullName } from '../../../../utils/stringHelper'
import { getValue } from '../../../../utils/userUtility'
import { IndividualsList } from './bridge';
import _ from 'lodash'

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

export function getIndividualsCountList(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        data.offset = getTimeZoneOffset();
        return Post(API.getIndividualsCount, data).then((resp) => {
            if (resp && resp.data) {
                let activeSubTab = getState().dashboardState.individualsListState.activeSubTab
                let individualsCountList = getState().dashboardState.individualsListState.individualsCountList
                let dataCount = (resp.data && resp.data[0].totalCount > 0) ? resp.data[0].totalCount : 0
                dispatch(setPaginationRowCountSuccess(dataCount))
                if (activeSubTab !== 'All') {
                    let index = _.findIndex(individualsCountList, { statusName: resp.data[0].statusName });
                    individualsCountList.splice(index, 1, {
                        label: resp.data[0].label,
                        statusName: resp.data[0].statusName,
                        subtext: resp.data[0].subtext,
                        totalCount: resp.data[0].totalCount
                    })
                    dispatch(getIndividualsCountListSuccess(individualsCountList))
                }
                else {
                    dispatch(getIndividualsCountListSuccess(resp.data))
                }
            }
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
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
        }).catch(() => {
            dispatch(updateLoader(true))
            dispatch(endLoading());
        })
    }
}

export function getIndividualsFeedbackList(data) {
    return (dispatch) => {
        dispatch(startLoadingFeedbackList());
        return Get(`${API.getindividualsFeedbackList}${data.patientId}/${data.serviceProviderId}/${data.pageNumber}/${data.pageSize}`).then((resp) => {
                let data = resp.data.map(res => {
                    return {
                        ...res,
                        serviceType: res.serviceType.join(', ')
                    }
                })
                dispatch(getIndividualsFeedbackListSuccess(data))
                dispatch(endLoadingFeedbackList());
            }).catch((err) => {
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
