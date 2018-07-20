import axios from 'axios';
import { API, baseURL } from '../../services/api';
import { startLoading, endLoading } from '../loading/actions';

export const Profile = {
    getCertificationSuccess: 'get_certification_success/profile',
    addCertificationSuccess: 'add_certifications_success/profile'
};

export const getCertificationSuccess = (data) => {
    return {
        type: Profile.getCertificationSuccess,
        data
    }
}

export const addCertificationSuccess = (isSuccess) => {
    return {
        type: Profile.addCertificationSuccess,
        isSuccess
    }
}

export function getCertification() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.getCertification + '1').then((resp) => {
            dispatch(getCertificationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addCertification(data) {
    return (dispatch, getState) => {
        let modal = {
            serviceProviderId: '1',
            certificationName: data.certificationName,
            authority: data.authority,
            licenceNumber: data.licenceNumber,
            isActive: true
        };
        dispatch(startLoading());
        axios.post(baseURL + API.addCertification, modal).then((resp) => {
            dispatch(addCertificationSuccess(true));
            dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteCertification(data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.delete(baseURL + API.deleteCertification + data).then((resp) => {
            dispatch(getCertification());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


