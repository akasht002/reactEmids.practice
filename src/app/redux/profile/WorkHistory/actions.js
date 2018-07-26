import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const WorkHistory = {
    getWorkhistorySuccess: 'get_workhistory_success/workhistory'
};

export const getWorkhistorySuccess = (data) => {
    return {
        type: WorkHistory.getWorkhistorySuccess,
        data
    }
}

export function getWorkHistory(data) {
    return (dispatch, getState) => {
        
        let currstate = getState();
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let serviceProviderId=1;
        let educationId=data;
        dispatch(startLoading());
        axios.get(baseURL + API.WorkHistory + serviceProviderId+'/WorkHistory').then((resp) => {
            dispatch(getWorkhistorySuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};