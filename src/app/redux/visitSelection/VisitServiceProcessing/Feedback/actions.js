import axios from 'axios';
import { API, baseURL } from '../../../../services/api';
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
        axios.get(baseURL + API.getQuestionsList).then((resp) => {
            dispatch(getQuestionsListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



