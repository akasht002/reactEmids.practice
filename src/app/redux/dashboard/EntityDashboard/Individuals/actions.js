import { API } from '../../../../services/api';
import { Get, Post } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { getTimeZoneOffset } from '../../../../utils/dateUtility';
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

export const getIndividualsVisitListSuccess = data => {
    return {
        type: IndividualsList.getIndividualsVisitListSuccess,
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
                //dispatch(getIndividualsListSuccess(formatCohorts(resp.data)));
                dispatch(getIndividualsListSuccess(resp.data));
            }
            dispatch(endLoading());
            dispatch(updateLoader(true))
        }).catch(() => {
            dispatch(updateLoader(true))
            dispatch(endLoading());
        })
    }
}

export function getIndividualsVisitList(data) {
    return (dispatch) => {
        dispatch(startLoading());
        return CareTeamPost(API.getIndividualsVisitList, data).then((resp) => {
            if (resp && resp.data) {
                dispatch(getIndividualsVisitListSuccess(resp.data))
            }
            dispatch(endLoading());
        }).catch(() => {
            dispatch(endLoading());
        })
    }
};

export function getAttributedProviders() {
    return (dispatch) => {
        dispatch(startLoading());
        return Get(API.getAttributedProviders).then((resp) => {
            dispatch(getAttributedProvidersSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}

export const getAttributedProvidersSuccess = (data) => {
    data.forEach(function (obj) {
        obj.isChecked = false
    })
    return {
        type: IndividualsList.getAttributedProvidersSuccess,
        data
    }
}

export function getAllCohorts() {
    return (dispatch) => {
        dispatch(startLoading());
        let pageNumber = 1;
        let pageSize = 1000;
        return Get(API.getAllCohorts
            + pageNumber + '/'
            + pageSize)
            .then((resp) => {
                dispatch(getAllCohortsSuccess(resp.data))
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
};

export const getAllCohortsSuccess = (data) => {
    data.forEach(function (obj) {
        obj.isChecked = false
    })
    return {
        type: IndividualsList.getAllCohorts,
        data
    }
}

export function getAllContracts() {
    return (dispatch) => {
        dispatch(startLoading());
        return Get(API.getAllContracts).then((resp) => {
            dispatch(getAllContractsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
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

export const resetFilter = (attributedProviders, cohorts, contracts) => {
    attributedProviders.forEach(function (obj) {
        obj.isChecked = false
    })
    cohorts.forEach(function (obj) {
        obj.isChecked = false
    })
    contracts.forEach(function (obj) {
        obj.isChecked = false
    })
    return {
        type: IndividualsList.resetFilter,
        attributedProviders,
        cohorts,
        contracts
    }
}

export function getStates() {
    return (dispatch) => {
        dispatch(startLoading());
        return Get(API.getStates).then((resp) => {
            dispatch(getStatesSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const getStatesSuccess = (data) => {
    return {
        type: IndividualsList.getStatesSuccess,
        data
    }
}

export function getIndividualsFeedbackList(data) {
    return (dispatch) => {
        dispatch(startLoadingFeedbackList());
        return CareTeamPost(API.getindividualsFeedbackList, data).then((resp) => {
            dispatch(getIndividualsFeedbackListSuccess(resp.data))
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
