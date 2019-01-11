import { API } from '../../../../services/api';
import { ThirdPartyGet, ThirdPartyPost, ThirdPartyPut } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import { DEMO } from '../../../../constants/config';

export const paymentsCardList = {
    getPaymentsCardListSuccess: 'get_paymentsCardList_success/payments',
    updateServiceRequestId: 'updateServiceRequestId/payments',
    startLoading: 'startLoading/payments',
    endLoading: 'endLoading/payments'
};

export const getPaymentsCardListSuccess = (data) => {
    return {
        type: paymentsCardList.getPaymentsCardListSuccess,
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
        dispatch(startLoading());
        ThirdPartyGet(API.getPaymentCardList + data).then((resp) => {
            dispatch(getPaymentsCardListSuccess(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function createCharge(data, claimData) {
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        ThirdPartyPost(API.createCharge, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
                dispatch(claimsSubmission(claimData))
            }
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
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
        ThirdPartyPost(API.chargeByCustomerId, data).then((resp) => {
            if (resp.data === 'success') {
                dispatch(push(Path.paymentsuccess))
                dispatch(claimsSubmission(claimData))
            }
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            if (DEMO === 'true') {
                dispatch(push(Path.paymentsuccess))
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
        ThirdPartyPost(API.claimsSubmission, data).then((resp) => {
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
        ThirdPartyPut(API.captureAmount, data).then((resp) => {
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




