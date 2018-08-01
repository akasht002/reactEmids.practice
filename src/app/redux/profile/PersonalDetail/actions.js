import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';

export const PersonalDetails = {
    GET_PERSONAL_DETAIL_SUCCESS: 'GET_PERSONAL_DETAIL_SUCCESS',
    UPDATE_PERSONAL_DETAIL_SUCCESS: 'UPDATE_PERSONAL_DETAIL_SUCCESS',
    GET_PERSONAL_DETAIL: 'GET_PERSONAL_DETAIL'
};

export const getPersonalDetailSuccess = (data) => {
    console.log({
        type: PersonalDetails.GET_PERSONAL_DETAIL_SUCCESS,
        data
    });
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
        let serviceProviderId = 1;
        let currstate = getState();
        // let serviceProviderId = currstate.onboardingState.setPasswordState.serviceProviderDetails.serviceProviderId;
        dispatch(startLoading());
        axios.get(baseURL + API.getPersonalDetail + serviceProviderId + '/ProfileView').then((resp) => {
            console.log(resp.data);
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
        let modal = {
            serviceProviderId: serviceProviderId,
            details:{
                "serviceProviderId": serviceProviderId,
                "serviceProviderTypeId": 0,
                "individual": {
                  "firstName": data.firstName,
                  "middleName": "",
                  "lastName": data.lastName,
                  "age":  data.age,
                  "gender": {
                    "genderId": 0,
                    "name": data.genderName
                  },
                  "yearOfExperience": data.yearOfExperience,
                  "affiliation": {
                    "affiliationId": 0,
                    "name": data.affiliationName
                  }
                },
                "entity": {
                  "organization": "string",
                  "entityId": data.organization
                },
                "description": data.description,
                "hourlyRate": data.hourlyRate,
                "addresses": [
                  {
                    "addressId": 0,
                    "serviceProviderId": 0,
                    "addressTypeId": 0,
                    "streetAddress": data.streetAddress,
                    "city": data.city,
                    "state": {
                      "id": 0,
                      "name": data.state
                    },
                    "zipCode": data.zipCode,
                    "isActive": true,
                    "rowversionId": "string"
                  }
                ],
                "phoneNumber": data.phoneNumber,
                "isActive": true,
                "rowversionId": "string"
              }
        };
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


