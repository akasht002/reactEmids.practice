import { API } from '../../../../services/api'
import {
  ServiceRequestGet,
  ServiceRequestPost,
  getUserInfo
} from '../../../../services/http'
import { push } from '../../../navigation/actions'
import { Path } from '../../../../routes'
import { visitHistoryLoading } from '../../../../redux/visitHistory/VisitServiceDetails/actions'
import {QuestionsList} from './bridge'

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


export function getQuestionsList(data) {
  return dispatch => {
    let serviceProviderId = getUserInfo().serviceProviderId
    dispatch(startLoadingProcessing())
    ServiceRequestGet(API.getAssessmentQuestionsByEntityServiceProviderId + `${serviceProviderId}/${323}`)
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
