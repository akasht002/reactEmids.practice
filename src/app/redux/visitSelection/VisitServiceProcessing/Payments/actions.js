import { API } from '../../../../services/api';
import { ThirdPartyGet, ThirdPartyPost } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';

export const paymentsCardList = {
    getPaymentsCardListSuccess: 'get_paymentsCardList_success/performtasks',
};

export const getPaymentsCardListSuccess = (data) => {
    return {
        type: paymentsCardList.getPaymentsCardListSuccess,
        data
    }
}

export function getpaymentsCardList() {
    return (dispatch) => {
        dispatch(startLoading());
        ThirdPartyGet(API.getPaymentCardList + '191').then((resp) => {
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
        ThirdPartyPost(API.createCharge, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(push(Path.paymentfailure))
            dispatch(endLoading());
        })
    }
};

export function chargeByCustomerId(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ThirdPartyPost(API.chargeByCustomerId, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(push(Path.paymentfailure))
            dispatch(endLoading());
        })
    }
};



