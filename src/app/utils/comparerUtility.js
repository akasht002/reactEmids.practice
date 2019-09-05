import _ from 'lodash';

export function compare(...obj){
    return _.isEqual(...obj)
}

export function difference(...obj){
    return _.difference(...obj)
}

export function caseInsensitiveComparer(str1, str2) {
    if (!!!str1 || !!!str2) return false
    return ((str1.toLowerCase()) === (str2.toLowerCase()))
}