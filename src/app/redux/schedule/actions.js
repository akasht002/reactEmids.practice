import { API } from '../../services/api';
import {
    ServiceRequestGet,
    Get,
    ServiceRequestPost,
    PatientGet,
    getUserInfo
} from '../../services/http'
import { Schedule } from './bridge';
import { SELECTED_POS_ERROR_MSG, NEW_POS_ERROR_MSG } from '../constants/constants';
import { validateCoordinates } from '../../utils/validations';
import { getModal } from './modal';
import { createScheduleModal } from './createScheduleModal';
import { Path } from '../../routes'
import { push } from '../../redux/navigation/actions'
import { orderBy } from 'lodash'
import { startLoading, endLoading } from '../loading/actions';

export const getServiceCategorySuccess = (data) => {
    return {
        type: Schedule.getServiceCategorySuccess,
        data
    }
}

export const getServiceTypeSuccess = (data) => {
    return {
        type: Schedule.getServiceTypeSuccess,
        data
    }
}

export const getPatientAddressSuccess = (data) => {
    return {
        type: Schedule.getPatientAddressSuccess,
        data
    }
}

export const getStateSuccess = (data) => {
    return {
        type: Schedule.getStateSuccess,
        data
    }
}

export const setSelectedPos = (data) => {
    let updatedData = data === "0" ? NEW_POS_ERROR_MSG : SELECTED_POS_ERROR_MSG
    return {
        type: Schedule.setSelectedPos,
        updatedData
    }
}

export const getValidPatientAddressSuccess = (data) => {
    return {
        type: Schedule.getValidPatientAddressSuccess,
        data
    }
}

export const getEntityServiceProviderListSuccess = (data) => {
    return {
        type: Schedule.getEntityServiceProviderListSuccess,
        data
    }
}

export const getRecurringPatternSuccess = (data) => {
    return {
        type: Schedule.getRecurringPatternSuccess,
        data
    }
}

export const getDaysSuccess = (data) => {
    return {
        type: Schedule.getDaysSuccess,
        data
    }
}

export const disableShowmore = (data) => {
    return {
        type: Schedule.disableShowmore,
        data
    }
}


export const clearESPList = () => {
    return {
        type: Schedule.clearESPList
    }
}


export function getServiceCategory() {
    return (dispatch) => {
        ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            dispatch(getServiceCategorySuccess(resp.data));
            if (resp.data.length > 0) {
                dispatch(getServiceType(resp.data[0].serviceCategoryId))
            }
        }).catch((err) => {
        })
    }
}

export function getServiceType(data) {
    return (dispatch) => {
        dispatch(getServiceTypeSuccess([]))
        let serviceCategoryId = data;
        ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            let data = []
            let type = resp.data.filter((type, i) => {
                if (type.serviceCategoryId === serviceCategoryId) {
                    return type
                }
            });
            data = type[0].serviceTypeTaskViewModel.map((type, index) => {
                if (index === 0) {
                    return {
                        ...type,
                        selected: false
                    }
                }
                return type;
            });

            dispatch(getServiceTypeSuccess(data))
        }).catch((err) => {
        })
    }
}

export function selectOrClearAllServiceType(data, isSelectAll) {
    return (dispatch) => {
        dispatch(getServiceTypeSuccess([]))
        let serviceCategoryId = data;
        ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            let data = []
            let type = resp.data.filter((type) => {
                if (type.serviceCategoryId === serviceCategoryId) {
                    return type
                }
            });
            if (isSelectAll) {
                data = type[0].serviceTypeTaskViewModel.map(obj => ({ ...obj, selected: true }))
            } else {
                data = type[0].serviceTypeTaskViewModel.map(obj => ({ ...obj, selected: false }))
            }

            dispatch(getServiceTypeSuccess(data))
        }).catch((err) => {
        })
    }
}

export function getPatientAddress(patientId) {
    return (dispatch) => {
        dispatch(startLoading());
        var url = API.getPatientAddress + `${patientId}/PatientAddress`
        PatientGet(url).then((resp) => {
            dispatch(getPatientAddressSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getStates() {
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.getState).then((resp) => {
            dispatch(getStateSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getValidPatientAddress(data) {
    return (dispatch, getState) => {
        let modelData = getModal(data)
        dispatch(startLoading())
        ServiceRequestPost(
            API.getValidPatientAddress,
            modelData
        )
            .then(resp => {
                if (validateCoordinates(resp.data.lat, resp.data.lon)) {
                    dispatch(getValidPatientAddressSuccess(true))
                }
                else {
                    dispatch(getValidPatientAddressSuccess(false))
                    dispatch(setSelectedPos(0))
                }
                dispatch(endLoading())
            })
            .catch(err => {
                dispatch(endLoading())
                if (err.response.status === 400) {
                    dispatch(getValidPatientAddressSuccess(true))
                }
            })
    }
};

export function getEntityServiceProviderList(data) {
    return (dispatch, getState) => {
        dispatch(startLoading())
        Get(`${API.searchESP}${getUserInfo().serviceProviderId}/${data.pageNumber}/${data.pageSize}`)
            .then(resp => {
                let oldEspList = getState().scheduleState.entityServiceProvidersList;
                let modifiedList = [...oldEspList, ...resp.data];
                dispatch(getEntityServiceProviderListSuccess(modifiedList))
                if (resp.data.length < 9) {
                    dispatch(disableShowmore(true))
                } else if (resp.data.length === 9) {
                    dispatch(disableShowmore(false))
                }
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
}

export function selectESP(espId) {
    return (dispatch, getState) => {
        let espList = getState().scheduleState.entityServiceProvidersList
        let data = espList.map((value) => {
            return ({
                ...value,
                selected: parseInt(value.serviceProviderId, 10) === parseInt(espId, 10) ? 1 : 0
            })
        })
        let list = orderBy(data, ['selected'], ['desc']);
        dispatch(getEntityServiceProviderListSuccess(list))
    }
}



export function getEntityServiceProviderListSearch(data) {
    return (dispatch, getState) => {
        Get(`${API.searchESP}${getUserInfo().serviceProviderId}/${data.pageNumber}/${data.pageSize}?searchtext=${data.searchKeyword}`)
            .then(resp => {
                dispatch(getEntityServiceProviderListSuccess(resp.data))
                if (resp.data.length < 9) {
                    dispatch(disableShowmore(true))
                } else if (resp.data.length === 9) {
                    dispatch(disableShowmore(false))
                }
            })
            .catch(err => {
                dispatch(endLoading())
            })
    }
}

export function getRecurringPattern() {
    return (dispatch) => {
        dispatch(startLoading());
        return ServiceRequestGet(API.servicerequest + `LookUp/RecurringPattern`).then((resp) => {
            dispatch(getRecurringPatternSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getDays() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.servicerequest + `LookUp/Days`).then((resp) => {
            dispatch(getDaysSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function createOrEditSchedule(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let modelData = createScheduleModal(data)
        ServiceRequestPost(API.createOrEditSchedule, modelData)
            .then(resp => {
                dispatch(push(Path.visitServiceDetails))
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading());
            })
    }
};


