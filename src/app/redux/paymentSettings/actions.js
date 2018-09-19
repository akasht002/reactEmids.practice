import { API } from '../../services/api';
import { ThirdPartyGet, ThirdPartyPost } from '../../services/http';
import { startLoading, endLoading } from '../loading/actions';

export const paymentsSettings = {
    getPaymentsCardListSuccess: 'get_paymentsCardList_success/paymentSettings',
};

export const getPaymentsCardListSuccess = (data) => {
    return {
        type: paymentsSettings.getPaymentsCardListSuccess,
        data
    }
}

export function getpaymentsCardList() {
    return (dispatch) => {
        dispatch(startLoading());
        ThirdPartyGet(API.getPaymentCardList + '100').then((resp) => {
            dispatch(getPaymentsCardListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function createCharge(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ThirdPartyPost(API.savePaymentCards, data).then((resp) => {
            dispatch(getpaymentsCardList());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function deleteCard(data) {
    return (dispatch) => {  
    dispatch(startLoading());
        ThirdPartyPost(API.deleteCard, data).then((resp) => {
            dispatch(getpaymentsCardList());
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



