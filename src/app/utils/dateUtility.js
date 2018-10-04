import moment from 'moment';

export function getMomentDate(date){
    return moment(new Date(date.toString()));
}

export function formatDate(date, dateFormat){
    return getMomentDate(date).format(dateFormat);
}

export function changeDateFormat(value){
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 2) {
        return onlyNums;
    } else if (onlyNums.length <= 5) {
        return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    }
    return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 4)}-${onlyNums.slice(4, 8)}`;
  }