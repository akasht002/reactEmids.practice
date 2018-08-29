import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'

export const ProgressIndicator = {
    getProfilePercentageSuccess: 'get_profile_percentage_success/progressIndicator',
};

export const getProfilePercentageSuccess = (data) => {
    return {
        type: ProgressIndicator.getProfilePercentageSuccess,
        data
    }
}

export function getProfilePercentage() {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        axios.get(baseURL + API.getProfilePercentage + SERVICE_PROVIDER_TYPE_ID).then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};