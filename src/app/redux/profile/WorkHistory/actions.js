import { API } from '../../../services/api';
import { Get, Post, Put, Delete } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { WorkHistory } from './bridge';

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
    return (dispatch, getState) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
        };
        dispatch(startLoading());
        return Get(API.WorkHistory +`${serviceProviderId}/WorkHistory`).then((resp) => {
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
            isActive: true,
            currentlyWorking: data.currentlyWorking
        };
        dispatch(startLoading());
        return Post(API.WorkHistory+`${serviceProviderId}/WorkHistory`, modal).then((resp) => {
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
        return Get(API.WorkHistory + `${serviceProviderId}/WorkHistory/${workHistoryId}`, modal).then((resp) => {
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
            workHistoryId: parseInt(data.workHistoryId, 10),
            designation: data.designation,
            company: data.company,
            isActive: "true",
            location: data.location,
            fromDate:data.fromDate,
            toDate:data.toDate,
            description:data.description,
            currentlyWorking: data.currentlyWorking
        };
        dispatch(startLoading());
        return Put(API.WorkHistory + `${serviceProviderId}/WorkHistory`, modal).then((resp) => {
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
        return Delete(API.WorkHistory + `${serviceProviderId}/WorkHistory/${id}`, data).then((resp) => {
            dispatch(getWorkHistory());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};