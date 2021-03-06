import { API } from '../../../../services/api';
import { ServiceRequestGet, ServiceRequestPut, ServiceRequestPost, ThirdPartyPost } from '../../../../services/http';
import { startLoading, endLoading } from '../../../loading/actions';
import moment from 'moment'
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import { DEMO } from '../../../../constants/config';
import { getUserInfo } from '../../../../services/http';
import { getQuestionsListSuccess } from '../Assessment/actions';
import { getQuestionsListSuccess as getFeedBackQuestion } from '../Feedback/actions'
import { updateServiceRequestId } from '../Payments/actions';
import { getDoubleDigitTime } from '../../../../utils/dateUtility'
import { getUpdatedPerformTasksList } from '../PerformTasks/actions'
import { isEntityUser } from '../../../../utils/userUtility';

export const SummaryDetails = {
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
    getCalculationsData: 'get_calculations_data/summarydetails',
    saveOriginalTimeDiff: 'save_original_time_diff/summarydetails',
    saveActualTimeDiff: 'save_actual_time_diff/summarydetails',
    getSavedSignatureSuccess: 'getSavedSignatureSuccess/summarydetails',
    formDirtySummaryDetails: 'formDirtySummaryDetails/summarydetails',
    getVisitServiceEligibityStatusSuccess: 'getVisitServiceEligibityStatusSuccess/summarydetails',
    startLoading: 'startLoading/visitservice',
    endLoading: 'endLoading/visitservice'
};

export const getSummaryDetailsSuccess = (data) => {
    return {
        type: SummaryDetails.getSummaryDetailsSuccess,
        data : getUpdatedPerformTasksList(data)
    }
}

export const getVisitServiceEligibityStatusSuccess = data => {
    return {
        type: SummaryDetails.getVisitServiceEligibityStatusSuccess,
        data
    }
}

export const startLoadingProcessing = () => {
    return {
      type: SummaryDetails.startLoading,
    }
  };
  
  export const endLoadingProcessing = () => {
    return {
      type: SummaryDetails.endLoading,
    }
};


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
    let getSummaryDetails = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getSummaryDetailsForEsp : API.getSummaryDetails
    return (dispatch) => {
        dispatch(startLoadingProcessing());
        ServiceRequestGet(getSummaryDetails + data).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            //This one we need when we have to give demo.
            // dispatch(calculationsFirstTime(resp.data));
           // dispatch(getVisitServiceEligibilityStatus(resp.data))
           dispatch(calculationsFirstTime(resp.data));
           dispatch(push(Path.summary))
            // dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};

export function getSummaryDetail(data) {
    let getSummaryDetails = (getUserInfo().isEntityServiceProvider || isEntityUser()) ? API.getSummaryDetailsForEsp : API.getSummaryDetails
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestGet(getSummaryDetails + data).then((resp) => {
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
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let model = isEntityServiceProvider ? {
        servicePlanVisitId: visitId,
        billedDuration: calculate
    } : {} 
    let visitProcessingUpdateBilledDuration = isEntityServiceProvider ? API.visitProcessingUpdateBilledDurationForEsp : API.visitProcessingUpdateBilledDuration + `/${visitId}/${calculate}`
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(visitProcessingUpdateBilledDuration, model).then((resp) => {
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
        dispatch(startLoadingProcessing());
        return ThirdPartyPost(API.getServiceRequestEligibilityStatus, eligibilityData).then((resp) => {
            dispatch(getVisitServiceEligibityStatusSuccess(resp.data));
            dispatch(calculationsFirstTime(data));
            dispatch(push(Path.summary))
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
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

        let totalChargableTime = getDoubleDigitTime(hours) + ":" + getDoubleDigitTime(min);

        let hoursinMin = duration.asMinutes();

        let totalVisitCost1 = (currState.hourlyRate / 60) * hoursinMin;

        let totalVisitCost = totalVisitCost1 < 1 && !getUserInfo().isEntityServiceProvider && getUserInfo().serviceProviderTypeId === 1  ?  1 : totalVisitCost1

        let taxes = (totalVisitCost * currState.taxPaid) / 100;

        let grandTotalAmount = parseFloat(totalVisitCost.toFixed(2)) + parseFloat(taxes.toFixed(2));

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

        const calculationdata = {
            totalChargableTime: totalChargableTime,
            totalVisitCost: totalVisitCost.toFixed(2),
            taxes: taxes.toFixed(2),
            grandTotalAmount: grandTotalAmount.toFixed(2),
            totalHours: getDoubleDigitTime(hours),
            totalMinutes: getDoubleDigitTime(min),
            totalSeconds: sec,
            estimatedClaim: estimatedClaim.toFixed(2),
            copayAmount: copayAmount.toFixed(2)
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
        let sec = data.hour * 60 * 60 + data.min * 60 + data.sec;
        let timediffms = moment.duration(sec, 's').asMilliseconds();
        dispatch(saveActualTimeDiff(timediffms));
        dispatch(calculationActualData());
        dispatch(updateVisitProcessingUpdateBilledDuration(timediffms, visitId))
    }
}

export function saveSummaryDetails(data) { 
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let saveSummaryDetails = isEntityServiceProvider ? API.saveSummaryDetailsForEsp : `${API.saveSummaryDetails}${data.serviceRequestVisitId}`
    let model = isEntityServiceProvider ? {
        ...data,
        servicePlanVisitId: data.serviceRequestVisitId
    } : data
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPut(saveSummaryDetails, model).then((resp) => {
            if ((getUserInfo().isEntityServiceProvider || isEntityUser())) {
                dispatch(push(Path.visitServiceDetails))
            } else {
                dispatch(updateServiceRequestId(data.serviceRequestVisitId))
                dispatch(push(Path.payments))
            }
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
        dispatch(getQuestionsListSuccess({}))
        dispatch(getFeedBackQuestion({}))
    }
};

export function saveSignature(data) {
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let saveSignature = isEntityServiceProvider ? API.saveSignatureForEsp : API.saveSignature
    let model = isEntityServiceProvider ? {
        ...data,
        servicePlanVisitId: data.serviceRequestVisitId
    } : data
    return (dispatch) => {
        dispatch(startLoading());
        ServiceRequestPost(saveSignature, model).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function getSavedSignature(data) {
    let isEntityServiceProvider = (getUserInfo().isEntityServiceProvider || isEntityUser())
    let getSavedSignature = isEntityServiceProvider ? API.getSavedSignatureForEsp : API.getSavedSignature
    return (dispatch) => {
        ServiceRequestGet(getSavedSignature + data).then((resp) => {
            dispatch(getSavedSignatureSuccess(resp.data));
            dispatch(endLoadingProcessing());
        }).catch((err) => {
            dispatch(endLoadingProcessing());
        })
    }
};
export function gotoFeedback() {
    return (dispatch) => {
        dispatch(push(Path.feedback))

    }
};



