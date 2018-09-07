export function makeProperCase(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function stringConcat(text){
    return text.join(",")
}

export function convertTime24to12(time24) {
    var tmpArr = time24.split(':'), time12;
    if (+tmpArr[0] === 12) {
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