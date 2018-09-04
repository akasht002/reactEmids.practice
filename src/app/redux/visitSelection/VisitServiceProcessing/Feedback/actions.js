import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPost } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const QuestionsList = {
    getQuestionsListSuccess: 'get_questions_list_success/performtasks',
};

export const getQuestionsListSuccess = (data) => {
    return {
        type: QuestionsList.getQuestionsListSuccess,
        data
    }
}

export function getQuestionsList() {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getQuestionsList).then((resp) => {
            dispatch(getQuestionsListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function saveAnswers(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPost(API.saveAnswers, data).then((resp) => {
            dispatch(push(Path.summary))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
            dispatch(push(Path.summary))
        })
    }
};



