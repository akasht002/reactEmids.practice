import moment from 'moment';
import { DATE_FORMATS } from '../constants/constants'

export function getMomentDate(date) {
    return date ? moment(new Date(date.toString())) : null;
}

export function formatDateSingle(value) {
    let data = parseInt(value, 10);
    return data > 9 ? "" + data : "0" + data;
}

export function formatDate(date, dateFormat) {
    return getMomentDate(date).format(dateFormat);
}

export function formatDateValue(date, dateFormat) {
    return getMomentDate(date, dateFormat).format(dateFormat);
}

export function changeDateFormat(value) {
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) {
        return onlyNums;
    } else if (onlyNums.length <= 5) {
        return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    }
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 4)}-${onlyNums.slice(4, 8)}`;
}

export function getUTCFormatedDate(date, dateFormat = "hh:mm a") {
    var gmtDateTime = moment.utc(date)
    var local = gmtDateTime.local().format(dateFormat);
    return local
}

export function getUTCTimeInLocal(startTime, endTime) {
    var gmtDateTime = moment.utc(startTime)
    var localStartDate = gmtDateTime.local();
    var endDateTime = moment.utc(endTime)
    var localEndDate = endDateTime.local();
    return localEndDate.diff(localStartDate, "seconds")
}

export function getUtcTimeDiff(startTime) {
    var gmtDateTime = moment.utc(startTime);
    var UTCtime = new Date().getTime();
    return UTCtime.diff(gmtDateTime, "seconds")
}

export function convertUTCTime(date, dateFormat = "HH:MM a") {
    var gmtDateTime = moment.utc(date)
    var local = gmtDateTime.local().format();
    return moment().diff(local, "seconds")
}

export function isFutureDay(date) {
    let difference = moment(date).diff(moment(), "days")
    return difference >= 0
}

export function getDoubleDigitTime(value) {
    let updatedValue = value
    if (updatedValue.toString().length < 2) {
        updatedValue = "0" + updatedValue
    }
    return updatedValue
}

export function getTimeZoneOffset() {
    return new Date().getTimezoneOffset()
}

export const getHHMinSession = (data) => {
    return moment(data).format(DATE_FORMATS.hhMinSession)
}


export const getSecondsFromTime = (data) =>{
    return data.split(':')
}
export function getDiffTime(startTimes, endTimes) {
    let startTime = moment(startTimes, DATE_FORMATS.hh_mm);
    let endTime = moment(endTimes, DATE_FORMATS.hh_mm);
    let seconds = endTime.diff(startTime, 'seconds');
    let format = val => `0${Math.floor(val)}`.slice(-2)
    let hours = seconds / 3600
    let minutes = (seconds % 3600) / 60
    return [hours, minutes].map(format).join(':');
}

 export function getHourMin(data) {
    return data ? moment(data, DATE_FORMATS.hh_mm).format(DATE_FORMATS.hh_mm) : ''
}

export function formateMDYY(date) {
    let dateInput = date
    let input = date ? dateInput.split(' ') : null
    let dateValue = input[0].split('-');
    let dateTimeParts = {
        month: dateValue[0],
        day: dateValue[1],
        year: dateValue[2],
    }
    let newDate = new Date(dateTimeParts.month.toString() + "/" +
        dateTimeParts.day.toString() + "/" +
        dateTimeParts.year.toString());
    let value =
        (newDate.getMonth() + 1).toString() + "/" +
        newDate.getDate().toString() + "/" +
        newDate.getFullYear().toString().slice(-2)
    return value;
}

 export const getUtcTimeDiffInHHMMformat = (strTime, edTime) => {
    let startTime = moment(strTime, DATE_FORMATS.timeh_mm_a);
    let endTime = moment(edTime, DATE_FORMATS.timeh_mm_a);
    let duration = moment.duration(endTime.diff(startTime));
    let hours = parseInt(duration.asHours(), 10);
    let minutes = parseInt(duration.asMinutes(), 10) - hours * 60;
    let result = `${hours}:${minutes}`
    return result;
} 

export const getHHMMformat = (data) => {
    return moment(data).format(DATE_FORMATS.hh_mm)
}

export const timeDropDownFormat = (data) => {
    return data ? moment().hours(moment(data).format("HH")).minutes(moment(data).format("mm")) : ''
}

export const defaultStartTime = () => {
    return moment().hours(0).minutes(0)
}

export const defaultEndTime = () => {
    return moment().hours(23).minutes(30)
}