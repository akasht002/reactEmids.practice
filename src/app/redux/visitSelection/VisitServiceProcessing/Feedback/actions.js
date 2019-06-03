import { API } from '../../../../services/api'
import {
  ServiceRequestGet,
  ServiceRequestPost
} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions'
import { push } from '../../../navigation/actions'
import { Path } from '../../../../routes'
import { getSummaryDetails, getSavedSignature } from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions';
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


export function getQuestionsList() {
  return dispatch => {
    dispatch(startLoadingProcessing())
    ServiceRequestGet(API.getQuestionsList)
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
    ServiceRequestPost(API.saveAnswers, data)
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
