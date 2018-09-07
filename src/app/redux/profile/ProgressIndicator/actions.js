import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getServiceProviderId } from '../../../services/http';

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
        dispatch(startLoading());
        Get(API.getProfilePercentage + getServiceProviderId()).then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};