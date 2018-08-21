import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';

export const SummaryDetails = {
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
};

export const getSummaryDetailsSuccess = (data) => {
    return {
        type: SummaryDetails.getSummaryDetailsSuccess,
        data
    }
}

export function getSummaryDetails() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getSummaryDetails + '3').then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

// export function saveAnswers(data) {
//     return (dispatch) => {
//         dispatch(startLoading());
//         axios.post(baseURLServiceRequest + API.saveAnswers, data).then((resp) => {
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };



