import { API } from '../../../services/api';
import { Get, Post, Put, Delete } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getUserInfo } from '../../../services/http';
import { getProfilePercentage } from '../../profile/ProgressIndicator/actions';
import { Certification } from './bridge';

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
        let serviceProviderId =  getUserInfo().serviceProviderId;
        if(getState().profileState.PersonalDetailState.serviceProviderId){
            serviceProviderId = getState().profileState.PersonalDetailState.serviceProviderId;
          };
        dispatch(startLoading());
        return Get(API.certification + serviceProviderId + '/Certification').then((resp) => {
            dispatch(getCertificationSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function addCertification(data) {
    return (dispatch) => {
        let serviceProviderId =  getUserInfo().serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            certificationName: data.certificationName,
            authority: data.authority,
            licenceNumber: data.licenceNumber,
            isActive: true
        };
        dispatch(startLoading());
        return Post(API.certification + serviceProviderId + '/Certification', modal).then((resp) => {
            dispatch(addCertificationSuccess(true));
            dispatch(getCertification());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function editCertification(data) {
    return (dispatch) => {
        let serviceProviderId =  getUserInfo().serviceProviderId;
        dispatch(startLoading());
        Get(API.certification + serviceProviderId + '/Certification/' + data).then((resp) => {
            dispatch(getCertificationFieldDetails(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updateCertification(data) {
    return (dispatch) => {
        let serviceProviderId =  getUserInfo().serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            certificationName: data.certificationName,
            authority: data.authority,
            licenceNumber: data.licenceNumber,
            isActive: true,
            certificationId: data.certificationId
        };
        dispatch(startLoading());
        Put(API.certification + serviceProviderId + '/Certification', modal).then((resp) => {
            dispatch(addCertificationSuccess(true));
            dispatch(getCertification());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteCertification(data) {
    return (dispatch) => {
        let serviceProviderId = getUserInfo().serviceProviderId;
        dispatch(startLoading());
        Delete(API.certification + serviceProviderId + '/' + data).then((resp) => {
            dispatch(getCertification());
            dispatch(getProfilePercentage());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};


