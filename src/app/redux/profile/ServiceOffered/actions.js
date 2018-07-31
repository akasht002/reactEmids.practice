import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const ServiceOffered = {
    getServicesOfferedSuccess: 'get_certification_success/serviceoffered',
    getServiceOfferedDetails: 'get_service_offered_details/serviceoffered',
    // getCertificationFieldDetails: 'get_certification_field_details/certification'
};

export const getServicesOfferedSuccess = (data) => {
    return {
        type: ServiceOffered.getServicesOfferedSuccess,
        data
    }
}

// export const addCertificationSuccess = (isSuccess) => {
//     return {
//         type: Certification.addCertificationSuccess,
//         isSuccess
//     }
// }

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

// export function addCertification(data) {
//     return (dispatch, getState) => {
//         let currstate = getState();
//         let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
//         let modal = {
//             serviceProviderId: serviceProviderId,
//             certificationName: data.certificationName,
//             authority: data.authority,
//             licenceNumber: data.licenceNumber,
//             isActive: true
//         };
//         dispatch(startLoading());
//         axios.post(baseURL + API.certification + serviceProviderId + '/Certification', modal).then((resp) => {
//             dispatch(addCertificationSuccess(true));
//             dispatch(getCertification());
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };

// export function editCertification(data) {
//     return (dispatch, getState) => {
//         let currstate = getState();
//         let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
//         dispatch(startLoading());
//         axios.get(baseURL + API.certification + serviceProviderId + '/Certification/' + data).then((resp) => {
//             dispatch(getCertificationFieldDetails(resp.data))
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };

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
//         axios.put(baseURL + API.certification + serviceProviderId + '/Certification', modal).then((resp) => {
//             dispatch(getCertification());
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };

// export function deleteCertification(data) {
//     return (dispatch, getState) => {
//         let currstate = getState();
//         let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
//         dispatch(startLoading());
//         axios.delete(baseURL + API.certification + serviceProviderId + '/' + data).then((resp) => {
//             dispatch(getCertification());
//             dispatch(endLoading());
//         }).catch((err) => {
//             dispatch(endLoading());
//         })
//     }
// };


