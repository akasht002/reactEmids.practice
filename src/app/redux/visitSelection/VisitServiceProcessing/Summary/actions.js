import axios from 'axios';
import { API, baseURLServiceRequest } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';
import moment from 'moment'

export const SummaryDetails = {
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
    getCalculationsData: 'get_calculations_data/summarydetails',
    saveOriginalTimeDiff: 'save_original_time_diff/summarydetails',
    saveActualTimeDiff: 'save_actual_time_diff/summarydetails'
};

export const getSummaryDetailsSuccess = (data) => {
    return {
        type: SummaryDetails.getSummaryDetailsSuccess,
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

export function getSummaryDetails() {
    return (dispatch) => {
        dispatch(startLoading());
        axios.get(baseURLServiceRequest + API.getSummaryDetails + '3').then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(calculationsFirstTime(resp.data))
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};

export function calculationActualData() {
    return (dispatch, getState) => {

        const currState = getState().visitSelectionState.VisitServiceProcessingState.SummaryState;
        let duration = moment.duration(currState.actualTimeDiff);

        let hours = duration.days() * 24 + duration.hours();

        let min = duration.minutes();

        let totalChargableTime = hours + ":" + min;

        let hoursinMin = duration.asMinutes();

        let totalVisitCost = (currState.hourlyRate / 60) * hoursinMin;

        let taxes = (totalVisitCost * currState.taxPaid) / 100;

        let grandTotalAmount = totalVisitCost + taxes;

        const calculationdata = {
            totalChargableTime: totalChargableTime,
            totalVisitCost: totalVisitCost,
            taxes: taxes,
            grandTotalAmount: grandTotalAmount,
            totalHours: hours,
            totalMinutes: min
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

        let timediffms = endTimeinMs - startTimeinMs;
        let dataObj = {
            timediffms: timediffms,
            hourlyRate: data.hourlyRate,
            taxPaid: data.taxPaid
        }
        dispatch(saveOriginalTimeDiff(dataObj));
        dispatch(calculationActualData());
    }
}

export function onUpdateTime(data) {
    return (dispatch) => {
        let min = data.hour * 60 + data.min;
        let timediffms = moment.duration(min, 'm').asMilliseconds();
        dispatch(saveActualTimeDiff(timediffms));
        dispatch(calculationActualData());
    }
}

export function saveSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        axios.put(baseURLServiceRequest + API.saveSummaryDetails + '3/' + 'SubmitBillingForVisit', data).then((resp) => {
            dispatch(endLoading());
        }).catch((err) => {
            dispatch(endLoading());
        })
    }
};



