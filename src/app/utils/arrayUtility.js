import React from 'react';
import _ from 'lodash';
import { VisitProcessingNavigationData } from '../data/VisitProcessingWizNavigationData'

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

export const checkLengthOfZip = data => {
    return  data && data.length < 5 ? true : false
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

export const visitProcessingNavigationData = isEntity => {
    return isEntity ? VisitProcessingNavigationData.slice(0, 3) : VisitProcessingNavigationData;
}

export const disableZeroInFirstChar = e => {
    if (e.target.value.length === 1 && e.target.value === '0') {
        return false
    } else {
        return true
    }
}

export const removeDuplicates = duplicateData => {
    let uniqueData = []
    uniqueData = duplicateData.filter((data, index, self) =>
    index === self.findIndex((obj) => (
        obj.serviceTypeId === data.serviceTypeId
    ))
    )
    return uniqueData;
}

export const removeArrayElements = (orignalArray, removalArray) => {
    let result = []
    result = orignalArray.filter(orgElement =>
        !removalArray.find(rmElement =>
         (rmElement.serviceTypeId === orgElement)
      ))
    return result;
}

export const removeArrayObjects = (orignalArray, removalArray) => {
    let result = []
    result = orignalArray.filter(orgElement =>
        !removalArray.find(rmElement =>
         (rmElement.serviceTypeId === orgElement.serviceTypeId)
      ))
    return result;
}

export const unique = (array,key) => {
    return _.chain(array).map(key).uniq().value()
  }

export const mergeArrayBasedOnId = (array1, guardianInfoList) =>
    array1.map(item1 => ({
        ...guardianInfoList.find((item2) => (item2.id === item1.id) && item2),
        ...item1
    }));