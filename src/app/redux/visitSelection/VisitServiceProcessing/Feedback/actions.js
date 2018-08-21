import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';

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
        axios.get(baseURLServiceRequest + API.getQuestionsList).then((resp) => {
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
        axios.post(baseURLServiceRequest + API.saveAnswers, data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



