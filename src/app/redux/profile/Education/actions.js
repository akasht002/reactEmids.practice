import { API } from '../../../services/api';
import { Get, Post, Put, Delete } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { Education } from './bridge';

export const getEducationSuccess = (data) => {
    return {
        type: Education.getEducationSuccess,
        data
    }
}

export const addEducationSuccess = (isSuccess) => {
    return {
        type: Education.addEducationSuccess,
        isSuccess
    }
}

export const getEducationFieldDetails = (data) => {
    return {
        type: Education.getEducationFieldDetails,
        data
    }
}

export function getEducation() {
    return (dispatch, getState) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
          };
        dispatch(startLoading());
        Get(API.education + serviceProviderId+'/Education').then((resp) => {
            dispatch(getEducationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function addEducation(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let modal = {
            ServiceProviderId: serviceProviderId,
            school: data.school,
            degree: data.degree,
            fieldOfStudy: data.fieldOfStudy,
            isActive: "true",
            startYear:data.startYear,
            endYear:data.endYear

        };
        dispatch(startLoading());
        Post(API.education+serviceProviderId+'/Education/', modal).then((resp) => {
            dispatch(addEducationSuccess(true));
            dispatch(getEducation());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editEducation(data) {
    return (dispatch,getState) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
          };
        let educationId =data;
        let modal = {
            ServiceProviderId: serviceProviderId,
            school: data

        };
        dispatch(startLoading());
        Get(`${API.education}${serviceProviderId}/Education/${educationId}`,modal).then((resp) => {
            dispatch(getEducationFieldDetails(resp.data))
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateEducation(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            educationId: data.educationId,
            school: data.school,
            degree: data.degree,
            isActive: "true",
            fieldOfStudy: data.fieldOfStudy,
            startYear:data.startYear,
            endYear:data.endYear

        };
        dispatch(startLoading());
        Put(API.education+serviceProviderId+'/Education', modal).then((resp) => {
            dispatch(addEducationSuccess(true));
            dispatch(getEducation());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteEducation(data) {
    return (dispatch) => {
        dispatch(startLoading());
        let serviceProviderId = getUserInfo().serviceProviderId;
        let id = data;
        Delete(API.education + `${serviceProviderId}/Education/${id}`, data).then((resp) => {
            dispatch(getEducation());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};
