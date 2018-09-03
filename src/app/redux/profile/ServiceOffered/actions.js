import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'

export const ServiceOffered = {
    getServicesOfferedSuccess: 'get_certification_success/serviceoffered',
    getServiceOfferedDetails: 'get_service_offered_details/serviceoffered',
};

export const getServicesOfferedSuccess = (data) => {
    return {
        type: ServiceOffered.getServicesOfferedSuccess,
        data
    }
}

export const getServiceOfferedDetails = (data) => {
    return {
        type: ServiceOffered.getServiceOfferedDetails,
        data
    }
}

export function getServiceOffered() {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        axios.get(baseURL + API.getServiceOffered + serviceProviderId + '/Offer/Selected').then((resp) => {
            dispatch(getServicesOfferedSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addServiceOfferd(data) {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        axios.post(baseURL + API.addServiceOffered + serviceProviderId + '/Offer', data).then((resp) => {
            dispatch(getServiceOffered());
            dispatch(editServiceOffered());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editServiceOffered(data) {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        axios.get(baseURL + API.editServiceOffered + serviceProviderId + '/Offer').then((resp) => {
            dispatch(getServiceOfferedDetails(resp.data));
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};