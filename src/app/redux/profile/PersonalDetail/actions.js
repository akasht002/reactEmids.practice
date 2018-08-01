import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const PersonalDetails = {
    GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
    UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
    GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL'
};

export const getPersonalDetailSuccess = (data) => {
    return {
        type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
        data
    }
};

export const updatePersonalDetailSuccess = (isSuccess) => {
    return {
        type: PersonalDetails.UPDATE_PERSONAL_DETAIL_SUCCESS,
        isSuccess
    }
}

export function getPersonalDetail() {
    return (dispatch, getState) => {
        let currstate = getState();
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.getPersonalDetail + serviceProviderId + '/').then((resp) => {
            dispatch(getPersonalDetailSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function updatePersonalDetail(data) {
    return (dispatch, getState) => {
       
        let currstate = getState();
        // console.log(data);
        let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let modal = {
            serviceProviderId: serviceProviderId,
            educationId: data.educationId,
            school: data.school,
            degree: data.degree,
            isActive: "true",
            fieldOfStudy: data.fieldOfStudy,
            startYear:data.startYear,
            endYear:data.endYear

        };
        dispatch(startLoading());
        axios.put(baseURL + API.updatePersonalDetail+'/', modal).then((resp) => {
            dispatch(getPersonalDetail());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}


