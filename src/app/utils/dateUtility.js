import moment from 'moment';

export function getMomentDate(date) {
    return date ? moment(new Date(date.toString())) : null;
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

export function convertUTCTime(date, dateFormat = "HH:MM a") {
    var gmtDateTime = moment.utc(date)
    var local = gmtDateTime.local().format();
    return moment().diff(local, "seconds")
}

export function isFutureDay(date) {
    let difference = moment(date).diff(moment(), "days")
    return difference >= 0
}