import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const WorkHistory = {
    getWorkhistorySuccess: 'get_workhistory_success/workhistory',
    addWorkhistorySuccess: 'add_workhistory_success/workhistory',
};

export const getWorkhistorySuccess = (data) => {
    return {
        type: WorkHistory.getWorkhistorySuccess,
        data
    }
}

export const addWorkhistorySuccess = (isSuccess) => {
    return {
        type:WorkHistory.addWorkhistorySuccess,
        isSuccess
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

export function addWorkhistory(data) {
    return (dispatch, getState) => {
       
        let currstate = getState();
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let serviceProviderId=1;
        let modal = {
            ServiceProviderId: serviceProviderId,
            designation: data.designation,
            company: data.company,
            location: data.location,
            fromDate:data.fromDate,
            toDate:data.toDate,
            description:data.description,
            "isActive": true,
            "isWorking":false

        };
        dispatch(startLoading());
        axios.post(baseURL + API.WorkHistory+serviceProviderId+'/WorkHistory', modal).then((resp) => {
            dispatch(addWorkhistorySuccess(true));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};