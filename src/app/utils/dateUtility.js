import moment from 'moment';

export function getMomentDate(date) {
    return moment(new Date(date.toString()));
}

export function formatDate(date, dateFormat) {
    return getMomentDate(date).format(dateFormat);
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

export function getUTCFormatedDate(date, dateFormat = "HH:MM A") {
    var gmtDateTime = moment.utc(date)
    var local = gmtDateTime.local().format(dateFormat);
    return local
}

export function convertUTCTime(date, dateFormat = "HH:MM a") {
    var gmtDateTime = moment.utc(date)
    console.log("CONVERTED TIME IS", gmtDateTime)
    var local = gmtDateTime.local().format();
    console.log("local TIME IS", local, gmtDateTime.local().format(dateFormat), moment().diff(local, "seconds"))
    return moment().diff(local, "seconds")
}