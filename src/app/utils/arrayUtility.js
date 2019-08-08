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
    var ratings = []
    for (var i = 0; i < data; i++) {
        ratings.push(<i className="Icon iconFilledStar" />)
    }
    return ratings;
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

export const numbersOnly = data => {
    return data.replace(/[^0-9]/g, '')
}
