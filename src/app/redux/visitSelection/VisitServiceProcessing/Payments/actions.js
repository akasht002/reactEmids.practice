import { API } from '../../../../services/api';
import { ThirdPartyGet, ThirdPartyPost, ThirdPartyPut } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import { DEMO } from '../../../../constants/config';
import { PAYMENT_ALREADY_DONE } from '../../../../constants/constants'
import { paymentsCardList } from './bridge';

export const getPaymentsCardListSuccess = (data) => {
    return {
        type: paymentsCardList.getPaymentsCardListSuccess,
        data
    }
}

export const paymentPathValid = (data) => {
    return {
        type: paymentsCardList.isPaymentPathValid,
        data
    }
}

export const paymentSuccessOrFailure = (data) => {
    return {
        type: paymentsCardList.paymentSuccessOrFailure,
        data
    }
}

export const updateServiceRequestId = (data) => {
    return {
        type: paymentsCardList.updateServiceRequestId,
        data
    }
}

export const startLoadingProcessing = () => {
    return {
        type: paymentsCardList.startLoading,
    }
};

export const endLoadingProcessing = () => {
    return {
        type: paymentsCardList.endLoading,
    }
};

export function getpaymentsCardList(data) {
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        return ThirdPartyGet(API.getPaymentCardList + data).then((resp) => {
            dispatch(getPaymentsCardListSuccess(resp.data))
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};

export function createCharge(data, claimData) {
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        return ThirdPartyPost(API.createCharge, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
                dispatch(claimsSubmission(claimData))
            }
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
            } else if (err.response && err.response.data === PAYMENT_ALREADY_DONE) {
                dispatch(paymentSuccessOrFailure(err.response.data))
            } else {
                dispatch(push(Path.paymentfailure))
            }
            dispatch(endLoadingProcessing());
        })
    }
};

export function chargeByCustomerId(data, claimData) {
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        return ThirdPartyPost(API.chargeByCustomerId, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
                dispatch(claimsSubmission(claimData))
            }
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
            } else if (err.response && err.response.data === PAYMENT_ALREADY_DONE) {
                dispatch(paymentSuccessOrFailure(err.response.data))
            } else {
                dispatch(push(Path.paymentfailure))
            }
            dispatch(endLoadingProcessing());
        })
    }
};

export function claimsSubmission(data) {
    return (dispatch) => {
        dispatch(startLoading());
        return ThirdPartyPost(API.claimsSubmission, data).then((resp) => {
            dispatch(endLoading());
            //dispatch(push(Path.paymentsuccess))
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
            } else {
                //dispatch(push(Path.paymentfailure))
            }
            dispatch(endLoading());
        })
    }
};

export function captureAmount(data, claimData) {
    return (dispatch) => {
        dispatch(startLoading());
        return ThirdPartyPut(API.captureAmount, data).then((resp) => {
            dispatch(endLoading());
            dispatch(push(Path.paymentsuccess))
            dispatch(claimsSubmission(claimData))
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
            } else {
                dispatch(push(Path.paymentfailure))
            }
            dispatch(endLoading());
        })
    }
};




