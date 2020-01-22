import { API } from '../../services/api';
import {
    ServiceRequestGet,
    Get,
    ServiceRequestPost,
    PatientGet,
    getUserInfo,
    ServiceRequestPut
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
import { API_ERROR_CODE, DEFAULT_PAGE_SIZE_ESP_LIST } from "../constants/constants";
import { formatAssessmentData } from './modal/assessment'
import { uniqBy } from 'lodash'
import { SERVICE_CATEGORY } from '../../constants/constants';
import { logError } from '../../utils/logError';
import _ from 'lodash';

export const getServiceCategorySuccess = (data) => {
    return {
        type: Schedule.getServiceCategorySuccess,
        data
    }
}

export const getServiceTypeSuccess = (data, serviceTypeIds) => {
    if(serviceTypeIds && serviceTypeIds.length > 0) {
        _.forEach(data, function (obj) {
            obj.isChecked = serviceTypeIds.indexOf(obj.serviceTypeId) > -1
        })
    }
    else {
        _.forEach(data, function (obj) { obj.isChecked = false; });
    }
    return {
        type: Schedule.getServiceTypeSuccess,
        data
    }
}

export const clearServiceDetails = (data) => {
    return {
        type: Schedule.clearServiceDetails,
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


export const clearESPListSchedule = () => {
    return {
        type: Schedule.clearESPListSchedule
    }
}

export const getAssessmentDetailSuccess = (data) => {
    return {
        type: Schedule.getAssessmentDetailSuccess,
        data
    }
}

export const createOrEditAssessmentSuccess = (data) => {
    return {
        type: Schedule.createOrEditAssessmentSuccess,
        data
    }
}

export const getIndividualSchedulesDetailsSuccess = (data) => {
    return {
        type: Schedule.getIndividualSchedulesDetailsSuccess,
        data
    }
}

export const isScheduleEdit = (data) => {
    return {
        type: Schedule.isScheduleEdit,
        data
    }
}

export const isAssessmentEdit = (data) => {
    return {
        type: Schedule.isAssessmentEdit,
        data
    }
}



export function getServiceCategory(id, selectedData, isEditable) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            let serviceCategoryIndex = resp.data && resp.data.findIndex(element => element.serviceCategoryId === SERVICE_CATEGORY.adl.id);
            let serviceCategoryId = [resp.data[serviceCategoryIndex].serviceCategoryId]
            dispatch(setServiceCategoryId(serviceCategoryId))
            dispatch(getServiceCategorySuccess(resp.data));
            let categoryId = id ? id : 1
            !isEditable && dispatch(getServiceType(categoryId, selectedData))
        }).catch((err) => {
        })
    }
}

export function getServiceType(id, selectedData = []) {
    return (dispatch, getState) => {
        dispatch(getServiceTypeSuccess([]))
        let serviceCategoryId = id;
        let {serviceTypeIds} = getState().scheduleState
        return ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            let data = []
            let type = resp.data.filter((type) => {
                return type.serviceCategoryId === serviceCategoryId;
            });
            data = type[0].serviceTypeTaskViewModel.map((type, index) => {
                return {
                    ...type,
                    selected: selectedData.some((selectedType) => {
                        return selectedType.serviceTypeId === type.serviceTypeId
                    })
                }
            });

            dispatch(getServiceTypeSuccess(data, serviceTypeIds))
        }).catch((err) => {
        })
    }
}

export function selectOrClearAllServiceType(data, isSelectAll) {
    return (dispatch, getState) => {
        let {services, serviceTypeIds} = getState().scheduleState
        let serviceCategoryId = data;
        return ServiceRequestGet(API.GetServiceCategoryTypeTask).then((resp) => {
            let data = []
            let updatedServiceTypes = null
            let updatedServiceTypeids = [...serviceTypeIds] 
            let type = resp.data.filter((type) => {
                return type.serviceCategoryId === serviceCategoryId
            });

            data = type[0].serviceTypeTaskViewModel.map(obj => ({ ...obj, isChecked: isSelectAll }))

            if(isSelectAll) {
                let duplicateData =  [...services, ...data]
                let uniqueData = []
                // updatedServiceTypes = duplicateData.filter((data,i)=>{
                //     const object = data
                //     return i === duplicateData.findIndex(obj => {
                //         return obj === object;
                //       });
                // })
                duplicateData.map(x => uniqueData.filter(a => a.serviceTypeId === x.serviceTypeId).length > 0 ? null : uniqueData.push(x))
                console.log('uniqueData: ', uniqueData)
                updatedServiceTypes = uniqueData
                updatedServiceTypeids = [...serviceTypeIds, ...data.map(obj => obj.serviceTypeId)]  
            }
            else {
                serviceTypeIds.forEach(() => 
                    data.forEach(e2 => {
                        let index = serviceTypeIds.indexOf(e2.serviceTypeId);
                         serviceTypeIds.splice(index,1)
                    })    
                )
               updatedServiceTypeids = serviceTypeIds
                services.filter(item => item.serviceTypeId !== data.find(element => element.serviceTypeId))
            }
            dispatch(selectOrClearAllServiceTypeSuccess(data, serviceTypeIds))
            dispatch(setselectedServicesSuccess(updatedServiceTypes))
            dispatch(setServiceTypeIds(_.uniq(updatedServiceTypeids)))
        }).catch((err) => {
            logError(err)
        })
    }
}

export function getPatientAddress(patientId) {
    return (dispatch) => {
        dispatch(startLoading());
        var url = API.getPatientAddress + `${patientId}/PatientAddress`
        return PatientGet(url).then((resp) => {
            dispatch(getPatientAddressSuccess(resp.data))
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getStates() {
    return (dispatch) => {
        dispatch(startLoading());
        return Get(API.getState).then((resp) => {
            dispatch(getStateSuccess(resp.data))
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getValidPatientAddress(data, addressCallback) {
    return (dispatch, getState) => {
        let modelData = getModal(data)
        ServiceRequestPost(
            API.getValidPatientAddress,
            modelData
        )
            .then(resp => {
                if (validateCoordinates(resp.data.lat, resp.data.lon)) {
                    dispatch(getValidPatientAddressSuccess(true))
                    addressCallback(false)
                    dispatch(setSelectedPos(0))
                }
                else {
                    dispatch(getValidPatientAddressSuccess(false))
                    addressCallback(true)
                }
            })
            .catch(err => {
                err.response && err.response.status === API_ERROR_CODE.badRequest && dispatch(getValidPatientAddressSuccess(true))

            })
    }
};

export function getEntityServiceProviderList(data, selectedESPId = null) {
    return (dispatch, getState) => {
        dispatch(startLoading())
        let commonUrl = `${getUserInfo().serviceProviderId}/${data.pageNumber}/${data.pageSize}`
        let url = selectedESPId !== null ?
            `${commonUrl}/${selectedESPId}` :
            `${commonUrl}`
        Get(`${API.searchESP}` + url)
            .then(resp => {
                let oldEspList = getState().scheduleState.entityServiceProvidersList;
                let modifiedList = [...oldEspList, ...resp.data];
                let selectedESP = modifiedList.map((type, index) => {
                    return {
                        ...type,
                        selected: type.serviceProviderId === selectedESPId
                    }
                });

                let espList = uniqBy(selectedESP, function (x) {
                    return x.serviceProviderId;
                });
                dispatch(getEntityServiceProviderListSuccess(espList))
                dispatch(selectESP(selectedESPId))
                dispatch(disableShowmore(resp.data.length < DEFAULT_PAGE_SIZE_ESP_LIST))
                dispatch(endLoading())
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
                selected: parseInt(value.serviceProviderId, 10) === parseInt(espId, 10)
            })
        })
        let list = orderBy(data, ['selected'], ['desc']);
        dispatch(getEntityServiceProviderListSuccess(list))
    }
}



export function getEntityServiceProviderListSearch(data, selectedESPId = null) {
    return (dispatch, getState) => {
        let commonUrl = `${getUserInfo().serviceProviderId}/${data.pageNumber}/${data.pageSize}`
        let url = selectedESPId !== null ?
            `${commonUrl}/${selectedESPId}?searchtext=${data.searchKeyword}` :
            `${commonUrl}?searchtext=${data.searchKeyword}`
        Get(`${API.searchESP}` + url)
            .then(resp => {
                let selectedESP = resp.data.map((type, index) => {
                    return {
                        ...type,
                        selected: type.serviceProviderId === selectedESPId
                    }
                });
                dispatch(getEntityServiceProviderListSuccess(selectedESP))
                dispatch(disableShowmore(resp.data.length < DEFAULT_PAGE_SIZE_ESP_LIST))
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
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getDays(selectedDaysId = []) {
    return (dispatch) => {
        let selectedDaysIds = selectedDaysId ? selectedDaysId : [];
        dispatch(startLoading());
        return ServiceRequestGet(API.servicerequest + `LookUp/Days`).then((resp) => {
            let data = resp.data.map((value) => {
                return ({
                    ...value,
                    selected: selectedDaysIds.indexOf(value.id) !== -1
                })
            })
            dispatch(getDaysSuccess(data))
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function createSchedule(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let modelData = createScheduleModal(data)
        return ServiceRequestPost(API.createOrEditSchedule, modelData)
            .then(resp => {
                dispatch(push(Path.visitServiceDetails))
                dispatch(clearESPListSchedule());
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading());
            })
    }
};

export function editSchedule(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let modelData = createScheduleModal(data)
        return ServiceRequestPut(API.createOrEditSchedule, modelData)
            .then(resp => {
                dispatch(push(Path.visitServiceDetails))
                dispatch(clearESPListSchedule());
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading());
            })
    }
};

export function createOrEditAssessment(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let modelData = formatAssessmentData(data)
        return ServiceRequestPost(API.createOrEditAssessment, modelData)
            .then(resp => {
                dispatch(push(Path.visitServiceDetails))
                dispatch(clearESPListSchedule())
                dispatch(isAssessmentEdit(false));
                dispatch(getAssessmentDetailSuccess({}))
                dispatch(endLoading());
            })
            .catch(err => {
                dispatch(endLoading());
            })
    }
};



export const getAssessmentDetailsById = (id) => {
    return (dispatch) => {
        dispatch(startLoading());
        return ServiceRequestGet(`${API.getAssessmentByAssessmentId}${id}`)
            .then(resp => {
                dispatch(getAssessmentDetailSuccess(resp.data))
                dispatch(isAssessmentEdit(true));
                dispatch(push(Path.schedule));
                dispatch(endLoading());
            })
            .catch(err => {

            })
    }
}

export function getIndividualSchedulesDetails(scheduleId) {
    return (dispatch) => {
        dispatch(startLoading());
        return ServiceRequestGet(API.getIndividualSchedulesDetails + scheduleId).then((resp) => {
            dispatch(getIndividualSchedulesDetailsSuccess(resp.data));
            dispatch(isScheduleEdit(true));
            dispatch(push(Path.schedule));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export const setselectedServices = (data,isChecked) => {
    return (dispatch,getState) => {
        let services = getState().scheduleState.services
        let updatedServices  = null ;
        if(isChecked){
            updatedServices = [...services,data]
        }          
        else{
            updatedServices = services.filter(item => item.serviceTypeId !== data.serviceTypeId);
        }
        dispatch(setselectedServicesSuccess(updatedServices))
    } 
}

export const setselectedServicesSuccess = data =>{
    return {
        type:Schedule.selectedServices,
        data
    }
}

export const checkServiceType = (data, id, checked) => {
    var foundIndex = data.findIndex(element => element.serviceTypeId === id);
    data[foundIndex].isChecked = checked;
      return {
        type: Schedule.getServiceTypeSuccess,
        data
    }
}

export const setServiceTypeIds = data => {
    return {
        type: Schedule.setServiceTypeIds,
        data
    } 
}

export const setServiceCategoryId = data => {
    return {
        type: Schedule.setServiceCategoryId,
        data
    } 
}

export const selectOrClearAllServiceTypeSuccess = data => {
    return {
        type: Schedule.getServiceTypeSuccess,
        data
    } 
}