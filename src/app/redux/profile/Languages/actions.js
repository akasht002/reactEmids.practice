import { API } from '../../../services/api';
import { Get, Post } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { Languages } from './bridge';

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
        let serviceProviderId = getUserInfo().serviceProviderId;
        let languages = data ? data.split(/\s*,\s*/).map((val) => {
            return {
                id: Number.parseInt(val,10),
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
    return (dispatch, getState) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
          };
        dispatch(startLoading());
        Get(API.addLanguages + serviceProviderId + '/Language').then((resp) => {
            dispatch(getSelectedLanguageDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};