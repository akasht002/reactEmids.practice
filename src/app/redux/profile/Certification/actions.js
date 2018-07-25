import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const Certification = {
    getCertificationSuccess: 'get_certification_success/certification',
    addCertificationSuccess: 'add_certifications_success/certification',
    getCertificationFieldDetails: 'get_certification_field_details/certification'
};

export const getCertificationSuccess = (data) => {
    return {
        type: Certification.getCertificationSuccess,
        data
    }
}

export const addCertificationSuccess = (isSuccess) => {
    return {
        type: Certification.addCertificationSuccess,
        isSuccess
    }
}

export const getCertificationFieldDetails = (data) => {
    return {
        type: Certification.getCertificationFieldDetails,
        data
    }
}

export function getCertification() {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.certification + '1' + '/Certification').then((resp) => {
            dispatch(getCertificationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addCertification(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let modal = {
            serviceProviderId: '1',
            certificationName: data.certificationName,
            authority: data.certificationAuthority,
            licenceNumber: data.certificateLicenceNumber?data.certificateLicenceNumber:'',
            isActive: true
        };
        dispatch(startLoading());
        axios.post(baseURL + API.certification + '1' + '/Certification', modal).then((resp) => {
            dispatch(addCertificationSuccess(true));
            dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editCertification(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.certification + '1' + '/Certification/' + data).then((resp) => {
            dispatch(getCertificationFieldDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateCertification(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let modal = {
            serviceProviderId: '1',
            certificationName: data.certificationName,
            authority: data.authority,
            licenceNumber: data.licenceNumber,
            isActive: true,
            certificationId: data.certificationId
        };
        dispatch(startLoading());
        axios.put(baseURL + API.certification + '1' + '/Certification', modal).then((resp) => {
            dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteCertification(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.delete(baseURL + API.certification + '1' + '/' + data).then((resp) => {
            dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


