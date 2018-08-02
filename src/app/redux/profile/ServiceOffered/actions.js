import axios from 'axios';
import { API, baseURL } from '../../../services/api';
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
    return (dispatch, getState) => {
        // let currstate = getState();
        // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.getServiceOffered + '1' + '/Offer/Selected').then((resp) => {
            dispatch(getServicesOfferedSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addServiceOfferd(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.post(baseURL + API.addServiceOffered + '1' + '/Offer', data).then((resp) => {
            dispatch(getServiceOffered());
            dispatch(editServiceOffered());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editServiceOffered(data) {
    return (dispatch, getState) => {
        // let currstate = getState();
        // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.editServiceOffered + '1' + '/Offer').then((resp) => {
            dispatch(getServiceOfferedDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};