
import moment from 'moment';
import { DATE_FORMAT, DATE_YEAR } from '../constants/variables'
export function checkEmail(email) {
    return /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function checkPassword(password) {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/.test(password);
}

export function checkDate(date) {
    return /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/.test(date);
}

export function checkSpace(text) {
    return (text).replace(/\s/g, "");
}

export function checkTrim(text) {
    return (text).trim();
}

export function formattedDateMoment(date) {
    return date ? moment(new Date(date.toString())).format(DATE_FORMAT) : null;
}

export function formattedDateChange(event) {
    if (event.target.value.length === 10
        && new Date(event.target.value)
        && moment().isAfter(event.target.value)) {
        return event.target.value ? formattedDateMoment(event.target.value) : null;

    }
}

export function formateStateDate(data) {
    return moment(data);
}

export function formateYearDate() {
    return moment().format(DATE_YEAR);
}

export function convertTime24to12(time24) {
    var tmpArr = time24.split(':'), time12;
    if (+tmpArr[0] == 12) {
        time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
    } else {
        if (+tmpArr[0] === '00') {
            time12 = '12:' + tmpArr[1] + ' am';
        } else {
            if (+tmpArr[0] > 12) {
                time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' pm';
            } else {
                time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
            }
        }
    }
    return time12;
}

export function getFirstCharOfString(string) {
    return string.charAt(0);
}