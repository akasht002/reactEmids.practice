import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { SERVICE_PROVIDER_TYPE_ID } from '../../../redux/constants/constants'
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';

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
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.getLanguages).then((resp) => {
            dispatch(getLanguagesSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addLanguages(data) {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        let languages = data ? data.split(/\s*,\s*/).map((val) => {
            return {
                id: Number.parseInt(val, 0),
                name: ""
            }
        }) : [];
        let modal = {
            serviceProviderId: serviceProviderId,
            languages: languages

        };
        dispatch(startLoading());
        Post(API.addLanguages + serviceProviderId + '/Language', modal).then((resp) => {
            dispatch(getSelectedLanguages());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSelectedLanguages() {
    return (dispatch) => {
        let serviceProviderId = localStorage.getItem('serviceProviderID');
        dispatch(startLoading());
        Get(API.addLanguages + serviceProviderId + '/Language').then((resp) => {
            dispatch(getSelectedLanguageDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};