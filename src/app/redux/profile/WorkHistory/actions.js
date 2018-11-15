import { API } from '../../../services/api';
import { Get, Post, Put, Delete } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

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

export function getWorkHistory() {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        dispatch(startLoading());
        Get(API.WorkHistory +`${serviceProviderId}/WorkHistory`).then((resp) => {
            dispatch(getWorkhistorySuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function addWorkHistory(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let modal = {
            ServiceProviderId: serviceProviderId,
            workHistoryId:data.workHistoryId,
            designation: data.designation,
            company: data.company,
            location: data.location,
            fromDate:data.fromDate,
            toDate:data.toDate,
            description:data.description,
            isWorking:data.isWorking,
            isActive: true,
            currentlyWorking: data.currentlyWorking
        };
        dispatch(startLoading());
        Post(API.WorkHistory+`${serviceProviderId}/WorkHistory`, modal).then((resp) => {
            dispatch(addWorkhistorySuccess(true));
            dispatch(getWorkHistory())
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editWorkHistory(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let workHistoryId=data;
        let modal = {
            serviceProviderId: serviceProviderId,
            workHistoryId
        };
        dispatch(startLoading());
        Get(API.WorkHistory + `${serviceProviderId}/WorkHistory/${workHistoryId}`, modal).then((resp) => {
            dispatch(getWorkhistoryFieldDetails(resp.data));
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateWorkHistory(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            workHistoryId: parseInt(data.workHistoryId),
            designation: data.designation,
            company: data.company,
            isActive: "true",
            location: data.location,
            fromDate:data.fromDate,
            toDate:data.toDate,
            description:data.description,
            isWorking:data.isWorking,
            currentlyWorking: data.currentlyWorking
        };
        dispatch(startLoading());
        Put(API.WorkHistory + `${serviceProviderId}/WorkHistory`, modal).then((resp) => {
            dispatch(addWorkhistorySuccess(true));
            dispatch(getWorkHistory());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteWorkHistory(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
        let id =data;
        Delete(API.WorkHistory + `${serviceProviderId}/WorkHistory/${id}`, data).then((resp) => {
            dispatch(getWorkHistory());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};