
import moment from 'moment';
import {DATE_FORMAT, DATE_YEAR} from '../constants/variables';
import _ from 'lodash'

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

export function formattedDateMoment(date){
   return  date ? moment(new Date(date.toString())).format(DATE_FORMAT) : null;
}

export function formattedDateChange(event){
    if (event.target.value.length === 10
        && new Date(event.target.value)
        && moment().isAfter(event.target.value)) {
        return  event.target.value ? formattedDateMoment(event.target.value) : null;
      
    } 
}

export function formateStateDate(data){
    return moment(data);
}

export function formateYearDate(){
    return  moment().format(DATE_YEAR);
}


export function checkLengthRemoveSpace(data) {
    // if(data !== undefined )
        return data.replace(/\s/g, "").length;
    // else
        // return 0;
}

export function getLength(data){
    return _.size(data)
}


export function checkTextNotStartWithNumber(data) {
    return /^[a-zA-Z][A-Za-z0-9_!@#$%^&*?~`/\,;:".'()><-=+]+$/.test(data)
}

export function isDecimal(data) {
    return /^\d+(\.\d+)?$/.test(data)
}

export function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getArrayLength = (data) => {
    return _.size(data);
}

export const getDataValueArray = (data,split)=> {
    return _.split(data,split)
}
