import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

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
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        axios.get(baseURL + API.education + serviceProviderId+'/Education').then((resp) => {
            dispatch(getEducationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })

    }
};

export function addEducation(data) {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
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
        axios.post(baseURL + API.education+serviceProviderId+'/Education/', modal).then((resp) => {
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

    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        let educationId =data;
        let modal = {
            ServiceProviderId: serviceProviderId,
            school: data

        };

        dispatch(startLoading());
        axios.get(baseURL + API.education +serviceProviderId+`/Education/${educationId}`,modal).then((resp) => {
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
        let serviceProviderId = localStorage.getItem('serviceProviderID');
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
        axios.put(baseURL + API.education+serviceProviderId+'/Education', modal).then((resp) => {
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
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        let id =data;
        axios.delete(baseURL + API.education+`${serviceProviderId}/Education/${id}`,data).then((resp) => {
            dispatch(getEducation());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


