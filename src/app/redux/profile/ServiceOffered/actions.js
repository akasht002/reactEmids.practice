import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';

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
        Get(API.getServiceOffered + serviceProviderId + '/Offer/Selected').then((resp) => {
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
        Post(API.addServiceOffered + serviceProviderId + '/Offer', data).then((resp) => {
            dispatch(getServiceOffered());
            dispatch(editServiceOffered());
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
        Get(API.editServiceOffered + serviceProviderId + '/Offer').then((resp) => {
            dispatch(getServiceOfferedDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};