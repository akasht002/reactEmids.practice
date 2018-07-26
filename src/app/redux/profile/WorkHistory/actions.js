import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const WorkHistory = {
    getWorkhistorySuccess: 'get_workhistory_success/workhistory',
    addWorkhistorySuccess: 'add_workhistory_success/workhistory',
    getWorkhistoryFieldDetails: 'get_workhistory_field_details/workhistory'
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

export const getWorkhistoryFieldDetails = (data) => {
    return {
        type: WorkHistory.getWorkhistoryFieldDetails,
        data
    }
}

export function getWorkHistory(data) {
    return (dispatch, getState) => {
        
        let currstate = getState();
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let serviceProviderId=1;
        let workHistoryId=data;
        dispatch(startLoading());
        axios.get(baseURL + API.WorkHistory + serviceProviderId+'/WorkHistory').then((resp) => {
            dispatch(getWorkhistorySuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function addWorkHistory(data) {
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

export function editWorkHistory(data) {

    return (dispatch, getState) => {
       
        let currstate = getState();
        let serviceProviderId =1;
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let workHistoryId =data;
        let modal = {
            ServiceProviderId: serviceProviderId,
            designation: data

        };

        dispatch(startLoading());
        axios.get(baseURL + API.Education +serviceProviderId+`/WorkHistory/${workHistoryId}`,modal).then((resp) => {
            dispatch(getWorkhistoryFieldDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateWorkHistory(data) {
    return (dispatch, getState) => {
       
        let currstate = getState();
        let serviceProviderId =1;
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            workHistoryId: data.workHistoryId,
            designation: data.designation,
            company: data.company,
            isActive: "true",
            location: data.location,
            fromDate:data.fromDate,
            toDate:data.toDate,
            description:data.description

        };
        dispatch(startLoading());
        axios.put(baseURL + API.Education+serviceProviderId+'/WorkHistory', modal).then((resp) => {
            dispatch(getWorkHistory());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteWorkHistory(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let currstate = getState();
        let serviceProviderId =1
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let id =data;
        axios.delete(baseURL + API.Education+`${serviceProviderId}/WorkHistory/${id}`,data).then((resp) => {
            dispatch(getWorkHistory());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};