import { API } from '../../../services/api';
import { Get } from '../../../services/http';
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
        Get(API.getProfilePercentage + serviceProviderId).then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};