import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const Languages = {
    getLanguagesSuccess: 'get_languages_success/languages',
    getSelectedLanguageDetails: 'get_selected_language_details/languages'
};

export const getLanguagesSuccess = (data) => {
    return {
        type: Languages.getLanguagesSuccess,
        data
    }
}

export const getSelectedLanguageDetails = (data) => {
    return {
        type: Languages.getSelectedLanguageDetails,
        data
    }
}

export function getLanguages() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.getLanguages).then((resp) => {
            dispatch(getLanguagesSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addLanguages(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let languages = data ? data.split(/\s*,\s*/).map((val) => {
            return {
                id: Number.parseInt(val),
                name: ""
            }
        }) : [];
        let modal = {
            serviceProviderId: serviceProviderId,
            languages: languages

        };
        dispatch(startLoading());
        axios.post(baseURL + API.addLanguages + serviceProviderId + '/Language', modal).then((resp) => {
            dispatch(getSelectedLanguages());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSelectedLanguages() {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.addLanguages + serviceProviderId + '/Language').then((resp) => {
            dispatch(getSelectedLanguageDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};