import axios from 'axios';
import { API, baseURL } from '../../../services/api';
import { startLoading, endLoading } from '../../loading/actions';
import { Get, Post, Put } from '../../../services/http';
import { getServiceProviderId } from '../../../services/http';

export const AvailabilityActions = {
   setAvailabilityDays : 'set_available_days',
   setBlackoutDays: 'set_blackout_days',
   setAllAvailabilitySlots: 'set_all_availability_slots'
};

export const getAvailableDays = () => {
    return dispatch => {
        Get(API.getAvailableDays + getServiceProviderId() + '/Available').then(resp => {   
            dispatch(getAvailableDaysSuccess(resp.data[0]))
        }).catch(err => {
            dispatch(endLoading());
        })
    }
}

export const getAvailableDaysSuccess = (data) => {
    return {
        type: AvailabilityActions.setAvailabilityDays,
        data
    }
};

export const updateAvailabilityDays = (data) => {
    return dispatch => {
        let modal = {
            availableKeys: data
         };
        dispatch(startLoading());
        Post(API.addBlackOutDay + getServiceProviderId() + '/Available', modal).then(resp => {
            console.log('updateAvailabilityDays response', resp);
            dispatch(getAvailableDays());
        }).catch(err => {
            dispatch(endLoading());
        })
    }
}

export const getBlackOutDays = () => { 
    return(dispatch, getState) => {
            Get(API.getBlackOutDays + getServiceProviderId() + '/BlockOutDay').then((resp) => {
            dispatch(getBlackOutDaysSuccess(resp.data));
        }).catch( err => {
            dispatch(endLoading());
        })
    }
};

export const getBlackOutDaysSuccess = (data) =>{
    return{
        type: AvailabilityActions.setBlackoutDays,
        data: data
    }
};

export const addBlackOutDay = (data) => {
    return (dispatch, getState) => {
      // let SERVICE_PROVIDER_ID = JSON.parse(getState().authState.userState.userData).data.serviceData.serviceProviderID;
       let serviceProviderBlackoutDayId = 0;
       let modal = {
            serviceProviderId: getServiceProviderId(),
            serviceProviderBlackoutDayId: serviceProviderBlackoutDayId,
            startDate: data.fromDate,
            endDate: data.toDate,
            remarks: data.remarks,
            isActive: true
        };
        dispatch(startLoading());
        Post(API.addBlackOutDay + getServiceProviderId() + '/BlockOutDay', modal).then(resp => {
            dispatch(getBlackOutDays())
        }).catch(err => {
            dispatch(endLoading());
        })
    }
}

export const updateBlackOutDay = (data) => {
    console.log('updateBlackOutDay', data);
    return dispatch => {
       let modal = {
            serviceProviderId: getServiceProviderId(),
            serviceProviderBlackoutDayId: data.serviceProviderBlackoutDayId,
            startDate: data.fromDate,
            endDate: data.toDate,
            remarks: data.remarks,
            isActive: true
        };
        dispatch(startLoading());
        Post(API.addBlackOutDay + getServiceProviderId() + '/BlockOutDay', modal).then(resp => {
            dispatch(getBlackOutDays())
        }).catch(err => {
            dispatch(endLoading());
        })
    }
}

export const addBlackOutDaySuccess = (isSuccess) => {
    return {
        type: AvailabilityActions.setBlackoutDays,
        isSuccess
    }
}

export const getAllAvailabilitySuccess = (data) =>{
    return{
        type: AvailabilityActions.setAllAvailabilitySlots,
        data
    }
};
