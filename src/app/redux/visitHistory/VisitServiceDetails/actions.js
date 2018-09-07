import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import {SERVICE_PROVIDER} from '../../../redux/constants/constants'
import { push } from '../../navigation/actions';
import { Path } from '../../../routes';

export const vistServiceHistoryDetails = {
    getVisitServiceHistoryListSuccess: 'getVisitServiceHistoryListSuccess/visitHistory',
    getVisitServiceHistoryByIdDetailSuccess: 'getVisitServiceHistoryByIdDetailSuccess/visitHistory',

};

export const getVisitServiceHistoryListSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryListSuccess,
        data
    }
}

export const getVisitServiceHistoryByIdDetailSuccess = (data) => {
    return {
        type: vistServiceHistoryDetails.getVisitServiceHistoryByIdDetailSuccess,
        data
    }
}

export function getVisitServiceLists() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getVisitHistoryList + SERVICE_PROVIDER).then((resp) => {           
            dispatch(getVisitServiceHistoryListSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


export function getVisitServiceHistoryByIdDetail(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getServiceVisitsHistoryById + data).then((resp) => {           
            dispatch(getVisitServiceHistoryByIdDetailSuccess(resp.data)) 
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};





