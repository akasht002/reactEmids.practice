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
        //let currstate = getState();
        //let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let languages = data.split(/\s*,\s*/).map((val) => {
            return {
                id: Number.parseInt(val),
                name: ""
            }
        });
        let modal = {
            // serviceProviderId: serviceProviderId,
            serviceProviderId: '1',
            languages: languages

        };
        dispatch(startLoading());
        axios.post(baseURL + API.addLanguages + '1' + '/Language', modal).then((resp) => {
            // dispatch(addCertificationSuccess(true));
            // dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSelectedLanguages(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.addLanguages + '1' + '/Language').then((resp) => {
            dispatch(getSelectedLanguageDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

// export function updateCertification(data) {
//     return (dispatch, getState) => {
//         let currstate = getState();
//         let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
//         let modal = {
//             serviceProviderId: serviceProviderId,
//             certificationName: data.certificationName,
//             authority: data.authority,
//             licenceNumber: data.licenceNumber,
//             isActive: true,
//             certificationId: data.certificationId
//         };
//         dispatch(startLoading());
//         axios.put(baseURL + API.editCertification, modal).then((resp) => {
//             dispatch(getCertification());
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };

// export function deleteCertification(data) {
//     return (dispatch, getState) => {
//         dispatch(startLoading());
//         axios.delete(baseURL + API.deleteCertification + data).then((resp) => {
//             dispatch(getCertification());
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };


