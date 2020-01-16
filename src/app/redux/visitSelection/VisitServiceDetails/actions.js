import { API } from '../../../services/api'
import {
  ServiceRequestGet,
  ThirdPartyGet,
  ServiceRequestPost,
  ThirdPartyPost,
  ServiceRequestPut,
  Get
} from '../../../services/http'
import { startLoading, endLoading } from '../../loading/actions'
import { push } from '../../navigation/actions'
import { Path } from '../../../routes'
import { getUserInfo } from '../../../services/http'
import { VisitServiceDetails } from './bridge'
import { USERTYPES, DEFAULT_PAGE_SIZE_ESP_LIST, VISIT_TYPE } from '../../../constants/constants'
import { isEntityUser } from '../../../utils/userUtility'
import { serviceRequestDetailsTab } from '../../constants/constants'
import { orderBy, uniqBy } from 'lodash'
import { logError } from '../../../utils/logError';
import { pushSpliceHandler } from '../../../utils/stringHelper';

export const getVisitServiceDetailsSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceDetailsSuccess,
    data
  }
}

export const scheduleLoading = data => {
  return {
    type: VisitServiceDetails.isScheduleLoading,
    data
  }
}

export const isVisitservicedetailLoading = data => {
  return {
    type: VisitServiceDetails.isVisitservicedetailLoading,
    data
  }
}

export const isServiceRequestListLoading = data => {
  return {
    type: VisitServiceDetails.isServiceRequestListLoading,
    data
  }
}

export const isEntityServiceProviderListLoading = data => {
  return {
    type: VisitServiceDetails.isEntityServiceProviderListLoading,
    data
  }
}

export const cancelHiredRequest = data => {
  return {
    type: VisitServiceDetails.cancelHiredRequest,
    data
  }
}

export const editIndividualEditPopup = data => {
  return {
    type: VisitServiceDetails.editIndividualEditPopup,
    data
  }
}

export const setEntityServiceProviderSuccess = data => {
  return {
    type: VisitServiceDetails.setEntityServiceProviderSuccess,
    data
  }
}

export const getVisitServiceScheduleSuccess = (data, disableShowMore) => {
  return {
    type: VisitServiceDetails.getVisitServiceScheduleSuccess,
    data,
    disableShowMore
  }
}


export const getServiceRequestId = data => {
  return {
    type: VisitServiceDetails.getServiceRequestId,
    data
  }
}

export const getVisitServiceEligibityStatusSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitServiceEligibityStatusSuccess,
    data
  }
}

export const updateServiceRequestByServiceProviderSuccess = data => {
  return {
    type: VisitServiceDetails.updateServiceRequestByServiceProviderSuccess,
    data
  }
}

export const canInitiateConversationSuccess = data => {
  return {
    type: VisitServiceDetails.canInitiateConversationSuccess,
    data
  }
}

export const loadingESPList = data => {
  return {
    type: VisitServiceDetails.loadingESPList,
    data
  }
}

export function dispatchServiceRequestByServiceProvider() {
  return dispatch => {
    dispatch(push(Path.dashboard))
  }
}

export function setEntityServiceProvider(data) {
  return dispatch => {
    if (data.serviceRequestId === 0) {
      dispatch(setActiveTab(serviceRequestDetailsTab.myPlan))
    }
    dispatch(setEntityServiceProviderSuccess(data))
  }
}

export function formDirtyVisitServiceDetails() {
  return {
    type: VisitServiceDetails.formDirtyVisitServiceDetails
  }
}

export function resetServiceDetails() {
  return {
    type: VisitServiceDetails.resetState
  }
}

export function updateServiceRequestByServiceProvider(data) {
  let modelData = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: getUserInfo().serviceProviderId,
    applyOrNotInterested: data.type
  }
  return dispatch => {
    return ServiceRequestPost(
      API.applyServiceRequestByServiceProvider,
      modelData
    )
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function cancelServiceRequestByServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    ServiceRequestPut(API.cancelServiceRequestByServiceProvider, model)
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function getVisitServiceDetails(data) {
  return (dispatch, getState) => {
    let currstate = getState();
    let serviceProviderId = getUserInfo().isEntityServiceProvider ? currstate.visitSelectionState.VisitServiceDetailsState.entityServiceProviderId
      : getUserInfo().serviceProviderId
    dispatch(getServiceRequestId(data));

    ServiceRequestGet(API.getServiceRequestDetails + `${data}/${serviceProviderId}`)
      .then(resp => {
        dispatch(isVisitservicedetailLoading(true))
        dispatch(getVisitServiceDetailsSuccess(resp.data));
        dispatch(canInitiateConversation(resp.data));
        dispatch(isVisitservicedetailLoading(false))
      })
      .catch(err => {
        dispatch(isVisitservicedetailLoading(false))
      })
  }
}

export function clearVisitServiceSchedule() {
  return dispatch => dispatch(getVisitServiceScheduleSuccess([]))
}

export function clearServiceDetails() {
  return dispatch => dispatch(getVisitServiceDetailsSuccess([]))
}


export function getVisitServiceSchedule(data, pageNumber, isUpdateEntitySP = false) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let pageSize = isUpdateEntitySP ? pageNumber * 10 : 10;
  let pageNo = isUpdateEntitySP ? 1 : pageNumber;
  return (dispatch, getState) => {
    dispatch(scheduleLoading(true));
    ServiceRequestGet(API.getServiceRequestSchedule + `${data}/${serviceProviderId}/${pageNo}/${pageSize}`)
      .then(resp => {
        let modifiedList = resp.data;
        let disableShowMore = false;
        if (modifiedList.length < pageSize) {
          disableShowMore = true;
        }
        if (!isUpdateEntitySP) {
          let serviceSchedules = getState().visitSelectionState.VisitServiceDetailsState.VisitServiceSchedule;
          modifiedList = [
            ...serviceSchedules
          ];
          if (resp.data.length === 0) {
            disableShowMore = true
          }
          else {
            if (serviceSchedules.length === 0) {
              modifiedList = [
                ...resp.data
              ];
              if (resp.data.length <= 3) {
                disableShowMore = true
              }
            } else if (serviceSchedules.length > 0 || serviceSchedules[serviceSchedules.length - 1].serviceRequestVisitId !==
              resp.data[resp.data.length - 1].serviceRequestVisitId) {
              modifiedList = [
                ...serviceSchedules,
                ...resp.data
              ];
            }
          }
        }
        dispatch(getVisitServiceScheduleSuccess(modifiedList, disableShowMore))
        dispatch(scheduleLoading(false));
      })
      .catch(err => {
        dispatch(scheduleLoading(false));
      })
  }
}

export function getVisitServiceEligibilityStatus(data) {
  return (dispatch) => {
    ThirdPartyPost(API.getServiceRequestEligibilityStatus, data).then((resp) => {
      dispatch(getVisitServiceEligibityStatusSuccess(resp.data))

    }).catch((err) => {
      logError(err);
    })
  }
};

export const getDaysSuccess = (data) => {
  return {
    type: VisitServiceDetails.getDaysSuccess,
    data
  }
}

export function getDays() {
  return (dispatch) => {
    ServiceRequestGet(API.servicerequest + `LookUp/Days`).then((resp) => {
      dispatch(getDaysSuccess(resp.data))

    }).catch((err) => {
      logError(err);
    })
  }
};



export function cancelInvitedServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    ServiceRequestPut(API.cancelInvitedServiceProvider, model)
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function cancelAppliedServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: data.patientId,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    ServiceRequestPut(API.cancelAppliedServiceProvider + `${data.serviceRequestId}/${serviceProviderId}`, model)
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}


export function cancelHiredServiceProvider(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId,
    patientId: 0,
    cancelledDescription: data.cancelledDescription
  }
  return dispatch => {
    dispatch(cancelHiredRequest(true))
    ServiceRequestPut(API.cancelHiredServiceProvider, model)
      .then(resp => {
        dispatch(cancelHiredRequest(false))
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(cancelHiredRequest(false))
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function acceptservicerequest(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  let model = {
    serviceRequestId: data.serviceRequestId,
    serviceProviderId: serviceProviderId
  }
  return dispatch => {
    dispatch(startLoading(true))
    ServiceRequestPut(API.acceptservicerequest, model)
      .then(resp => {
        dispatch(getVisitServiceDetails(data.serviceRequestId));
        dispatch(getSchedulesList(data.patientId));
        dispatch(getIsAnyEngagedServiceRequest(data.patientId))
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function canInitiateConversation(data) {
  let serviceProviderId = getUserInfo().serviceProviderId
  return (dispatch) => {
    ThirdPartyGet(API.canInitiateConversation + `${serviceProviderId}/${data.patient.patientId}`).then((resp) => {
      dispatch(canInitiateConversationSuccess(resp.data))

    }).catch((err) => {
      logError(err);
    })
  }
};

//New Integration

export const getServiceRequestListSuccess = data => {
  return {
    type: VisitServiceDetails.getServiceRequestListSuccess,
    data
  }
}

export const getSchedulesListSuccess = (data) => {
  return {
    type: VisitServiceDetails.getSchedulesListSuccess,
    data
  }
}

export const getVisitListSuccess = (data) => {
  let isEntityServiceProvider = getUserInfo().isEntityServiceProvider
  let updatedData = data.map(res => {
    return {
      ...res,
      serviceTypes: res.serviceTypes.map((type, index) => {
        return {
          ...type,
          serviceTypeDescription: isEntityServiceProvider ? ((res.scheduleTypeId === VISIT_TYPE.assessment) ? res.scheduleType : type.serviceTypeDescription) : type.serviceTypeDescription
        }
      })
    }
  })
  return {
    type: VisitServiceDetails.getVisitListSuccess,
    updatedData
  }
}

export const getVisitListCountSuccess = (data) => {
  return {
    type: VisitServiceDetails.getVisitListCountSuccess,
    data
  }
}

export const getVisitStatusSuccess = data => {
  return {
    type: VisitServiceDetails.getVisitStatusSuccess,
    data
  }
}

export const getServiceVisitDetailsSuccess = data => {
  return {
    type: VisitServiceDetails.getServiceVisitDetailsSuccess,
    data
  }
}

export const getEntityServiceProviderListSuccess = (data) => {
  return {
    type: VisitServiceDetails.getEntityServiceProviderListSuccess,
    data
  }
}

export const disableShowmore = (data) => {
  return {
    type: VisitServiceDetails.disableShowmore,
    data
  }
}

export const clearESPList = () => {
  return {
    type: VisitServiceDetails.clearESPList
  }
}

export const getfirstlastvisitdateSuccess = data => {
  return {
    type: VisitServiceDetails.getfirstlastvisitdateSuccess,
    data
  }
}


export const getQuestionsListSuccess = data => {
  return {
    type: VisitServiceDetails.getQuestionsListSuccess,
    data
  }
}

export function getServiceRequestAssessmentQuestionByID(id) {
  return dispatch => {
    return ServiceRequestGet(`${API.getSelectedServiceRequestAssessmentQuestionnaire}${id}`)
      .then(resp => {
        dispatch(getQuestionsListSuccess(resp.data))
      })
      .catch(err => {
        // dispatch(endLoadingProcessing())
      })
  }
}


export function selectESP(espId) {
  return (dispatch, getState) => {
    let espList = getState().visitSelectionState.VisitServiceDetailsState.entityServiceProvidersList;
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


export function getEntityServiceProviderList(data, selectedESPId = null) {
  return (dispatch, getState) => {
    dispatch(loadingESPList(true))
    let commonUrl = `${getUserInfo().serviceProviderId}/${data.pageNumber}/${data.pageSize}`
    let url = selectedESPId !== null ? `${commonUrl}/${selectedESPId}` :  `${commonUrl}`
    Get(`${API.searchESP}` + url)
      .then(resp => {
        let oldEspList = getState().visitSelectionState.VisitServiceDetailsState.entityServiceProvidersList;
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
        dispatch(loadingESPList(false))
      })
      .catch(err => {
        dispatch(loadingESPList(false))
      })
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
        if (resp.data.length < 9) {
          dispatch(disableShowmore(true))
        } else if (resp.data.length === 9) {
          dispatch(disableShowmore(false))
        }
      })
      .catch(err => {
      })
  }
}

export function getServiceRequestList(patientId) {
  let serviceProviderId = getUserInfo().serviceProviderId
  return (dispatch) => {
    dispatch(isServiceRequestListLoading(true));
    ServiceRequestGet(API.getNewServiceRequestList + `${patientId}/${serviceProviderId}`).then((resp) => {
      dispatch(getServiceRequestListSuccess(resp.data))
      dispatch(isServiceRequestListLoading(false));
    }).catch((err) => {
      dispatch(isServiceRequestListLoading(false));
    })
  }
};

export function getSchedulesList(patientId) {
  return (dispatch, getState) => {

    let serviceProviderId = getUserInfo().serviceProviderId;
    let { servicePlanVisitId, visitDate, isEntityDashboard } = getState().visitSelectionState.VisitServiceDetailsState
    ServiceRequestGet(API.getSchedulesList + `${patientId}/${serviceProviderId}`)
      .then(resp => {
        let id = resp.data.map(item => item.planScheduleId);
        const model = {
          planScheduleIds: id,
          visitStatuses: [],
          serviceTypes: [],
          pageNumber: 1,
          pageSize: 10,
          startDate: isEntityDashboard ? visitDate.startVisitDateForWeb : null,
          endDate: isEntityDashboard ? visitDate.endVisitDateForWeb : null,
          patientId: patientId,
          entityServiceProviders: [],
          servicePlanVisitId: servicePlanVisitId
        }
        dispatch(getPlanId(id))
        dispatch(getSchedulesListSuccess(resp.data))
        dispatch(getVisitList(model));
        dispatch(scheduleLoading(false));
      })
      .catch(err => {
        dispatch(scheduleLoading(false));
        logError(err);
      })
  }
};

export function getVisitList(data) {
  let isEntityServiceProvider = getUserInfo().isEntityServiceProvider
  let getVisitList = isEntityServiceProvider ? API.getEspVisitList : (isEntityUser() ? API.getVisitList : API.getIspVisitList)
  data.serviceProviderId = getUserInfo().serviceProviderId
  return (dispatch, getState) => {
    let {servicePlanVisitId, visitDate, isEntityDashboard} = getState().visitSelectionState.VisitServiceDetailsState
    data.startDate = isEntityDashboard ? visitDate.startVisitDateForWeb : data.startDate
    data.endDate = isEntityDashboard ? visitDate.endVisitDateForWeb : data.startDate
    !isEntityUser() &&
      (data.serviceRequestId = getState().visitSelectionState.VisitServiceDetailsState.ServiceRequestId)
    ServiceRequestPost(getVisitList, data)
      .then(resp => {
        let pageNumber = resp && resp.data.length > 0 && resp.data[0].pageNumber
        dispatch(getPlanScheduleId(resp.data, servicePlanVisitId))
        dispatch(getVisitListSuccess(resp.data))
        dispatch(getVisitListCount(data))
        dispatch(setActivePage(pageNumber))
      })
      .catch(err => {
        logError(err)
      })
      // dispatch(isServiceRequestListLoading(false));
  }
};

export function getVisitListCount(data) {
  let getVisitListCount = getUserInfo().isEntityServiceProvider ? API.getEspVisitListCount : (isEntityUser() ? API.getVisitListCount : API.getIspVisitListCount)
  return (dispatch) => {    
    ServiceRequestPost(getVisitListCount, data)
      .then(resp => {
        dispatch(getVisitListCountSuccess(resp.data))
        dispatch(isServiceRequestListLoading(false));
      })
      .catch(err => {
        // dispatch(isServiceRequestListLoading(false));
      })
  }
};

export function getVisitStatus() {
  return (dispatch) => {
    ServiceRequestGet(API.getVisitStatus).then((resp) => {
      resp.data.forEach(obj => {
        let listToDelete = [61, 60];
        let deleatedData = resp.data.filter(obj => !listToDelete.includes(obj.id));
        let data = deleatedData.map((item) => {
          let value;
          switch (item.keyValue) {
            case 'InProgress': { value = 'In Progress'; break; }
            case 'PaymentPending': { value = 'Payment Pending'; break; }
            default: value = item.keyValue;
          }
          return {
            ...item,
            keyValue: value
          }
        });
        dispatch(getVisitStatusSuccess(data))
      })

    }).catch((err) => {
      dispatch(endLoading());
    })
  }
};
export function updateHireStatusForServiceRequest(data) {
  let model = {
    serviceProviderId: getUserInfo().serviceProviderId,
    serviceRequestId: data.serviceRequestId,
    engagedBy: USERTYPES.SERVICE_PROVIDER
  }
  return dispatch => {
    ServiceRequestPut(API.hireServiceProvider, model)
      .then(resp => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
      .catch(err => {
        dispatch(endLoading())
        dispatch(push(Path.visitServiceList))
      })
  }
}

export function updateServiceVisit(data) {
  let model = {
    serviceProviderId: data.serviceProviderId,
    servicePlanVisitId: data.servicePlanVisitId,
    planScheduleId: data.planScheduleId,
    visitDate: data.visitDate,
    startTime: data.startTime,
    duration: data.duration,
    endTime: data.endTime
  }
  return dispatch => {
    ServiceRequestPut(API.updateServiceVisit, model)
      .then(resp => {
        dispatch(endLoading())
      })
      .catch(err => {
        dispatch(endLoading())
      })
  }
}

export function getServiceVisitDetails(visitId) {
  return (dispatch) => {
    dispatch(isVisitservicedetailLoading(true))
    ServiceRequestGet(API.getServiceVisitDetails + `${visitId}`)
      .then(resp => {
        dispatch(getServiceVisitDetailsSuccess(resp.data))
        dispatch(editIndividualEditPopup(true))
        dispatch(isVisitservicedetailLoading(false))
      })
      .catch(err => {
        dispatch(isVisitservicedetailLoading(false))
      })
  }
};

export function assignESP(data) {
  return (dispatch) => {
    ServiceRequestPost(API.assignESP, data)
      .then(resp => {

        // dispatch(getVisitListSuccess(resp.data))
        // dispatch(getVisitListCount(data))
      })
      .catch(err => {

      })
  }
};

export const setActiveTab = data => {
  return {
    type: VisitServiceDetails.setActiveTab,
    data
  }
}

export function getfirstlastvisitdate(data) {
  return (dispatch) => {
    ServiceRequestPost(API.getfirstlastvisitdate, data)
      .then(resp => {
        dispatch(getfirstlastvisitdateSuccess(resp.data))

      })
  }
};

export const saveScheduleType = data => {
  return {
    type: VisitServiceDetails.saveScheduleType,
    data
  }
}

export const setAddNewScheduledClicked = data => {
  return {
    type: VisitServiceDetails.setAddNewScheduledClicked,
    data
  }
}

export const setVisitDate = data => {
  return {
    type: VisitServiceDetails.setVisitDate,
    data
  }
}

export const setEntityDashboard = data => {
  return {
    type: VisitServiceDetails.setEntityDashboard,
    data
  }
}

export function getPaymentAvailability() {
  return (dispatch) => {
    ThirdPartyGet(API.getPaymentAvailability)
      .then(resp => {
        dispatch(getPaymentAvailabilitySuccess(resp.data));
      })
      .catch(err => {
        logError(err)
      })
  }
}

export const getPaymentAvailabilitySuccess = data => {
  return {
    type: VisitServiceDetails.getPaymentAvailabilitySuccess,
    data
  }
}

export const getPlanId = (data) => {
  return {
    type: VisitServiceDetails.getPlanId,
    data
  }
}

export const modifiedPlanId = (actualData, selectedData) => {
  return {
    type: VisitServiceDetails.getPlanId,
    data: pushSpliceHandler(actualData, parseInt(selectedData, 10))
  }
}

export const setServicePlanVisitId = data => {
  return {
    type: VisitServiceDetails.setServicePlanVisitId,
    data
  }
}

export const setActivePage = data => {
  return {
    type: VisitServiceDetails.setActivePage,
    data
  }
}

export const setPlanScheduleId = data => {
  return {
    type: VisitServiceDetails.setPlanScheduleId,
    data
  }
}

export const getPlanScheduleId = (data, servicePlanVisitId) => {
  let planScheduleId = 0
  data.filter(el => {
    if (el.servicePlanVisitId === servicePlanVisitId)
      planScheduleId = el.planScheduleId
    return false
  })
  return {
    type: VisitServiceDetails.setPlanScheduleId,
    data: planScheduleId
  }
}

export const clearVisitList = () => {
  return {
    type: VisitServiceDetails.clearVisitList
  }
}

export const getIsAnyEngagedServiceRequestSuccess = data => {
  return {
    type: VisitServiceDetails.getIsAnyEngagedServiceRequestSuccess,
    data
  }
}

export const getIsAnyEngagedServiceRequest = (patientId) => async (dispatch) => {
  let serviceProviderId = getUserInfo().serviceProviderId;
  try {
    const resp = await ServiceRequestGet(`${API.getIsAnyEngagedServiceRequest}${patientId}${'/'}${serviceProviderId}`)
    dispatch(getIsAnyEngagedServiceRequestSuccess(resp.data))
  } catch (error) {
    logError(error)
  }
};