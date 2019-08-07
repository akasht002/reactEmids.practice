import React from 'react';
import _ from 'lodash';

export const uniqElementOfArray = data => {
    let uniqueArray = data.filter(function (item, pos) {
        return data.indexOf(item) === pos;
    })
    return uniqueArray
}

export const isArrayEqual = function (x, y) {
    return _.difference(x, y)
};

export const emptyString = data => {
    return data === undefined ? '' : data
};

export const checkLength = data => {
    return data.length > 0 ? false : true
}

export const getStartRatings = data => {
    var i;
    for (i = 0; i < data; i++) {
        return <i className="Icon iconFilledStar" />
    }
}

export const allEqual = values => {
    let data;
    _.forEach(values, function (val, sKey) {
        if (val) {
            data = val;
        }
    });
    return data ? data : false
}

