import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import {SERVICE_PROVIDER} from '../../../redux/constants/constants'
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const vistServiceHistoryDetails = {
    getVisitServiceHistoryDetailsSuccess: 'getVisitServiceHistoryDetailsSuccess/visitHistory'
};

export const getVisitServiceHistoryDetailsSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryDetailsSuccess,
        data
    }
}

export function getVisitServiceDetails() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getVisitHistoryList + SERVICE_PROVIDER).then((resp) => {           
            dispatch(getVisitServiceHistoryDetailsSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};





