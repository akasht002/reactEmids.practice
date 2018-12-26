import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut, ServiceRequestPost, ThirdPartyPost } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import moment from 'moment'
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import { DEMO } from '../../../../constants/config';
import { getUserInfo } from '../../../../services/http';
import { updateServiceRequestId } from '../Payments/actions';

export const SummaryDetails = {
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
    getCalculationsData: 'get_calculations_data/summarydetails',
    saveOriginalTimeDiff: 'save_original_time_diff/summarydetails',
    saveActualTimeDiff: 'save_actual_time_diff/summarydetails',
    getSavedSignatureSuccess: 'getSavedSignatureSuccess/summarydetails',
    formDirtySummaryDetails: 'formDirtySummaryDetails/summarydetails',
    getVisitServiceEligibityStatusSuccess: 'getVisitServiceEligibityStatusSuccess/summarydetails',
};

export const getSummaryDetailsSuccess = (data) => {
    return {
        type: SummaryDetails.getSummaryDetailsSuccess,
        data
    }
}

export const getVisitServiceEligibityStatusSuccess = data => {
    return {
        type: SummaryDetails.getVisitServiceEligibityStatusSuccess,
        data
    }
}

export const getCalculationsData = (data) => {
    return {
        type: SummaryDetails.getCalculationsData,
        data
    }
}

export const saveOriginalTimeDiff = (data) => {
    return {
        type: SummaryDetails.saveOriginalTimeDiff,
        data
    }
}

export const saveActualTimeDiff = (data) => {
    return {
        type: SummaryDetails.saveActualTimeDiff,
        data
    }
}

export const getSavedSignatureSuccess = (data) => {
    return {
        type: SummaryDetails.getSavedSignatureSuccess,
        data
    }
}

export const formDirtySummaryDetails = () => {
    return {
        type: SummaryDetails.formDirtySummaryDetails,
    }
}

export function getSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            // dispatch(calculationsFirstTime(resp.data));
            dispatch(getVisitServiceEligibilityStatus(resp.data))
            // dispatch(push(Path.summary))
            //dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSummaryDetail(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(API.getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};
/* Added By Vimal on 24/12/2018 */
export function updateVisitProcessingUpdateBilledDuration(data, visitId) {
    let calculate = (data / 1000) / 60
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(API.visitProcessingUpdateBilledDuration + `/${visitId}/${calculate}`).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getVisitServiceEligibilityStatus(data) {
    const eligibilityData = {
        patientId: data.patient.patientId,
        serviceProviderId: data.serviceProviderId,
        serviceRequestId: data.serviceRequestId
    }
    return (dispatch) => {
        dispatch(startLoading());
        ThirdPartyPost(API.getServiceRequestEligibilityStatus, eligibilityData).then((resp) => {
            dispatch(getVisitServiceEligibityStatusSuccess(resp.data));
            dispatch(calculationsFirstTime(data));
            dispatch(push(Path.summary))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function calculationActualData() {
    return (dispatch, getState) => {

        const currState = getState().visitSelectionState.VisitServiceProcessingState.SummaryState;

        const ClaimState = DEMO === 'true' ? 20 : getState().visitSelectionState.VisitServiceProcessingState.SummaryState.VisitServiceElibilityStatus.amount

        let duration = DEMO === 'true' ? moment.duration(3600000) : moment.duration(currState.actualTimeDiff);

        let hours = duration.days() * 24 + duration.hours();

        let min = duration.minutes();

        let sec = duration.seconds();

        let totalChargableTime = hours + ":" + min + ":" + sec;

        let hoursinMin = duration.asMinutes();

        let totalVisitCost = (currState.hourlyRate / 60) * hoursinMin;

        if (totalVisitCost < 1) {
            totalVisitCost = 1
        } else {
            totalVisitCost = totalVisitCost
        }

        let taxes = (totalVisitCost * currState.taxPaid) / 100;

        let grandTotalAmount = totalVisitCost + taxes;

        let estimatedClaim;
        let copayAmount;

        ClaimState ?
            estimatedClaim = DEMO === 'true' ? 12 : (grandTotalAmount - ((grandTotalAmount * ClaimState) / 100)).toFixed(2)
            :
            estimatedClaim = 0

        ClaimState ?
            copayAmount = DEMO === 'true' ? 10 : (((grandTotalAmount * ClaimState) / 100)).toFixed(2)
            :
            copayAmount = grandTotalAmount

        // let estimatedClaim = DEMO === 'true' ? 12 : (grandTotalAmount - ((grandTotalAmount * ClaimState) / 100)).toFixed(2);

        // let copayAmount = DEMO === 'true' ? 10 : (((grandTotalAmount * ClaimState) / 100)).toFixed(2);

        const calculationdata = {
            totalChargableTime: totalChargableTime,
            totalVisitCost: totalVisitCost,
            taxes: taxes,
            grandTotalAmount: grandTotalAmount,
            totalHours: hours,
            totalMinutes: min,
            totalSeconds: sec,
            estimatedClaim: estimatedClaim,
            copayAmount: copayAmount
        }
        dispatch(getCalculationsData(calculationdata));
    }
}

export function calculationsFirstTime(data) {
    return (dispatch) => {
        const startTime = data.visitStartTime;
        const endTime = data.visitEndTime;

        let startTimeinMs = moment(startTime);
        let endTimeinMs = moment(endTime);
        let timediffms;

        if (data.billedTotalDuration !== "00:00:00") {
            let hms = data.billedTotalDuration
            let splits = hms.split(":")
            timediffms = ((+splits[0]) * 60 * 60 + (+splits[1]) * 60 + (+splits[2])) * 1000
        } else {
            timediffms = endTimeinMs.diff(startTimeinMs, "milliseconds")
        }
        let dataObj = {
            timediffms: timediffms,
            hourlyRate: data.hourlyRate,
            taxPaid: data.taxAmount
        }
        dispatch(saveOriginalTimeDiff(dataObj));
        dispatch(calculationActualData());
    }
}

export function onUpdateTime(data, visitId) {
    return (dispatch) => {
        // let min = data.hour * 60 + data.min;
        // let timediffms = moment.duration(min, 'm').asMilliseconds();
        let sec = data.hour * 60 * 60 + data.min * 60 // + data.sec;
        let timediffms = moment.duration(sec, 's').asMilliseconds();
        dispatch(saveActualTimeDiff(timediffms));
        dispatch(calculationActualData());
        dispatch(updateVisitProcessingUpdateBilledDuration(timediffms, visitId))
    }
}

export function saveSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(API.saveSummaryDetails + data.serviceRequestVisitId, data).then((resp) => {
            if (getUserInfo().isEntityServiceProvider) {
                dispatch(push(Path.visitServiceDetails))
            } else {
                dispatch(updateServiceRequestId(data.serviceRequestVisitId))
                dispatch(push(Path.payments))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function saveSignature(data) {
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPost(API.saveSignature, data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSavedSignature(data) {
    return (dispatch) => {
        //dispatch(startLoading());
        ServiceRequestGet(API.getSavedSignature + data).then((resp) => {
            dispatch(getSavedSignatureSuccess(resp.data));
            //dispatch(endLoading());
        }).catch((err) => {
            //dispatch(endLoading());
        })
    }
};
export function gotoFeedback() {
    return (dispatch) => {
        dispatch(push(Path.feedback))

    }
};



