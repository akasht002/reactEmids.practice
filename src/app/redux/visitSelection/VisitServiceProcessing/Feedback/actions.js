import { API } from '../../../../services/api'
import {
  ServiceRequestGet,
  ServiceRequestPost,
  getUserInfo
} from '../../../../services/http'
import { push } from '../../../navigation/actions'
import { Path } from '../../../../routes'
import { getSummaryDetails, getSavedSignature } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
import { visitHistoryLoading } from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import {QuestionsList} from './bridge'
import { isEntityUser } from '../../../../utils/userUtility';

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


export function getQuestionsList() {
  return dispatch => {
    dispatch(startLoadingProcessing())
    return ServiceRequestGet(API.getQuestionsList)
      .then(resp => {
        dispatch(getQuestionsListSuccess(resp.data))
        dispatch(endLoadingProcessing())
      })
      .catch(err => {
        dispatch(endLoadingProcessing())
      })
  }
}

export function saveAnswers(data) {
  let isPlan = (getUserInfo().isEntityServiceProvider || isEntityUser())
  let  saveAnswers  = isPlan ? API.saveAnswersForEsp : API.saveAnswers
  let model = isPlan ? {
    servicePlanVisitId: data.serviceRequestVisitId,
    serviceProviderId: data.serviceProviderId,
    answers: data.answers
  } : data
  return dispatch => {
    dispatch(startLoadingProcessing())
    ServiceRequestPost(saveAnswers, model)
      .then(resp => {
        dispatch(getSummaryDetails(data.serviceRequestVisitId));
        dispatch(getSavedSignature(data.serviceRequestVisitId));
      })
      .catch(err => {
        dispatch(endLoadingProcessing())
        dispatch(push(Path.summary))
      })
  }
}
export function saveAnswerFeedback(data) {
  return (dispatch) => {
    let isPlan = (getUserInfo().isEntityServiceProvider || isEntityUser()) 
    let  saveAnswers  = isPlan ? API.saveAnswersForEsp : API.saveAnswers
    data.servicePlanVisitId = isPlan && data.serviceRequestVisitId
    data.serviceProviderId = getUserInfo().serviceProviderId 
    dispatch(visitHistoryLoading(true))
    ServiceRequestPost(saveAnswers, data)
      .then(resp => {
        dispatch(visitHistoryLoading(false))
      })
      .catch(err => {
        dispatch(visitHistoryLoading(false))
      })
  }
}
