import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const Education = {
    getEducationSuccess: 'get_education_success/education',
    addEducationSuccess: 'add_education_success/education',
    getEducationFieldDetails: 'get_education_field_details/education'
};

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
        
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.Education + serviceProviderId+'/Education').then((resp) => {
            dispatch(getEducationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function addEducation(data) {
    return (dispatch, getState) => {
       
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
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
        axios.post(baseURL + API.Education+serviceProviderId+'/Education/', modal).then((resp) => {
            dispatch(addEducationSuccess(true));
            dispatch(getEducation());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editEducation(data) {

    return (dispatch, getState) => {
       
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let educationId =data;
        let modal = {
            ServiceProviderId: serviceProviderId,
            school: data

        };

        dispatch(startLoading());
        axios.get(baseURL + API.Education +serviceProviderId+`/Education/${educationId}`,modal).then((resp) => {
            dispatch(getEducationFieldDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateEducation(data) {
    return (dispatch, getState) => {
       
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
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
        axios.put(baseURL + API.Education+serviceProviderId+'/Education', modal).then((resp) => {
            dispatch(getEducation());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteEducation(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let id =data;
        axios.delete(baseURL + API.Education+`${serviceProviderId}/Education/${id}`,data).then((resp) => {
            dispatch(getEducation());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


