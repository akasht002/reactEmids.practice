import { API } from '../../../../services/api'
import {
  ServiceRequestGet,
  ServiceRequestPost,
  ServiceRequestPut,
  getUserInfo
} from '../../../../services/http'
import { push } from '../../../navigation/actions'
import { Path } from '../../../../routes'
import { getServiceRequestVisitId } from '../PerformTasks/actions'
import { visitHistoryLoading } from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import { QuestionsList } from './bridge'
import { endLoading } from '../../../loading/actions';


export const getQuestionsListSuccess = data => {
  return {
    type: QuestionsList.getQuestionsListSuccess,
    data
  }
}

export const formDirtyFeedback = () => {
  return {
    type: QuestionsList.formDirtyFeedback,
  }
}

export const startLoadingProcessing = () => {
  return {
    type: QuestionsList.startLoading,
  }
};

export const endLoadingProcessing = () => {
  return {
    type: QuestionsList.endLoading,
  }
};

export const getServiceRequestVisitDeatilsSuccess = (data) => {
  return {
    type: QuestionsList.getServiceRequestVisitDetialsSuccess,
    data
  }
}

export const saveStartedTime = (data) => {
  return {
      type: QuestionsList.saveStartedTime,
      data
  }
}

export const setServiceVisitPlanDetail = (data) =>{
  return {
    type: QuestionsList.setServiceVisitPlanDetail,
    data
  }
}

export const saveTaskPercentage = (data)=>{
  return {
    type: QuestionsList.saveTaskPercentage,
    data
  }
}

export const getServicePlanVisitSummaryDetails = (data) => {
  return dispatch => {    
    dispatch(startLoadingProcessing())
    ServiceRequestGet(API.getServicePlanVisitSummaryDetails + `${data}`)
      .then(resp => {
        dispatch(setServiceVisitPlanDetail(resp.data))
        dispatch(endLoadingProcessing())
      })
      .catch(err => {
        dispatch(endLoadingProcessing())
      })
  }
}


export function getQuestionsList(data) {
  return dispatch => {
    let serviceProviderId = getUserInfo().serviceProviderId
    dispatch(startLoadingProcessing())
    ServiceRequestGet(API.getAssessmentQuestionsByEntityServiceProviderId + `${serviceProviderId}/${data}`)
      .then(resp => {
        dispatch(getQuestionsListSuccess(resp.data))
        dispatch(endLoadingProcessing())
      })
      .catch(err => {
        dispatch(endLoadingProcessing())
      })
  }
}

export const dispatchToAssessmentProcessing = data =>{
  return (dispatch) => {
    dispatch(getServiceRequestVisitId(data)) 
    dispatch(push(Path.assessment))
    dispatch(endLoading()); 
  }
}

export function saveAnswers(data) {
  return dispatch => {
    dispatch(startLoadingProcessing())
    ServiceRequestPost(API.visitProcessingAssessmentSave, data)
      .then(resp => {
        dispatch(push(Path.assessmentFeedback));
      })
      .catch(err => {
        dispatch(endLoadingProcessing())
        dispatch(push(Path.assessmentFeedback))
      })
  }
}
export function saveAnswerFeedback(data) {
  return dispatch => {
    dispatch(visitHistoryLoading(true))
    ServiceRequestPost(API.saveAnswers, data)
      .then(resp => {
        dispatch(visitHistoryLoading(false))
      })
      .catch(err => {
        dispatch(visitHistoryLoading(false))
      })
  }
}


export function startOrStopService(data, visitAction, startedTime) { 
  return (dispatch) => {
      const model = {
          servicePlanVisitId: data.servicePlanVisitId,
          planScheduleId: data.planScheduleId,
          serviceProviderId: getUserInfo().serviceProviderId,
          visitAction: visitAction
      }
      dispatch(startLoadingProcessing());
      ServiceRequestPut(API.updateAssessmentVisitStartEndTime, model).then((resp) => {
          dispatch(saveStartedTime(startedTime))
          dispatch(getServicePlanVisitSummaryDetails(data.servicePlanVisitId));
          dispatch(endLoadingProcessing());
      }).catch((err) => {
          dispatch(getServicePlanVisitSummaryDetails(data.servicePlanVisitId)); 
          dispatch(endLoadingProcessing());
      })
  }
};