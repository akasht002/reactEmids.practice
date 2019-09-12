import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { getUserInfo } from '../../../services/http';
import { logError } from '../../../utils/logError';

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
    return (dispatch, getState) => {        let serviceProviderId = getUserInfo().serviceProviderId
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
        };
        Get(API.getProfilePercentage + serviceProviderId).then((resp) => {
            dispatch(getProfilePercentageSuccess(resp.data))
        }).catch((err) => {
            logError(err)
        })
    }
};