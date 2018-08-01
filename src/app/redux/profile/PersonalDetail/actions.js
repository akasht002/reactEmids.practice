import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const PersonalDetails = {
    GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
    UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
    GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL',
    GET_CITY_SUCCESS: 'GET_CITY_SUCCESS',
    GET_CITY_DETAIL: 'GET_CITY_DETAIL'
};

export const getPersonalDetailSuccess = (data) => {    
    return {
        type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
        data
    }
};

export const getCitySuccess = (data) => {    
    return {
        type: PersonalDetails.GET_CITY_SUCCESS,
        data
    }
};

export function getCityDetail() {
    return (dispatch, getState) => {
        dispatch(startLoading());
        axios.get(baseURL + API.getCity).then((resp) => {
            dispatch(getCitySuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
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
        let serviceProviderId = 1;
        let currstate = getState();
        // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.getPersonalDetail + serviceProviderId + '/ProfileView').then((resp) => {
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
        let serviceProviderId = 1;
        // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        let modal ={
            "serviceProviderId": serviceProviderId,
            "serviceProviderTypeId": 1,
            "individual": {
              "firstName": data.firstName,
              "middleName": "M",
              "lastName": data.lastName,
              "age":  data.age,
              "gender": {
                "genderId": 6,
                "name": data.genderName
              },
              "yearOfExperience": data.yearOfExperience,
              "affiliation": {
                "affiliationId": 1,
                "name": data.affiliationName
              }
            },
            "entity": {
              "organization": data.organization,
              "entityId": 1
            },
            "description": data.description,
            "hourlyRate": data.hourlyRate,
            "addresses": [
              {
                "addressId": 1,
                "serviceProviderId": 0,
                "addressTypeId": 2,
                "streetAddress": data.streetAddress,
                "city": data.city,
                "state": {
                  "id": 1,
                  "name": "Alabama"
                },
                "zipCode": data.zipCode,
                "isActive": true
              }
            ],
            "phoneNumber": data.phoneNumber,
            "isActive": true 
        }
        console.log(data);
        dispatch(startLoading());
        axios.put(baseURL + API.updatePersonalDetail+serviceProviderId, modal).then((resp) => {
            dispatch(getPersonalDetail());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
}


